// Plantify Dashboard - Main functionality
let db;
let userProfile;
let userGarden = [];
let currentFilter = 'all';
let plantIdAPI;
let notificationManager;

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
});

function initializeDashboard() {
    // Initialize database and APIs
    db = new PlantifyDatabase();
    plantIdAPI = new PlantIdAPI();
    notificationManager = new NotificationManager();
    
    // Load user profile
    loadUserProfile();
    
    // Load user's garden
    loadUserGarden();
    
    // Setup navigation
    setupNavigation();
    
    // Setup filters
    setupFilters();
    
    // Setup file upload
    setupFileUpload();
    
    // Load initial data
    loadRecommendations();
    loadNurseries();
    loadMaintenanceTasks();
    
    // Setup notifications
    setupNotifications();
    
    // Set current date for plant acquisition
    document.getElementById('plantDate').valueAsDate = new Date();
}

function loadUserProfile() {
    const profileData = localStorage.getItem('plantifyProfile');
    if (!profileData) {
        window.location.href = 'profile.html';
        return;
    }
    
    userProfile = JSON.parse(profileData);
    document.getElementById('userName').textContent = userProfile.name;
    document.getElementById('welcomeName').textContent = userProfile.name;
}

function loadUserGarden() {
    const gardenData = localStorage.getItem('plantifyGarden');
    userGarden = gardenData ? JSON.parse(gardenData) : [];
    renderGarden();
}

function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.dashboard-section');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSection = this.dataset.section;
            
            // Update active nav button
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show target section
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                }
            });
        });
    });
}

function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            currentFilter = this.dataset.filter;
            loadRecommendations();
        });
    });
}

function loadRecommendations() {
    const recommendations = db.getRecommendedPlants(userProfile);
    const filteredPlants = filterPlants(recommendations, currentFilter);
    
    const grid = document.getElementById('recommendationsGrid');
    grid.innerHTML = '';
    
    filteredPlants.forEach(plant => {
        const plantCard = createPlantCard(plant);
        grid.appendChild(plantCard);
    });
}

function filterPlants(plants, filter) {
    switch(filter) {
        case 'low-maintenance':
            return plants.filter(plant => plant.maintenance === 'Low');
        case 'pet-safe':
            return plants.filter(plant => plant.petSafe === true);
        case 'native':
            return plants.filter(plant => plant.nativeTo);
        case 'travel-friendly':
            return plants.filter(plant => plant.travelFriendly === true);
        default:
            return plants;
    }
}

function createPlantCard(plant) {
    const card = document.createElement('div');
    card.className = 'plant-card';
    
    const isNative = plant.nativeTo ? 'native-plant' : '';
    const petSafeIcon = plant.petSafe ? '<i class="fas fa-paw" title="Pet Safe"></i>' : '';
    const travelIcon = plant.travelFriendly ? '<i class="fas fa-suitcase" title="Travel Friendly"></i>' : '';
    
    card.innerHTML = `
        <div class="plant-image">
            <img src="assets/images/${plant.image || 'default-plant.jpg'}" alt="${plant.name}" onerror="this.src='assets/images/default-plant.jpg'">
            <div class="plant-badges">
                ${petSafeIcon}
                ${travelIcon}
                ${isNative ? '<i class="fas fa-leaf" title="Native Plant"></i>' : ''}
            </div>
        </div>
        <div class="plant-info">
            <h3>${plant.name}</h3>
            <p class="scientific-name">${plant.scientificName}</p>
            <p class="description">${plant.description}</p>
            <div class="plant-details">
                <span class="detail"><i class="fas fa-tint"></i> ${plant.water}</span>
                <span class="detail"><i class="fas fa-sun"></i> ${plant.light}</span>
                <span class="detail"><i class="fas fa-tools"></i> ${plant.maintenance}</span>
            </div>
            <div class="plant-actions">
                <button class="btn-secondary" onclick="showPlantDetails(${plant.id})">
                    <i class="fas fa-info-circle"></i> Details
                </button>
                <button class="btn-primary" onclick="addToGarden(${plant.id})">
                    <i class="fas fa-plus"></i> Add to Garden
                </button>
            </div>
        </div>
    `;
    
    return card;
}

