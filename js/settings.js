// Plantify Settings Management
let plantIdAPI;
let notificationManager;

document.addEventListener('DOMContentLoaded', function() {
    initializeSettings();
});

function initializeSettings() {
    // Initialize API and notification managers
    plantIdAPI = new PlantIdAPI();
    notificationManager = new NotificationManager();
    
    // Load user profile
    loadUserProfile();
    
    // Load current settings
    loadSettings();
    
    // Setup event listeners
    setupEventListeners();
}

function loadUserProfile() {
    const profileData = localStorage.getItem('plantifyProfile');
    if (profileData) {
        const profile = JSON.parse(profileData);
        document.getElementById('userName').textContent = profile.name;
    }
}

function loadSettings() {
    // Load API key
    const apiKey = plantIdAPI.getApiKey();
    if (apiKey && apiKey !== 'YOUR_PLANT_ID_API_KEY') {
        document.getElementById('apiKey').value = apiKey;
        updateApiStatus('API key loaded', 'success');
    }
    
    // Load notification settings
    const notificationSettings = notificationManager.getNotificationSettings();
    if (notificationSettings.browserNotifications !== undefined) {
        document.getElementById('browserNotifications').checked = notificationSettings.browserNotifications;
    }
    if (notificationSettings.emailNotifications !== undefined) {
        document.getElementById('emailNotifications').checked = notificationSettings.emailNotifications;
    }
    if (notificationSettings.notificationTime) {
        document.getElementById('notificationTime').value = notificationSettings.notificationTime;
    }
    if (notificationSettings.customTime) {
        document.getElementById('customTime').value = notificationSettings.customTime;
    }
    if (notificationSettings.reminderAdvance !== undefined) {
        document.getElementById('reminderAdvance').value = notificationSettings.reminderAdvance;
    }
    
    // Load calendar settings
    const calendarSettings = JSON.parse(localStorage.getItem('calendarSettings') || '{}');
    if (calendarSettings.sync !== undefined) {
        document.getElementById('calendarSync').checked = calendarSettings.sync;
    }
    if (calendarSettings.type) {
        document.getElementById('calendarType').value = calendarSettings.type;
    }
}

function setupEventListeners() {
    // Custom time input visibility
    document.getElementById('notificationTime').addEventListener('change', function() {
        const customTimeGroup = document.getElementById('customTimeGroup');
        if (this.value === 'custom') {
            customTimeGroup.style.display = 'block';
        } else {
            customTimeGroup.style.display = 'none';
        }
    });
}

// API Key Management
async function saveApiKey() {
    const apiKey = document.getElementById('apiKey').value.trim();
    
    if (!apiKey) {
        updateApiStatus('Please enter an API key', 'error');
        return;
    }
    
    try {
        // Validate API key
        const isValid = await plantIdAPI.validateApiKey(apiKey);
        
        if (isValid) {
            plantIdAPI.setApiKey(apiKey);
            updateApiStatus('API key saved successfully!', 'success');
        } else {
            updateApiStatus('Invalid API key. Please check and try again.', 'error');
        }
    } catch (error) {
        updateApiStatus('Error validating API key: ' + error.message, 'error');
    }
}

async function testApiKey() {
    const apiKey = document.getElementById('apiKey').value.trim();
    
    if (!apiKey) {
        updateApiStatus('Please enter an API key first', 'error');
        return;
    }
    
    updateApiStatus('Testing API connection...', 'info');
    
    try {
        const isValid = await plantIdAPI.validateApiKey(apiKey);
        
        if (isValid) {
            const usageInfo = await plantIdAPI.getUsageInfo();
            if (usageInfo) {
                updateApiStatus(`API connection successful! Usage: ${usageInfo.used}/${usageInfo.available}`, 'success');
            } else {
                updateApiStatus('API connection successful!', 'success');
            }
        } else {
            updateApiStatus('API connection failed. Please check your key.', 'error');
        }
    } catch (error) {
        updateApiStatus('Error testing API: ' + error.message, 'error');
    }
}

function updateApiStatus(message, type) {
    const statusDiv = document.getElementById('apiStatus');
    statusDiv.className = `api-status ${type}`;
    statusDiv.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
}

// Notification Settings
function saveNotificationSettings() {
    const settings = {
        browserNotifications: document.getElementById('browserNotifications').checked,
        emailNotifications: document.getElementById('emailNotifications').checked,
        notificationTime: document.getElementById('notificationTime').value,
        customTime: document.getElementById('customTime').value,
        reminderAdvance: document.getElementById('reminderAdvance').value
    };
    
    notificationManager.saveNotificationSettings(settings);
    
    // Request notification permission if enabled
    if (settings.browserNotifications) {
        notificationManager.checkNotificationPermission();
    }
    
    showNotification('Notification settings saved successfully!', 'success');
}

