// Plantify Service Worker
const CACHE_NAME = 'plantify-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/profile.html',
    '/dashboard.html',
    '/css/style.css',
    '/js/database.js',
    '/js/dashboard.js',
    '/js/profile.js',
    '/js/notifications.js',
    '/js/plant-id-api.js',
    '/assets/images/default-plant.jpg'
];

// Install event
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached version or fetch from network
                return response || fetch(event.request);
            })
    );
});

// Push notification event
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : 'Time to check on your plants!',
        icon: '/assets/images/plantify-icon.png',
        badge: '/assets/images/plantify-badge.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'View Garden',
                icon: '/assets/images/garden-icon.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/assets/images/close-icon.png'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('🌿 Plantify Reminder', options)
    );
});

// Notification click event
self.addEventListener('notificationclick', event => {
    event.notification.close();

    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/dashboard.html')
        );
    } else if (event.action === 'water') {
        // Mark plant as watered
        event.waitUntil(
            clients.openWindow('/dashboard.html?action=water')
        );
    } else if (event.action === 'snooze') {
        // Snooze notification for 1 hour
        event.waitUntil(
            new Promise(resolve => {
                setTimeout(() => {
                    self.registration.showNotification(
                        '🌿 Plantify Reminder',
                        {
                            body: 'Reminder: Check your plants!',
                            icon: '/assets/images/plantify-icon.png'
                        }
                    );
                    resolve();
                }, 60 * 60 * 1000); // 1 hour
            })
        );
    } else {
        // Default action - open dashboard
        event.waitUntil(
            clients.openWindow('/dashboard.html')
        );
    }
});

// Background sync for offline functionality
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

async function doBackgroundSync() {
    try {
        // Check for pending watering notifications
        const userGarden = await getStoredGarden();
        const now = new Date();

        userGarden.forEach(plant => {
            const lastWatered = new Date(plant.lastWatered);
            const nextWatering = new Date(lastWatered);
            nextWatering.setDate(lastWatered.getDate() + plant.wateringSchedule);

            if (nextWatering.toDateString() === now.toDateString()) {
                self.registration.showNotification(
                    `🌱 Time to water ${plant.name}!`,
                    {
                        body: `Your ${plant.name} needs watering today.`,
                        icon: '/assets/images/watering-icon.png',
                        tag: `watering-${plant.id}`,
                        requireInteraction: true
                    }
                );
            }
        });
    } catch (error) {
        console.error('Background sync error:', error);
    }
}

// Get stored garden data
async function getStoredGarden() {
    try {
        const response = await fetch('/api/garden');
        return await response.json();
    } catch (error) {
        // Fallback to localStorage (would need to be implemented differently in a real app)
        return [];
    }
}

// Periodic background sync (if supported)
if ('periodicSync' in self.registration) {
    self.addEventListener('periodicsync', event => {
        if (event.tag === 'plantify-sync') {
            event.waitUntil(doBackgroundSync());
        }
    });
} 