function loadNurseries() {
    const nurseries = db.getNearbyNurseries(userProfile.zip);
    const list = document.getElementById('nurseriesList');
    list.innerHTML = '';
    
    nurseries.forEach(nursery => {
        const nurseryCard = document.createElement('div');
        nurseryCard.className = 'nursery-card';
        
        const specialties = nursery.specialties.join(', ');
        
        nurseryCard.innerHTML = `
            <div class="nursery-info">
                <h3>${nursery.name}</h3>
                <p class="nursery-address"><i class="fas fa-map-marker-alt"></i> ${nursery.address}</p>
                <p class="nursery-phone"><i class="fas fa-phone"></i> ${nursery.phone}</p>
                <p class="nursery-hours"><i class="fas fa-clock"></i> ${nursery.hours}</p>
                <p class="nursery-specialties"><i class="fas fa-tags"></i> ${specialties}</p>
                <div class="nursery-rating">
                    <span class="stars">
                        ${'★'.repeat(Math.floor(nursery.rating))}${'☆'.repeat(5 - Math.floor(nursery.rating))}
                    </span>
                    <span class="rating-text">${nursery.rating}/5</span>
                </div>
            </div>
            <div class="nursery-actions">
                <a href="${nursery.website}" target="_blank" class="btn-secondary">
                    <i class="fas fa-external-link-alt"></i> Website
                </a>
                <a href="tel:${nursery.phone}" class="btn-primary">
                    <i class="fas fa-phone"></i> Call
                </a>
            </div>
        `;
        
        list.appendChild(nurseryCard);
    });
}

function renderGarden() {
    const grid = document.getElementById('gardenGrid');
    grid.innerHTML = '';
    
    if (userGarden.length === 0) {
        grid.innerHTML = `
            <div class="empty-garden">
                <i class="fas fa-seedling fa-3x"></i>
                <h3>Your garden is empty</h3>
                <p>Start by adding some plants to your virtual garden!</p>
                <button class="btn-primary" onclick="addPlantToGarden()">
                    <i class="fas fa-plus"></i> Add Your First Plant
                </button>
            </div>
        `;
        return;
    }
    
    userGarden.forEach(plant => {
        const gardenCard = document.createElement('div');
        gardenCard.className = 'garden-card';
        
        const nextWatering = getNextWateringDate(plant);
        const daysUntilWatering = getDaysUntilWatering(plant);
        
        gardenCard.innerHTML = `
            <div class="garden-plant-image">
                <img src="assets/images/${plant.image || 'default-plant.jpg'}" alt="${plant.name}" onerror="this.src='assets/images/default-plant.jpg'">
            </div>
            <div class="garden-plant-info">
                <h3>${plant.name}</h3>
                <p class="plant-location"><i class="fas fa-map-marker-alt"></i> ${plant.location}</p>
                <p class="plant-acquired">Acquired: ${new Date(plant.dateAcquired).toLocaleDateString()}</p>
                <div class="watering-info">
                    <p class="next-watering">Next watering: ${nextWatering}</p>
                    <p class="days-until ${daysUntilWatering <= 2 ? 'urgent' : ''}">
                        ${daysUntilWatering} days remaining
                    </p>
                </div>
                <div class="garden-actions">
                    <button class="btn-secondary" onclick="waterPlant(${plant.id})">
                        <i class="fas fa-tint"></i> Water Now
                    </button>
                    <button class="btn-secondary" onclick="editPlant(${plant.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn-danger" onclick="removePlant(${plant.id})">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </div>
            </div>
        `;
        
        grid.appendChild(gardenCard);
    });
}