async function testNotification() {
    try {
        const success = await notificationManager.testNotification();
        if (success) {
            showNotification('Test notification sent!', 'success');
        } else {
            showNotification('Failed to send test notification. Check browser permissions.', 'error');
        }
    } catch (error) {
        showNotification('Error sending test notification: ' + error.message, 'error');
    }
}

// Calendar Integration
function exportCalendar() {
    const userGarden = JSON.parse(localStorage.getItem('plantifyGarden') || '[]');
    
    if (userGarden.length === 0) {
        showNotification('No plants in your garden to export', 'error');
        return;
    }
    
    const calendarType = document.getElementById('calendarType').value;
    
    if (calendarType === 'ics') {
        // Use the existing export function from dashboard
        if (typeof exportCalendarFromDashboard === 'function') {
            exportCalendarFromDashboard();
        } else {
            // Fallback implementation
            const events = [];
            userGarden.forEach(plant => {
                const lastWatered = new Date(plant.lastWatered);
                const nextWatering = new Date(lastWatered);
                nextWatering.setDate(lastWatered.getDate() + plant.wateringSchedule);
                
                events.push({
                    summary: `Water ${plant.name}`,
                    description: `Time to water your ${plant.name} located in ${plant.location}`,
                    start: nextWatering.toISOString(),
                    end: new Date(nextWatering.getTime() + 30 * 60000).toISOString()
                });
            });
            
            downloadICSFile(events);
        }
    } else if (calendarType === 'google') {
        setupGoogleCalendar();
    }
    
    showNotification('Calendar exported successfully!', 'success');
}

function setupGoogleCalendar() {
    // This would require Google Calendar API setup
    // For now, show instructions
    showNotification('Google Calendar integration requires additional setup. Please use ICS export for now.', 'info');
}

function downloadICSFile(events) {
    let icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Plantify//Plant Care Calendar//EN'
    ];
    
    events.forEach(event => {
        const formatDate = (date) => {
            return new Date(date).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        };
        
        icsContent.push(
            'BEGIN:VEVENT',
            `SUMMARY:${event.summary}`,
            `DESCRIPTION:${event.description}`,
            `DTSTART:${formatDate(event.start)}`,
            `DTEND:${formatDate(event.end)}`,
            'END:VEVENT'
        );
    });
    
    icsContent.push('END:VCALENDAR');
    
    const blob = new Blob([icsContent.join('\r\n')], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'plantify-calendar.ics';
    a.click();
    URL.revokeObjectURL(url);
}

// Data Management
function exportData() {
    const data = {
        profile: JSON.parse(localStorage.getItem('plantifyProfile') || '{}'),
        garden: JSON.parse(localStorage.getItem('plantifyGarden') || '[]'),
        settings: notificationManager.getNotificationSettings(),
        calendarSettings: JSON.parse(localStorage.getItem('calendarSettings') || '{}'),
        exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `plantify-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    showNotification('Data exported successfully!', 'success');
}

function importData() {
    document.getElementById('importModal').style.display = 'flex';
}

function processImport() {
    const fileInput = document.getElementById('importFile');
    const file = fileInput.files[0];
    
    if (!file) {
        showNotification('Please select a file to import', 'error');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            // Validate data structure
            if (!data.profile || !data.garden) {
                throw new Error('Invalid data format');
            }
            
            // Import data
            localStorage.setItem('plantifyProfile', JSON.stringify(data.profile));
            localStorage.setItem('plantifyGarden', JSON.stringify(data.garden));
            
            if (data.settings) {
                notificationManager.saveNotificationSettings(data.settings);
            }
            
            if (data.calendarSettings) {
                localStorage.setItem('calendarSettings', JSON.stringify(data.calendarSettings));
            }
            
            closeModal('importModal');
            showNotification('Data imported successfully! Please refresh the page.', 'success');
            
            // Reload settings
            setTimeout(() => {
                loadSettings();
            }, 1000);
            
        } catch (error) {
            showNotification('Error importing data: ' + error.message, 'error');
        }
    };
    
    reader.readAsText(file);
}

function clearData() {
    if (confirm('Are you sure you want to clear all Plantify data? This action cannot be undone.')) {
        localStorage.clear();
        showNotification('All data cleared successfully!', 'success');
        
        // Redirect to home page
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Global functions for HTML onclick handlers
window.saveApiKey = saveApiKey;
window.testApiKey = testApiKey;
window.saveNotificationSettings = saveNotificationSettings;
window.testNotification = testNotification;
window.exportCalendar = exportCalendar;
window.setupGoogleCalendar = setupGoogleCalendar;
window.exportData = exportData;
window.importData = importData;
window.clearData = clearData;
window.closeModal = closeModal;
window.processImport = processImport; 