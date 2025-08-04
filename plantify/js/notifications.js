// Plantify Notification System
class NotificationManager {
    constructor() {
        this.notificationPermission = 'default';
        this.checkNotificationPermission();
        this.setupServiceWorker();
    }

    // Check and request notification permission
    async checkNotificationPermission() {
        if (!('Notification' in window)) {
            console.log('This browser does not support notifications');
            return;
        }

        this.notificationPermission = Notification.permission;
        
        if (this.notificationPermission === 'default') {
            this.notificationPermission = await Notification.requestPermission();
        }
    }

    // Setup service worker for background notifications
    async setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js');
                console.log('Service Worker registered:', registration);
            } catch (error) {
                console.log('Service Worker registration failed:', error);
            }
        }
    }

    // Send browser notification
    async sendNotification(title, options = {}) {
        if (this.notificationPermission !== 'granted') {
            console.log('Notification permission not granted');
            return false;
        }

        try {
            const notification = new Notification(title, {
                icon: '/assets/images/plantify-icon.png',
                badge: '/assets/images/plantify-badge.png',
                tag: 'plantify-notification',
                requireInteraction: false,
                ...options
            });

            // Handle notification click
            notification.onclick = function() {
                window.focus();
                notification.close();
                // Navigate to dashboard
                if (window.location.pathname !== '/dashboard.html') {
                    window.location.href = '/dashboard.html';
                }
            };

            return true;
        } catch (error) {
            console.error('Error sending notification:', error);
            return false;
        }
    }

    // Send watering reminder notification
    async sendWateringReminder(plant) {
        const title = `🌱 Time to water ${plant.name}!`;
        const options = {
            body: `Your ${plant.name} needs watering today. Tap to view your garden.`,
            icon: '/assets/images/watering-icon.png',
            badge: '/assets/images/plantify-badge.png',
            tag: `watering-${plant.id}`,
            requireInteraction: true,
            actions: [
                {
                    action: 'water',
                    title: 'Mark as Watered',
                    icon: '/assets/images/water-icon.png'
                },
                {
                    action: 'snooze',
                    title: 'Remind Later',
                    icon: '/assets/images/snooze-icon.png'
                }
            ]
        };

        return await this.sendNotification(title, options);
    }

    // Send maintenance reminder notification
    async sendMaintenanceReminder(plant, task) {
        const title = `🌿 ${plant.name} needs attention!`;
        const options = {
            body: `Time for ${task} on your ${plant.name}.`,
            icon: '/assets/images/maintenance-icon.png',
            tag: `maintenance-${plant.id}-${task}`,
            requireInteraction: false
        };

        return await this.sendNotification(title, options);
    }

    // Schedule watering notifications
    scheduleWateringNotifications() {
        const userGarden = JSON.parse(localStorage.getItem('plantifyGarden') || '[]');
        
        userGarden.forEach(plant => {
            this.schedulePlantWatering(plant);
        });
    }

    // Schedule notification for a specific plant
    schedulePlantWatering(plant) {
        const lastWatered = new Date(plant.lastWatered);
        const nextWatering = new Date(lastWatered);
        nextWatering.setDate(lastWatered.getDate() + plant.wateringSchedule);

        const now = new Date();
        const timeUntilWatering = nextWatering.getTime() - now.getTime();

        if (timeUntilWatering > 0) {
            // Schedule notification
            setTimeout(() => {
                this.sendWateringReminder(plant);
            }, timeUntilWatering);
        } else {
            // Plant needs watering now
            this.sendWateringReminder(plant);
        }
    }

    // Send email notification (requires backend integration)
    async sendEmailNotification(userEmail, subject, message) {
        // This would typically be handled by a backend service
        // For now, we'll simulate it
        console.log('Email notification would be sent:', {
            to: userEmail,
            subject: subject,
            message: message
        });

        // In a real implementation, you would make an API call to your backend
        // which would then send the email using a service like SendGrid, Mailgun, etc.
        
        return true;
    }

    // Create calendar event for watering
    async createCalendarEvent(plant, wateringDate) {
        const event = {
            summary: `Water ${plant.name}`,
            description: `Time to water your ${plant.name} located in ${plant.location}`,
            start: {
                dateTime: wateringDate.toISOString(),
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            end: {
                dateTime: new Date(wateringDate.getTime() + 30 * 60000).toISOString(), // 30 minutes later
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            reminders: {
                useDefault: false,
                overrides: [
                    { method: 'email', minutes: 24 * 60 }, // 1 day before
                    { method: 'popup', minutes: 60 } // 1 hour before
                ]
            }
        };

        // For Google Calendar integration
        if (window.gapi && window.gapi.auth2) {
            try {
                const response = await window.gapi.client.calendar.events.insert({
                    calendarId: 'primary',
                    resource: event
                });
                return response.result;
            } catch (error) {
                console.error('Error creating calendar event:', error);
                return null;
            }
        }

        // Fallback: Download ICS file
        this.downloadICSFile(event);
        return event;
    }

    // Download ICS file for calendar import
    downloadICSFile(event) {
        const icsContent = this.generateICSContent(event);
        const blob = new Blob([icsContent], { type: 'text/calendar' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `watering-${event.summary.replace(/\s+/g, '-')}.ics`;
        a.click();
        URL.revokeObjectURL(url);
    }

    // Generate ICS file content
    generateICSContent(event) {
        const formatDate = (date) => {
            return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        };

        return [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Plantify//Plant Care Calendar//EN',
            'BEGIN:VEVENT',
            `SUMMARY:${event.summary}`,
            `DESCRIPTION:${event.description}`,
            `DTSTART:${formatDate(new Date(event.start.dateTime))}`,
            `DTEND:${formatDate(new Date(event.end.dateTime))}`,
            'END:VEVENT',
            'END:VCALENDAR'
        ].join('\r\n');
    }

    // Setup daily notification check
    setupDailyCheck() {
        // Check for notifications every hour
        setInterval(() => {
            this.checkWateringSchedule();
        }, 60 * 60 * 1000); // 1 hour

        // Also check when the page loads
        this.checkWateringSchedule();
    }

    // Check watering schedule and send notifications
    checkWateringSchedule() {
        const userGarden = JSON.parse(localStorage.getItem('plantifyGarden') || '[]');
        const now = new Date();

        userGarden.forEach(plant => {
            const lastWatered = new Date(plant.lastWatered);
            const nextWatering = new Date(lastWatered);
            nextWatering.setDate(lastWatered.getDate() + plant.wateringSchedule);

            // If plant needs watering today
            if (nextWatering.toDateString() === now.toDateString()) {
                this.sendWateringReminder(plant);
            }
        });
    }

    // Get notification settings
    getNotificationSettings() {
        return JSON.parse(localStorage.getItem('notificationSettings') || '{}');
    }

    // Save notification settings
    saveNotificationSettings(settings) {
        localStorage.setItem('notificationSettings', JSON.stringify(settings));
    }

    // Test notification
    async testNotification() {
        const title = '🌿 Plantify Test Notification';
        const options = {
            body: 'This is a test notification from Plantify!',
            icon: '/assets/images/plantify-icon.png'
        };

        return await this.sendNotification(title, options);
    }
}

// Export for use in other modules
window.NotificationManager = NotificationManager; 