function addToGarden(plantId) {
    const plant = db.getPlantById(plantId);
    if (!plant) return;
    
    const userPlant = {
        id: Date.now(), // Unique ID for user's plant
        plantId: plantId,
        name: plant.name,
        image: plant.image,
        location: 'Home',
        dateAcquired: new Date().toISOString(),
        lastWatered: new Date().toISOString(),
        wateringSchedule: plant.wateringSchedule
    };
    
    userGarden.push(userPlant);
    localStorage.setItem('plantifyGarden', JSON.stringify(userGarden));
    renderGarden();
    loadMaintenanceTasks();
    
    showNotification(`Added ${plant.name} to your garden!`);
}

function addPlantToGarden() {
    // Populate plant type dropdown
    const plantTypeSelect = document.getElementById('plantType');
    plantTypeSelect.innerHTML = '<option value="">Select plant type</option>';
    
    const allPlants = [...db.plants, ...db.nativePlants];
    allPlants.forEach(plant => {
        const option = document.createElement('option');
        option.value = plant.id;
        option.textContent = plant.name;
        plantTypeSelect.appendChild(option);
    });
    
    document.getElementById('addPlantModal').style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function showPlantDetails(plantId) {
    const plant = db.getPlantById(plantId);
    if (!plant) return;
    
    document.getElementById('modalPlantName').textContent = plant.name;
    
    const content = document.getElementById('plantDetailContent');
    const isNative = plant.nativeTo ? 'Native to: ' + plant.nativeTo.join(', ') : '';
    
    content.innerHTML = `
        <div class="plant-detail-grid">
            <div class="plant-detail-image">
                <img src="assets/images/${plant.image || 'default-plant.jpg'}" alt="${plant.name}" onerror="this.src='assets/images/default-plant.jpg'">
            </div>
            <div class="plant-detail-info">
                <h3>${plant.name}</h3>
                <p class="scientific-name">${plant.scientificName}</p>
                <p class="description">${plant.description}</p>
                
                <div class="care-details">
                    <h4>Care Requirements</h4>
                    <div class="care-item">
                        <i class="fas fa-tint"></i>
                        <span><strong>Water:</strong> ${plant.water}</span>
                    </div>
                    <div class="care-item">
                        <i class="fas fa-sun"></i>
                        <span><strong>Light:</strong> ${plant.light}</span>
                    </div>
                    <div class="care-item">
                        <i class="fas fa-tools"></i>
                        <span><strong>Maintenance:</strong> ${plant.maintenance}</span>
                    </div>
                    <div class="care-item">
                        <i class="fas fa-calendar"></i>
                        <span><strong>Watering Schedule:</strong> Every ${plant.wateringSchedule} days</span>
                    </div>
                </div>
                
                <div class="plant-features">
                    <h4>Features</h4>
                    <div class="features-grid">
                        ${plant.petSafe ? '<span class="feature pet-safe"><i class="fas fa-paw"></i> Pet Safe</span>' : ''}
                        ${plant.travelFriendly ? '<span class="feature travel-friendly"><i class="fas fa-suitcase"></i> Travel Friendly</span>' : ''}
                        ${isNative ? `<span class="feature native"><i class="fas fa-leaf"></i> ${isNative}</span>` : ''}
                    </div>
                </div>
                
                <div class="plant-actions">
                    <button class="btn-primary" onclick="addToGarden(${plant.id}); closeModal('plantDetailModal');">
                        <i class="fas fa-plus"></i> Add to My Garden
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('plantDetailModal').style.display = 'flex';
}

function loadMaintenanceTasks() {
    const today = new Date();
    const todayTasks = [];
    const weekTasks = [];
    
    userGarden.forEach(plant => {
        const daysUntilWatering = getDaysUntilWatering(plant);
        
        if (daysUntilWatering <= 0) {
            todayTasks.push({
                type: 'watering',
                plant: plant,
                message: `Water ${plant.name}`,
                urgent: true
            });
        } else if (daysUntilWatering <= 7) {
            weekTasks.push({
                type: 'watering',
                plant: plant,
                message: `Water ${plant.name} in ${daysUntilWatering} days`,
                urgent: daysUntilWatering <= 2
            });
        }
    });
    
    renderTasks('todayTasks', todayTasks);
    renderTasks('weekTasks', weekTasks);
}

function renderTasks(containerId, tasks) {
    const container = document.getElementById(containerId);
    
    if (tasks.length === 0) {
        container.innerHTML = '<p class="no-tasks">No tasks scheduled</p>';
        return;
    }
    
    container.innerHTML = '';
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = `task-item ${task.urgent ? 'urgent' : ''}`;
        
        taskElement.innerHTML = `
            <div class="task-icon">
                <i class="fas fa-tint"></i>
            </div>
            <div class="task-content">
                <p>${task.message}</p>
                <small>${task.plant.location}</small>
            </div>
            <button class="task-action" onclick="completeTask('${task.type}', ${task.plant.id})">
                <i class="fas fa-check"></i>
            </button>
        `;
        
        container.appendChild(taskElement);
    });
}

function getNextWateringDate(plant) {
    const lastWatered = new Date(plant.lastWatered);
    const nextWatering = new Date(lastWatered);
    nextWatering.setDate(lastWatered.getDate() + plant.wateringSchedule);
    return nextWatering.toLocaleDateString();
}

function getDaysUntilWatering(plant) {
    const lastWatered = new Date(plant.lastWatered);
    const nextWatering = new Date(lastWatered);
    nextWatering.setDate(lastWatered.getDate() + plant.wateringSchedule);
    
    const today = new Date();
    const diffTime = nextWatering - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
}

function waterPlant(plantId) {
    const plantIndex = userGarden.findIndex(p => p.id === plantId);
    if (plantIndex === -1) return;
    
    userGarden[plantIndex].lastWatered = new Date().toISOString();
    localStorage.setItem('plantifyGarden', JSON.stringify(userGarden));
    
    renderGarden();
    loadMaintenanceTasks();
    
    // Reschedule notification for this plant
    notificationManager.schedulePlantWatering(userGarden[plantIndex]);
    
    showNotification(`Watered ${userGarden[plantIndex].name}!`);
}

function completeTask(taskType, plantId) {
    if (taskType === 'watering') {
        waterPlant(plantId);
    }
}

function setupFileUpload() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('plantImage');
    
    uploadArea.addEventListener('click', () => fileInput.click());
    
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleImageUpload(files[0]);
        }
    });
    
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleImageUpload(e.target.files[0]);
        }
    });
}

function setupNotifications() {
    // Setup daily notification check
    notificationManager.setupDailyCheck();
    
    // Schedule watering notifications for existing plants
    notificationManager.scheduleWateringNotifications();
}

async function handleImageUpload(file) {
    if (!file.type.startsWith('image/')) {
        showNotification('Please select an image file.', 'error');
        return;
    }
    
    // Show loading state
    const uploadArea = document.getElementById('uploadArea');
    uploadArea.innerHTML = `
        <i class="fas fa-spinner fa-spin fa-3x"></i>
        <p>Analyzing image...</p>
    `;
    
    try {
        // Check if API key is configured
        const apiKey = plantIdAPI.getApiKey();
        if (!apiKey || apiKey === 'YOUR_PLANT_ID_API_KEY') {
            // Fallback to simulation if no API key
            setTimeout(() => {
                simulatePlantIdentification(file);
            }, 2000);
            return;
        }
        
        // Use real Plant.id API
        const result = await plantIdAPI.identifyPlant(file);
        showRealPlantIdentification(file, result);
        
    } catch (error) {
        console.error('Plant identification error:', error);
        
        // Fallback to simulation
        setTimeout(() => {
            simulatePlantIdentification(file);
        }, 1000);
    }
}

function simulatePlantIdentification(file) {
    const result = document.getElementById('identificationResult');
    const uploadArea = document.getElementById('uploadArea');
    
    // Reset upload area
    uploadArea.innerHTML = `
        <i class="fas fa-camera fa-3x"></i>
        <p>Click to upload a photo or drag and drop</p>
        <input type="file" id="plantImage" accept="image/*" style="display: none;">
    `;
    
    // Show mock identification result
    result.innerHTML = `
        <div class="identification-content">
            <h3>Plant Identification Results (Demo)</h3>
            <div class="identified-plant">
                <img src="${URL.createObjectURL(file)}" alt="Uploaded plant" style="max-width: 200px; border-radius: 8px;">
                <div class="plant-info">
                    <h4>Snake Plant (Sansevieria trifasciata)</h4>
                    <p><strong>Confidence:</strong> 95%</p>
                    <p><strong>Care Level:</strong> Low maintenance</p>
                    <p><strong>Water:</strong> Low</p>
                    <p><strong>Light:</strong> Low to bright indirect</p>
                </div>
            </div>
            <div class="identification-actions">
                <button class="btn-primary" onclick="addIdentifiedPlant()">
                    <i class="fas fa-plus"></i> Add to My Garden
                </button>
                <button class="btn-secondary" onclick="searchNurseriesForPlant()">
                    <i class="fas fa-store"></i> Find in Nurseries
                </button>
            </div>
            <div class="api-notice">
                <p><i class="fas fa-info-circle"></i> This is a demo result. Add your Plant.id API key in Settings for real identification.</p>
            </div>
        </div>
    `;
    
    result.style.display = 'block';
}

function showRealPlantIdentification(file, result) {
    const resultDiv = document.getElementById('identificationResult');
    const uploadArea = document.getElementById('uploadArea');
    
    // Reset upload area
    uploadArea.innerHTML = `
        <i class="fas fa-camera fa-3x"></i>
        <p>Click to upload a photo or drag and drop</p>
        <input type="file" id="plantImage" accept="image/*" style="display: none;">
    `;
    
    if (!result.suggestions || result.suggestions.length === 0) {
        resultDiv.innerHTML = `
            <div class="identification-content">
                <h3>No Plants Identified</h3>
                <p>We couldn't identify any plants in this image. Please try a clearer photo of the plant.</p>
                <button class="btn-secondary" onclick="resetIdentification()">
                    <i class="fas fa-arrow-left"></i> Try Another Photo
                </button>
            </div>
        `;
        resultDiv.style.display = 'block';
        return;
    }
    
    const topSuggestion = result.suggestions[0];
    const confidence = Math.round(topSuggestion.confidence * 100);
    
    resultDiv.innerHTML = `
        <div class="identification-content">
            <h3>Plant Identification Results</h3>
            <div class="identified-plant">
                <img src="${URL.createObjectURL(file)}" alt="Uploaded plant" style="max-width: 200px; border-radius: 8px;">
                <div class="plant-info">
                    <h4>${topSuggestion.name}</h4>
                    <p><strong>Scientific Name:</strong> ${topSuggestion.scientificName}</p>
                    <p><strong>Confidence:</strong> ${confidence}%</p>
                    ${topSuggestion.description ? `<p><strong>Description:</strong> ${topSuggestion.description.substring(0, 200)}...</p>` : ''}
                    ${topSuggestion.commonNames && topSuggestion.commonNames.length > 0 ? 
                        `<p><strong>Common Names:</strong> ${topSuggestion.commonNames.join(', ')}</p>` : ''}
                </div>
            </div>
            
            ${result.suggestions.length > 1 ? `
                <div class="other-suggestions">
                    <h4>Other Possible Matches:</h4>
                    <div class="suggestion-list">
                        ${result.suggestions.slice(1, 4).map(suggestion => `
                            <div class="suggestion-item">
                                <span class="suggestion-name">${suggestion.name}</span>
                                <span class="suggestion-confidence">${Math.round(suggestion.confidence * 100)}%</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
            
            <div class="identification-actions">
                <button class="btn-primary" onclick="addIdentifiedPlant('${topSuggestion.name}')">
                    <i class="fas fa-plus"></i> Add to My Garden
                </button>
                <button class="btn-secondary" onclick="searchNurseriesForPlant('${topSuggestion.name}')">
                    <i class="fas fa-store"></i> Find in Nurseries
                </button>
                <button class="btn-secondary" onclick="resetIdentification()">
                    <i class="fas fa-arrow-left"></i> Try Another Photo
                </button>
            </div>
        </div>
    `;
    
    resultDiv.style.display = 'block';
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
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

function exportCalendar() {
    // Create calendar events for watering schedule
    const events = [];
    userGarden.forEach(plant => {
        const lastWatered = new Date(plant.lastWatered);
        const nextWatering = new Date(lastWatered);
        nextWatering.setDate(lastWatered.getDate() + plant.wateringSchedule);
        
        events.push({
            title: `Water ${plant.name}`,
            start: nextWatering.toISOString(),
            description: `Time to water your ${plant.name} located in ${plant.location}`
        });
    });
    
    // Create ICS file content
    let icsContent = 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Plantify//Plant Care Calendar//EN\n';
    
    events.forEach(event => {
        icsContent += `BEGIN:VEVENT\n`;
        icsContent += `SUMMARY:${event.title}\n`;
        icsContent += `DESCRIPTION:${event.description}\n`;
        icsContent += `DTSTART:${event.start.replace(/[-:]/g, '').split('.')[0]}Z\n`;
        icsContent += `END:VEVENT\n`;
    });
    
    icsContent += 'END:VCALENDAR';
    
    // Download file
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'plantify-calendar.ics';
    a.click();
    URL.revokeObjectURL(url);
    
    showNotification('Calendar exported successfully!');
}

function showProfile() {
    // Redirect to profile view or show profile modal
    window.location.href = 'profile-view.html';
}

// Helper functions
function resetIdentification() {
    document.getElementById('identificationResult').style.display = 'none';
    document.getElementById('uploadArea').innerHTML = `
        <i class="fas fa-camera fa-3x"></i>
        <p>Click to upload a photo or drag and drop</p>
        <input type="file" id="plantImage" accept="image/*" style="display: none;">
    `;
}

function addIdentifiedPlant(plantName = 'Snake Plant') {
    // Find the plant in our database or create a new entry
    const plant = db.searchPlants(plantName)[0] || {
        id: Date.now(),
        name: plantName,
        scientificName: plantName,
        maintenance: 'Low',
        light: 'Bright Indirect',
        water: 'Low',
        space: ['No Outdoor Space', 'Balcony'],
        travelFriendly: true,
        petSafe: false,
        description: `Identified plant: ${plantName}`,
        wateringSchedule: 7,
        image: 'default-plant.jpg'
    };
    
    addToGarden(plant.id);
    resetIdentification();
}

function searchNurseriesForPlant(plantName = 'Snake Plant') {
    // This would search nurseries for the specific plant
    showNotification(`Searching for ${plantName} in local nurseries...`, 'info');
    // In a real implementation, this would filter nurseries or search their inventory
}

// Global functions for HTML onclick handlers
window.addPlantToGarden = addPlantToGarden;
window.closeModal = closeModal;
window.showPlantDetails = showPlantDetails;
window.addToGarden = addToGarden;
window.waterPlant = waterPlant;
window.exportCalendar = exportCalendar;
window.showProfile = showProfile;
window.resetIdentification = resetIdentification;
window.addIdentifiedPlant = addIdentifiedPlant;
window.searchNurseriesForPlant = searchNurseriesForPlant; 