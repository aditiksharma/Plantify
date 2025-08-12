// Plantify Dashboard - Main functionality
let db;
let userProfile;
let userGarden = [];
let currentFilter = 'all';
let plantIdAPI;
let notificationManager;
let userLocation = null;
let nurseriesData = [];
let currentView = 'list'; // 'list' or 'map'
let map = null;
let markers = [];

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing dashboard...');
    try {
    initializeDashboard();
        console.log('Dashboard initialized successfully');
    } catch (error) {
        console.error('Error initializing dashboard:', error);
    }
});

function initializeDashboard() {
    console.log('Starting dashboard initialization...');
    
    try {
    // Initialize database and APIs
        console.log('Initializing database and APIs...');
    db = new PlantifyDatabase();
    plantIdAPI = new PlantIdAPI();
    notificationManager = new NotificationManager();
        console.log('Database and APIs initialized');
    
    // Load user profile
        console.log('Loading user profile...');
    loadUserProfile();
        console.log('User profile loaded');
    
    // Load user's garden
        console.log('Loading user garden...');
    loadUserGarden();
        console.log('User garden loaded');
    
    // Setup navigation
        console.log('Setting up navigation...');
    setupNavigation();
        console.log('Navigation setup complete');
    
    // Setup filters
        console.log('Setting up filters...');
    setupFilters();
        console.log('Filters setup complete');
    
    // Setup file upload
        console.log('Setting up file upload...');
    setupFileUpload();
        console.log('File upload setup complete');
    
    // Load initial data
        console.log('Loading initial data...');
    loadRecommendations();
    loadNurseries();
    loadMaintenanceTasks();
        console.log('Initial data loaded');
        
        // Setup nursery filters
        console.log('Setting up nursery filters...');
        setupNurseryFilters();
        console.log('Nursery filters setup complete');
    
    // Setup notifications
        console.log('Setting up notifications...');
    setupNotifications();
        console.log('Notifications setup complete');
    
    // Set current date for plant acquisition
        console.log('Setting current date...');
    document.getElementById('plantDate').valueAsDate = new Date();
        console.log('Current date set');
        
        // Handle anchor links from homepage
        console.log('Handling anchor links...');
        handleAnchorLinks();
        console.log('Anchor links handled');
        
    } catch (error) {
        console.error('Error in initializeDashboard:', error);
        throw error;
    }
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
    
    // Update location display after profile is loaded
    updateUserLocation();
}

function loadUserGarden() {
    const gardenData = localStorage.getItem('plantifyGarden');
    userGarden = gardenData ? JSON.parse(gardenData) : [];
    renderGarden();
}

function setupNavigation() {
    console.log('Setting up navigation...');
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.dashboard-section');
    
    console.log('Found nav buttons:', navButtons.length);
    console.log('Found sections:', sections.length);
    
    navButtons.forEach(button => {
        console.log('Setting up button:', button.dataset.section);
        button.addEventListener('click', function() {
            console.log('Button clicked:', this.dataset.section);
            const targetSection = this.dataset.section;
            
            // Update active nav button
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show target section
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                    console.log('Activated section:', section.id);
                }
            });
        });
    });
}

function handleAnchorLinks() {
    // Check if there's a hash in the URL
    if (window.location.hash) {
        const targetSection = window.location.hash.substring(1); // Remove the #
        
        // Find the corresponding nav button
        const navButton = document.querySelector(`[data-section="${targetSection}"]`);
        if (navButton) {
            // Simulate clicking the nav button
            navButton.click();
            
            // Scroll to the section
            const section = document.getElementById(targetSection);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
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

// Google Places API Configuration
// To get your own API key:
// 1. Go to https://console.cloud.google.com/
// 2. Create a new project or select existing
// 3. Enable Places API and Geocoding API
// 4. Create credentials (API key)
// 5. Replace 'YOUR_GOOGLE_API_KEY' below with your actual key
const GOOGLE_API_KEY = 'AIzaSyDCLOpYtZ2jRwjMcw4ohW-d2CHgB4fQUGw';
const GOOGLE_PLACES_BASE_URL = 'https://maps.googleapis.com/maps/api/place';

// CORS proxy for development (if needed)
const CORS_PROXY = 'https://corsproxy.io/?';

// Bay Area Nurseries Data (fallback)
const BAY_AREA_NURSERIES = [
    {
        id: 1,
        name: "Flora Grubb Gardens",
        address: "1634 Jerrold Ave, San Francisco, CA 94124",
        zipCode: "94124",
        rating: 4.7,
        distance: 0,
        coordinates: { lat: 37.7308, lng: -122.4014 },
        specialties: ["Succulents", "Tropical Plants", "Air Plants"],
        hours: "Mon-Sat: 9AM-6PM, Sun: 10AM-5PM",
        website: "https://floragrubb.com",
        description: "Modern garden center with unique plants and design services"
    },
    {
        id: 2,
        name: "Sloat Garden Center",
        address: "2700 Sloat Blvd, San Francisco, CA 94116",
        zipCode: "94116",
        rating: 4.5,
        distance: 0,
        coordinates: { lat: 37.7345, lng: -122.4834 },
        specialties: ["Native Plants", "Vegetables", "Herbs"],
        hours: "Mon-Sat: 8AM-6PM, Sun: 9AM-5PM",
        website: "https://sloatgardens.com",
        description: "Family-owned garden center with extensive plant selection"
    }
];

function loadNurseries() {
    nurseriesData = [];
    updateUserLocation();
    
    // Try to get nurseries from API first, fallback to local data
    if (userLocation || (userProfile && userProfile.zip)) {
        searchNurseriesAPI();
    } else {
        // Fallback to local data
        nurseriesData = [...BAY_AREA_NURSERIES];
        filterAndRenderNurseries();
    }
}

async function searchNurseriesAPI() {
    const locationElement = document.getElementById('currentLocation');
    locationElement.textContent = 'Searching for nurseries...';
    
    console.log('Starting nursery search...');
    console.log('User profile:', userProfile);
    console.log('User location:', userLocation);
    
    try {
        let searchLocation;
        
        if (userLocation) {
            // Use precise coordinates
            searchLocation = userLocation;
            console.log('Using precise location:', searchLocation);
        } else if (userProfile && userProfile.zip) {
            // Convert ZIP code to coordinates first
            console.log('Converting ZIP code to coordinates:', userProfile.zip);
            searchLocation = await getCoordinatesFromZip(userProfile.zip);
            if (!searchLocation) {
                throw new Error('Could not find coordinates for ZIP code');
            }
            console.log('ZIP coordinates:', searchLocation);
        } else {
            throw new Error('No location available');
        }
        
        const apiUrl = `${GOOGLE_PLACES_BASE_URL}/nearbysearch/json?` +
            `location=${searchLocation.lat},${searchLocation.lng}&` +
            `radius=50000&` +
            `type=garden_center&` +
            `keyword=garden center nursery plant store flower shop&` +
            `key=${GOOGLE_API_KEY}`;
        
        console.log('API URL:', apiUrl);
        
        let response;
        try {
            // Use CORS proxy by default since direct calls are blocked
            response = await fetch(CORS_PROXY + apiUrl);
        } catch (corsError) {
            console.log('CORS proxy failed, trying direct call:', corsError);
            // Fallback to direct call (will likely fail due to CORS)
            response = await fetch(apiUrl);
        }
        
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        
        if (!response.ok) {
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('API response:', data);
        
        if (data.status !== 'OK') {
            throw new Error(`Google Places API error: ${data.status} - ${data.error_message || 'Unknown error'}`);
        }
        
        nurseriesData = data.results.map(place => ({
            id: place.place_id,
            name: place.name,
            address: place.vicinity,
            rating: place.rating || 0,
            distance: place.distance ? (place.distance * 0.000621371) : 0, // Convert meters to miles
            coordinates: {
                lat: place.geometry.location.lat,
                lng: place.geometry.location.lng
            },
            specialties: place.types,
            hours: 'Hours not available',
            website: place.website || '#',
            description: place.types.join(', '),
            price: place.price_level ? '$'.repeat(place.price_level) : 'N/A',
            reviewCount: place.user_ratings_total || 0
        }));
        
        console.log('Processed nurseries:', nurseriesData);
        
        updateUserLocation();
        filterAndRenderNurseries();
        
    } catch (error) {
        console.error('Error fetching nurseries:', error);
        
        // Fallback to local data
        nurseriesData = [...BAY_AREA_NURSERIES];
        locationElement.textContent = `Using local data (${error.message})`;
        filterAndRenderNurseries();
    }
}

// Get coordinates from ZIP code or city name
async function getCoordinatesFromZip(searchTerm) {
    console.log('Getting coordinates for:', searchTerm);
    
    try {
        const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?` +
            `address=${encodeURIComponent(searchTerm)}&` +
            `key=${GOOGLE_API_KEY}`;
        
        console.log('Geocoding URL:', geocodingUrl);
        
        let response;
        try {
            response = await fetch(CORS_PROXY + geocodingUrl);
        } catch (corsError) {
            console.log('CORS error, trying with proxy:', corsError);
            response = await fetch(geocodingUrl);
        }
        
        if (!response.ok) {
            throw new Error(`Geocoding API request failed: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Geocoding results:', data);
        
        if (data.status !== 'OK' || !data.results || data.results.length === 0) {
            throw new Error(`Geocoding API error: ${data.status} - ${data.error_message || 'No results found'}`);
        }
        
        const location = data.results[0].geometry.location;
        console.log('Found coordinates:', location);
        
        return {
            lat: location.lat,
            lng: location.lng
        };
        
    } catch (error) {
        console.error('Error getting coordinates:', error);
        return null;
    }
}

function formatHours(hours) {
    if (!hours || hours.length === 0) return 'Hours not available';
    
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return hours.map(day => {
        const dayName = dayNames[day.day];
        const open = day.start.substring(0, 2) + ':' + day.start.substring(2, 4);
        const close = day.end.substring(0, 2) + ':' + day.end.substring(2, 4);
        return `${dayName}: ${open}-${close}`;
    }).join(', ');
}



function updateUserLocation() {
    const locationElement = document.getElementById('currentLocation');
    
    if (userLocation) {
        // Use precise location
        locationElement.textContent = `Using precise location (${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)})`;
        calculateDistances(userLocation.lat, userLocation.lng);
    } else if (userProfile && userProfile.zip) {
        // Use ZIP code from profile
        locationElement.textContent = `Based on ZIP code: ${userProfile.zip}`;
        // For demo, use approximate coordinates for ZIP code
        const zipCoordinates = getZipCoordinates(userProfile.zip);
        if (zipCoordinates) {
            calculateDistances(zipCoordinates.lat, zipCoordinates.lng);
        }
    } else {
        locationElement.textContent = 'Location not available';
    }
}

function getZipCoordinates(zipCode) {
    // Simplified ZIP code to coordinates mapping for Bay Area
    const zipMap = {
        '94102': { lat: 37.7793, lng: -122.4193 }, // San Francisco
        '94103': { lat: 37.7749, lng: -122.4194 },
        '94104': { lat: 37.7913, lng: -122.4087 },
        '94105': { lat: 37.7864, lng: -122.3892 },
        '94107': { lat: 37.7626, lng: -122.4091 },
        '94108': { lat: 37.7929, lng: -122.4079 },
        '94109': { lat: 37.7924, lng: -122.4147 },
        '94110': { lat: 37.7485, lng: -122.4158 },
        '94111': { lat: 37.7989, lng: -122.3997 },
        '94112': { lat: 37.7196, lng: -122.4478 },
        '94114': { lat: 37.7587, lng: -122.4330 },
        '94115': { lat: 37.7749, lng: -122.4194 },
        '94116': { lat: 37.7345, lng: -122.4834 },
        '94117': { lat: 37.7694, lng: -122.4442 },
        '94118': { lat: 37.7813, lng: -122.4637 },
        '94121': { lat: 37.7288, lng: -122.4784 },
        '94122': { lat: 37.7288, lng: -122.4784 },
        '94123': { lat: 37.8002, lng: -122.4369 },
        '94124': { lat: 37.7308, lng: -122.4014 },
        '94127': { lat: 37.7345, lng: -122.4834 },
        '94129': { lat: 37.8002, lng: -122.4369 },
        '94130': { lat: 37.8249, lng: -122.3695 },
        '94131': { lat: 37.7447, lng: -122.4388 },
        '94132': { lat: 37.7196, lng: -122.4478 },
        '94133': { lat: 37.8002, lng: -122.4369 },
        '94134': { lat: 37.7308, lng: -122.4014 },
        '94601': { lat: 37.8044, lng: -122.2711 }, // Oakland
        '94602': { lat: 37.8044, lng: -122.2711 },
        '94603': { lat: 37.8044, lng: -122.2711 },
        '94605': { lat: 37.8044, lng: -122.2711 },
        '94606': { lat: 37.8044, lng: -122.2711 },
        '94607': { lat: 37.8044, lng: -122.2711 },
        '94608': { lat: 37.8044, lng: -122.2711 },
        '94609': { lat: 37.8044, lng: -122.2711 },
        '94610': { lat: 37.8145, lng: -122.2507 },
        '94611': { lat: 37.8044, lng: -122.2711 },
        '94612': { lat: 37.8044, lng: -122.2711 },
        '94613': { lat: 37.8044, lng: -122.2711 },
        '94614': { lat: 37.8044, lng: -122.2711 },
        '94615': { lat: 37.8044, lng: -122.2711 },
        '94617': { lat: 37.8044, lng: -122.2711 },
        '94618': { lat: 37.8044, lng: -122.2711 },
        '94619': { lat: 37.8044, lng: -122.2711 },
        '94621': { lat: 37.8044, lng: -122.2711 },
        '94702': { lat: 37.8695, lng: -122.2881 }, // Berkeley
        '94703': { lat: 37.8695, lng: -122.2881 },
        '94704': { lat: 37.8695, lng: -122.2881 },
        '94705': { lat: 37.8695, lng: -122.2881 },
        '94706': { lat: 37.8695, lng: -122.2881 },
        '94707': { lat: 37.8695, lng: -122.2881 },
        '94708': { lat: 37.8695, lng: -122.2881 },
        '94709': { lat: 37.8695, lng: -122.2881 },
        '94710': { lat: 37.8695, lng: -122.2881 },
        '94801': { lat: 37.9365, lng: -122.3537 }, // Richmond
        '94802': { lat: 37.9365, lng: -122.3537 },
        '94803': { lat: 37.9365, lng: -122.3537 },
        '94804': { lat: 37.9365, lng: -122.3537 },
        '94805': { lat: 37.9365, lng: -122.3537 },
        '94806': { lat: 37.9365, lng: -122.3537 }
    };
    
    return zipMap[zipCode] || null;
}

function calculateDistances(userLat, userLng) {
    console.log('Calculating distances from:', userLat, userLng);
    console.log('Number of nurseries to calculate distances for:', nurseriesData.length);
    
    nurseriesData.forEach((nursery, index) => {
        const distance = calculateDistance(userLat, userLng, nursery.coordinates.lat, nursery.coordinates.lng);
        nursery.distance = distance;
        
        if (index < 5) { // Log first 5 for debugging
            console.log(`Nursery ${index + 1}: "${nursery.name}" - Distance: ${distance.toFixed(2)} miles`);
        }
    });
    
    // Log distance statistics
    const distances = nurseriesData.map(n => n.distance);
    const minDistance = Math.min(...distances);
    const maxDistance = Math.max(...distances);
    const avgDistance = distances.reduce((a, b) => a + b, 0) / distances.length;
    
    console.log(`Distance stats - Min: ${minDistance.toFixed(2)} miles, Max: ${maxDistance.toFixed(2)} miles, Avg: ${avgDistance.toFixed(2)} miles`);
}

function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 3959; // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
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

function filterAndRenderNurseries() {
    const filteredNurseries = filterNurseries();
    
    if (currentView === 'list') {
        renderNurseries(filteredNurseries);
    } else {
        updateMap();
    }
}

function renderNurseries(nurseries) {
    const list = document.getElementById('nurseriesList');
    list.innerHTML = '';
    
    if (nurseries.length === 0) {
        list.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search fa-3x"></i>
                <h3>No nurseries found</h3>
                <p>Try adjusting your search criteria or distance filter.</p>
            </div>
        `;
        return;
    }
    
    nurseries.forEach(nursery => {
        const nurseryCard = document.createElement('div');
        nurseryCard.className = 'nursery-card';
        
        const specialties = nursery.specialties.join(', ');
        const distanceText = nursery.distance > 0 ? `${nursery.distance.toFixed(1)} miles away` : 'Distance calculating...';
        
        nurseryCard.innerHTML = `
            <div class="nursery-info">
                <h3>${nursery.name}</h3>
                <p class="nursery-address"><i class="fas fa-map-marker-alt"></i> ${nursery.address}</p>
                <p class="nursery-distance"><i class="fas fa-route"></i> ${distanceText}</p>
                <div class="nursery-rating">
                    <span class="stars">
                        ${'★'.repeat(Math.floor(nursery.rating))}${'☆'.repeat(5 - Math.floor(nursery.rating))}
                    </span>
                    <span class="rating-text">${nursery.rating}/5</span>
                </div>
            </div>
            <div class="nursery-actions">
                ${nursery.website && nursery.website !== '#' ? 
                    `<a href="${nursery.website}" target="_blank" class="btn-secondary">
                        <i class="fas fa-external-link-alt"></i> Website
                    </a>` : 
                    `<span class="no-website">No website available</span>`
                }
            </div>
        `;
        
        list.appendChild(nurseryCard);
    });
}

function setupNurseryFilters() {
    const distanceFilter = document.getElementById('distanceFilter');
    const sortBy = document.getElementById('sortBy');
    const zipInput = document.getElementById('zipCodeInput');
    
    if (distanceFilter) {
        distanceFilter.addEventListener('change', filterAndRenderNurseries);
    }
    if (sortBy) {
        sortBy.addEventListener('change', filterAndRenderNurseries);
    }
    if (zipInput) {
        // Only allow Enter key for immediate search
        zipInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchByZipCode();
            }
        });
    }
}

function usePreciseLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                updateUserLocation();
                filterAndRenderNurseries();
            },
            function(error) {
                console.error('Geolocation error:', error);
                alert('Unable to get your precise location. Using ZIP code instead.');
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000 // 5 minutes
            }
        );
    } else {
        alert('Geolocation is not supported by your browser. Using ZIP code instead.');
    }
}

function refreshNurseries() {
    loadNurseries();
}

// Initialize Google Maps
function initMap() {
    const mapElement = document.getElementById('nurseryMap');
    if (!mapElement) return;
    
    // Set default center (will be updated when location is available)
    const defaultCenter = { lat: 37.7749, lng: -122.4194 }; // San Francisco
    
    map = new google.maps.Map(mapElement, {
        zoom: 12,
        center: defaultCenter,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        styles: [
            {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
            }
        ]
    });
    
    // Only search when user explicitly moves the map (optional feature)
    // map.addListener('idle', function() {
    //     const center = map.getCenter();
    //     if (center) {
    //         searchNurseriesInArea(center.lat(), center.lng());
    //     }
    // });
}

// Switch between list and map view
function switchView(view) {
    currentView = view;
    console.log('Switching to view:', view);
    console.log('Current nurseries data:', nurseriesData.length);
    console.log('User location:', userLocation);
    
    const listView = document.getElementById('listView');
    const mapView = document.getElementById('mapView');
    const listContainer = document.getElementById('nurseriesList');
    const mapContainer = document.getElementById('mapContainer');
    
    if (view === 'list') {
        listView.classList.add('active');
        mapView.classList.remove('active');
        listContainer.style.display = 'block';
        mapContainer.style.display = 'none';
    } else {
        mapView.classList.add('active');
        listView.classList.remove('active');
        listContainer.style.display = 'none';
        mapContainer.style.display = 'block';
        
        // Initialize map if not already done
        if (!map) {
            console.log('Initializing map...');
            initMap();
        }
        
        // Update map with current data
        console.log('Updating map with current data...');
        updateMap();
    }
}

// Update map with current nursery data
function updateMap() {
    if (!map) {
        console.log('Map not initialized, initializing now...');
        initMap();
    }
    
    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    markers = [];
    
    // Get filtered nurseries
    const filteredNurseries = filterNurseries();
    
    console.log('Total nurseries data:', nurseriesData.length);
    console.log('Filtered nurseries:', filteredNurseries.length);
    console.log('Distance filter:', document.getElementById('distanceFilter')?.value || '20');
    console.log('User location:', userLocation);
    
    // Set map center to ZIP code location or first nursery
    if (userLocation) {
        console.log('Centering map on ZIP code location:', userLocation);
        map.setCenter(userLocation);
        map.setZoom(12); // Zoom level appropriate for ZIP code area
    } else if (nurseriesData.length > 0) {
        const center = {
            lat: nurseriesData[0].coordinates.lat,
            lng: nurseriesData[0].coordinates.lng
        };
        console.log('Centering map on first nursery:', center);
        map.setCenter(center);
        map.setZoom(12);
    }
    
    if (filteredNurseries.length === 0) {
        // Check if we have any nurseries at all
        if (nurseriesData.length === 0) {
            const mapElement = document.getElementById('nurseryMap');
            const zipInput = document.getElementById('zipCodeInput');
            const searchTerm = zipInput ? zipInput.value.trim() : '';
            mapElement.innerHTML = `
                <div style="text-align: center; padding: 20px;">
                    <i class="fas fa-search fa-3x" style="color: #6c757d; margin-bottom: 15px;"></i>
                    <h3>No nurseries found</h3>
                    <p>No nurseries found near ${searchTerm}.</p>
                    <p>Try a different location or use the "Explore Bay Area" feature.</p>
                </div>
            `;
        } else {
            // We have nurseries but they're filtered out by distance
            const currentDistance = document.getElementById('distanceFilter')?.value || '20';
            const mapElement = document.getElementById('nurseryMap');
            mapElement.innerHTML = `
                <div style="text-align: center; padding: 20px;">
                    <i class="fas fa-search fa-3x" style="color: #6c757d; margin-bottom: 15px;"></i>
                    <h3>No nurseries within ${currentDistance} miles</h3>
                    <p>Found ${nurseriesData.length} nurseries total in the area. The distance filter is too restrictive.</p>
                    <button class="btn-primary" onclick="document.getElementById('distanceFilter').value='20'; filterAndRenderNurseries();" style="margin-top: 10px;">
                        <i class="fas fa-expand-arrows-alt"></i> Show All Nurseries (20 miles)
                    </button>
                </div>
            `;
        }
        return;
    }
    
    // Add markers for each nursery
    filteredNurseries.forEach(nursery => {
        const marker = new google.maps.Marker({
            position: { lat: nursery.coordinates.lat, lng: nursery.coordinates.lng },
            map: map,
            title: nursery.name,
            icon: {
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="16" cy="16" r="12" fill="#28a745" stroke="white" stroke-width="2"/>
                        <path d="M16 8 L18 14 L24 14 L19 18 L21 24 L16 20 L11 24 L13 18 L8 14 L14 14 Z" fill="white"/>
                    </svg>
                `),
                scaledSize: new google.maps.Size(32, 32),
                anchor: new google.maps.Point(16, 16)
            }
        });
        
        // Create info window
        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div style="padding: 10px; max-width: 250px;">
                    <h3 style="margin: 0 0 8px 0; color: #333;">${nursery.name}</h3>
                    <p style="margin: 5px 0; color: #666; font-size: 12px;">
                        <i class="fas fa-map-marker-alt"></i> ${nursery.address}
                    </p>
                    <p style="margin: 5px 0; color: #666; font-size: 12px;">
                        <i class="fas fa-star"></i> ${nursery.rating}/5 (${nursery.reviewCount || 0} reviews)
                    </p>
                    <p style="margin: 5px 0; color: #666; font-size: 12px;">
                        <i class="fas fa-route"></i> ${nursery.distance.toFixed(1)} miles away
                    </p>
                    <div style="margin-top: 10px;">
                        ${nursery.website && nursery.website !== '#' ? 
                            `<a href="${nursery.website}" target="_blank" style="color: #007bff; text-decoration: none;">
                                <i class="fas fa-external-link-alt"></i> Website
                            </a>` : 
                            `<span style="color: #6c757d; font-size: 12px;">No website available</span>`
                        }
                    </div>
                </div>
            `
        });
        
        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
        
        markers.push(marker);
    });
    
    // Adjust zoom to fit all markers
    if (filteredNurseries.length > 1) {
        const bounds = new google.maps.LatLngBounds();
        filteredNurseries.forEach(nursery => {
            bounds.extend({ lat: nursery.coordinates.lat, lng: nursery.coordinates.lng });
        });
        map.fitBounds(bounds);
    }
}

// Filter nurseries based on distance and sort criteria
function filterNurseries() {
    const maxDistance = parseInt(document.getElementById('distanceFilter')?.value || '20');
    const sortBy = document.getElementById('sortBy')?.value || 'distance';
    
    console.log('Filtering nurseries with max distance:', maxDistance);
    console.log('Total nurseries before filtering:', nurseriesData.length);
    
    // Apply distance filter to ALL searches (both ZIP code and non-ZIP searches)
    let filtered = nurseriesData.filter(nursery => {
        const withinDistance = nursery.distance <= maxDistance;
        console.log(`Nursery "${nursery.name}": distance=${nursery.distance.toFixed(2)} miles, within ${maxDistance} miles: ${withinDistance}`);
        return withinDistance;
    });
    
    console.log(`Applied distance filter: ${filtered.length} nurseries within ${maxDistance} miles`);
    console.log('Nurseries after filtering:', filtered.length);
    
    // Sort results
    filtered.sort((a, b) => {
        switch (sortBy) {
            case 'rating':
                return b.rating - a.rating;
            case 'name':
                return a.name.localeCompare(b.name);
            default:
                return a.distance - b.distance;
        }
    });
    
    return filtered;
}

// Search nurseries by manually entered ZIP code or city name
async function searchByZipCode() {
    const zipInput = document.getElementById('zipCodeInput');
    const searchTerm = zipInput.value.trim();
    
    if (!searchTerm) {
        return; // Don't search if no input entered
    }
    
    console.log('Searching nurseries for:', searchTerm);
    
    // Show loading state
    const locationElement = document.getElementById('currentLocation');
    locationElement.textContent = `Searching for nurseries near ${searchTerm}...`;
    
    // Clear current location and set to use search term
    userLocation = null;
    
    // Get coordinates for the search term (ZIP code or city name)
    const coordinates = await getCoordinatesFromZip(searchTerm);
    if (!coordinates) {
        locationElement.textContent = 'Could not find coordinates for this location. Please try again.';
        return;
    }
    
    // Search for nurseries
    try {
        // Use multiple search approaches to find more nurseries (like Google does)
        const searchTerms = [
            'garden center',
            'nursery',
            'plant store',
            'flower shop',
            'landscape supply',
            'garden nursery',
            'plant nursery',
            'garden store'
        ];
        
        let allResults = [];
        console.log(`Searching for nurseries near ${searchTerm} with ${searchTerms.length} different search terms`);
        console.log('Search coordinates:', coordinates);
        
        // First, try text search (more comprehensive like Google)
        for (const term of searchTerms) {
            const textSearchUrl = `${GOOGLE_PLACES_BASE_URL}/textsearch/json?` +
                `query=${encodeURIComponent(term + ' in ' + searchTerm)}&` +
                `key=${GOOGLE_API_KEY}`;
            
            console.log(`Text searching for: "${term} in ${searchTerm}"`);
            console.log('Text search URL:', textSearchUrl);
            
            let response;
            try {
                response = await fetch(CORS_PROXY + textSearchUrl);
            } catch (corsError) {
                console.log('CORS error, trying with proxy:', corsError);
                response = await fetch(textSearchUrl);
            }
            
            if (!response.ok) {
                console.log(`Failed to text search for "${term}": ${response.status} ${response.statusText}`);
                continue;
            }
            
            const data = await response.json();
            console.log(`Text search results for "${term}": ${data.results ? data.results.length : 0} nurseries`);
            console.log('Text search response status:', data.status);
            
            if (data.status === 'OK' && data.results) {
                allResults = allResults.concat(data.results);
                console.log(`Added ${data.results.length} results for "${term}"`);
            } else {
                console.log('Text search failed or no results:', data.status, data.error_message);
            }
        }
        
        // Also try nearby search as backup
        for (const term of searchTerms) {
            const nearbySearchUrl = `${GOOGLE_PLACES_BASE_URL}/nearbysearch/json?` +
                `location=${coordinates.lat},${coordinates.lng}&` +
                `radius=100000&` +
                `keyword=${encodeURIComponent(term)}&` +
                `key=${GOOGLE_API_KEY}`;
            
            console.log(`Nearby searching for: "${term}"`);
            
            let response;
            try {
                response = await fetch(CORS_PROXY + nearbySearchUrl);
            } catch (corsError) {
                console.log('CORS error, trying with proxy:', corsError);
                response = await fetch(nearbySearchUrl);
            }
            
            if (!response.ok) {
                console.log(`Failed to nearby search for "${term}": ${response.status}`);
                continue;
            }
            
            const data = await response.json();
            console.log(`Nearby search results for "${term}": ${data.results ? data.results.length : 0} nurseries`);
            
            if (data.status === 'OK' && data.results) {
                allResults = allResults.concat(data.results);
                console.log(`Added ${data.results.length} results for "${term}"`);
            }
        }
        
        console.log(`Total results before deduplication: ${allResults.length}`);
        
        // Remove duplicates based on place_id
        const uniqueResults = [];
        const seenIds = new Set();
        
        allResults.forEach(place => {
            if (!seenIds.has(place.place_id)) {
                seenIds.add(place.place_id);
                uniqueResults.push(place);
            }
        });
        
        console.log(`Total unique nurseries found: ${uniqueResults.length}`);
        
        if (uniqueResults.length === 0) {
            // Fallback to simple search
            console.log('No results from comprehensive search, trying simple fallback...');
            const fallbackUrl = `${GOOGLE_PLACES_BASE_URL}/textsearch/json?` +
                `query=nursery garden center plant store ${searchTerm}&` +
                `key=${GOOGLE_API_KEY}`;
            
            let response = await fetch(CORS_PROXY + fallbackUrl);
            if (!response.ok) {
                response = await fetch(fallbackUrl);
            }
            
            if (!response.ok) {
                throw new Error(`API request failed: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            console.log('Fallback search results:', data);
            
            if (data.status !== 'OK') {
                throw new Error(`Google Places API error: ${data.status} - ${data.error_message || 'Unknown error'}`);
            }
            
            uniqueResults = data.results || [];
            console.log(`Fallback found ${uniqueResults.length} nurseries`);
        }
        
        if (uniqueResults.length === 0) {
            throw new Error('No nurseries found in the area');
        }
        
        // Process and display results
        nurseriesData = uniqueResults.map(place => ({
            id: place.place_id,
            name: place.name,
            address: place.vicinity,
            rating: place.rating || 0,
            distance: 0, // Will be calculated by calculateDistances function
            coordinates: {
                lat: place.geometry.location.lat,
                lng: place.geometry.location.lng
            },
            specialties: place.types || [],
            hours: 'Hours not available',
            website: place.website || '#',
            description: place.types ? place.types.join(', ') : '',
            price: place.price_level ? '$'.repeat(place.price_level) : 'N/A',
            reviewCount: place.user_ratings_total || 0
        }));
        
        // Fetch detailed information including websites for each nursery
        console.log('Fetching detailed information for nurseries...');
        for (let i = 0; i < nurseriesData.length; i++) {
            const nursery = nurseriesData[i];
            try {
                const detailsUrl = `${GOOGLE_PLACES_BASE_URL}/details/json?` +
                    `place_id=${nursery.id}&` +
                    `fields=website,formatted_phone_number,opening_hours&` +
                    `key=${GOOGLE_API_KEY}`;
                
                let response;
                try {
                    response = await fetch(CORS_PROXY + detailsUrl);
                } catch (corsError) {
                    response = await fetch(detailsUrl);
                }
                
                if (response.ok) {
                    const details = await response.json();
                    if (details.status === 'OK' && details.result) {
                        // Update nursery with detailed information
                        if (details.result.website) {
                            nursery.website = details.result.website;
                            console.log(`Updated website for ${nursery.name}: ${nursery.website}`);
                        }
                        if (details.result.formatted_phone_number) {
                            nursery.phone = details.result.formatted_phone_number;
                        }
                        if (details.result.opening_hours) {
                            nursery.hours = details.result.opening_hours.open_now ? 'Open now' : 'Closed';
                        }
                    }
                }
                
                // Small delay to avoid hitting API rate limits
                await new Promise(resolve => setTimeout(resolve, 100));
                
            } catch (error) {
                console.log(`Failed to fetch details for ${nursery.name}:`, error);
            }
        }
        
        console.log(`Found ${nurseriesData.length} unique nurseries in the ${searchTerm} area`);
        
        // Calculate distances from the ZIP code coordinates
        calculateDistances(coordinates.lat, coordinates.lng);
        
        console.log('Processed nurseries data:', nurseriesData);
        console.log('Sample nursery data:', nurseriesData[0]);
        console.log('ZIP code coordinates:', coordinates);
        
        // Update location display with results
        if (nurseriesData.length > 0) {
            const totalFound = nurseriesData.length;
            const distanceFilter = document.getElementById('distanceFilter')?.value || '20';
            locationElement.textContent = `Found ${totalFound} nurseries in the ${searchTerm} area (showing those within ${distanceFilter} miles)`;
            console.log('Location updated with success message');
        } else {
            locationElement.textContent = `No nurseries found near ${searchTerm}. Try a different location or use the "Explore Bay Area" feature.`;
            console.log('Location updated with no results message');
        }
        
        // Set user location to search coordinates for consistent behavior
        userLocation = coordinates;
        
        // Apply filters and render results
        filterAndRenderNurseries();
        
        console.log('Search completed successfully');
        
        // Update map if in map view
        if (currentView === 'map') {
            console.log('Current view is map, updating map...');
            updateMap();
        } else {
            console.log('Current view is list, not updating map');
        }
        
    } catch (error) {
        console.error('Error searching nurseries:', error);
        locationElement.textContent = 'Search failed. Please try again.';
    }
}

// Search for nurseries in a specific area (for map panning)
async function searchNurseriesInArea(lat, lng) {
    console.log('Searching nurseries in area:', lat, lng);
    
    try {
        // Use broader search terms to find more nurseries
        const searchTerms = [
            'garden center',
            'nursery',
            'plant store',
            'flower shop',
            'landscape supply'
        ];
        
        let allNurseries = [];
        
        // Search for each term to get more comprehensive results
        for (const term of searchTerms) {
            const apiUrl = `${GOOGLE_PLACES_BASE_URL}/nearbysearch/json?` +
                `location=${lat},${lng}&` +
                `radius=25000&` + // 25 mile radius
                `keyword=${encodeURIComponent(term)}&` +
                `key=${GOOGLE_API_KEY}`;
            
            console.log('Searching for:', term);
            
            let response;
            try {
                response = await fetch(CORS_PROXY + apiUrl);
            } catch (corsError) {
                console.log('CORS error, trying direct call:', corsError);
                response = await fetch(apiUrl);
            }
            
            if (response.ok) {
                const data = await response.json();
                
                if (data.status === 'OK' && data.results) {
                    // Add nurseries from this search term
                    const nurseries = data.results.map(place => ({
                        id: place.place_id,
                        name: place.name,
                        address: place.vicinity,
                        rating: place.rating || 0,
                        distance: place.distance ? (place.distance * 0.000621371) : 0,
                        coordinates: {
                            lat: place.geometry.location.lat,
                            lng: place.geometry.location.lng
                        },
                        specialties: place.types,
                        hours: 'Hours not available',
                        website: place.website || '#',
                        description: place.types.join(', '),
                        price: place.price_level ? '$'.repeat(place.price_level) : 'N/A',
                        reviewCount: place.user_ratings_total || 0
                    }));
                    
                    allNurseries = allNurseries.concat(nurseries);
                }
            }
            
            // Small delay to avoid hitting API rate limits
            await new Promise(resolve => setTimeout(resolve, 200));
        }
        
        // Remove duplicates based on place_id
        const uniqueNurseries = allNurseries.filter((nursery, index, self) => 
            index === self.findIndex(n => n.id === nursery.id)
        );
        
        console.log('Found unique nurseries:', uniqueNurseries.length);
        
        // Update the global nurseries data
        nurseriesData = uniqueNurseries;
        
        // Fetch detailed information including websites for each nursery
        console.log('Fetching detailed information for nurseries...');
        for (let i = 0; i < nurseriesData.length; i++) {
            const nursery = nurseriesData[i];
            try {
                const detailsUrl = `${GOOGLE_PLACES_BASE_URL}/details/json?` +
                    `place_id=${nursery.id}&` +
                    `fields=website,formatted_phone_number,opening_hours&` +
                    `key=${GOOGLE_API_KEY}`;
                
                let response;
                try {
                    response = await fetch(CORS_PROXY + detailsUrl);
                } catch (corsError) {
                    response = await fetch(detailsUrl);
                }
                
                if (response.ok) {
                    const details = await response.json();
                    if (details.status === 'OK' && details.result) {
                        // Update nursery with detailed information
                        if (details.result.website) {
                            nursery.website = details.result.website;
                            console.log(`Updated website for ${nursery.name}: ${nursery.website}`);
                        }
                        if (details.result.formatted_phone_number) {
                            nursery.phone = details.result.formatted_phone_number;
                        }
                        if (details.result.opening_hours) {
                            nursery.hours = details.result.opening_hours.open_now ? 'Open now' : 'Closed';
                        }
                    }
                }
                
                // Small delay to avoid hitting API rate limits
                await new Promise(resolve => setTimeout(resolve, 100));
                
            } catch (error) {
                console.log(`Failed to fetch details for ${nursery.name}:`, error);
            }
        }
        
        // Calculate distances from the map center
        calculateDistances(lat, lng);
        
        // Update the display
        if (currentView === 'list') {
            filterAndRenderNurseries();
        } else {
            updateMap();
        }
        
        // Update location display
        const locationElement = document.getElementById('currentLocation');
        locationElement.textContent = `Found ${uniqueNurseries.length} nurseries in this area`;
        
    } catch (error) {
        console.error('Error searching nurseries in area:', error);
    }
}

// Explore different areas of the Bay Area
function exploreBayArea() {
    const bayAreaLocations = [
        { name: 'San Francisco', lat: 37.7749, lng: -122.4194 },
        { name: 'Oakland', lat: 37.8044, lng: -122.2711 },
        { name: 'San Jose', lat: 37.3382, lng: -121.8863 },
        { name: 'Berkeley', lat: 37.8695, lng: -122.2881 },
        { name: 'Palo Alto', lat: 37.4419, lng: -122.1430 },
        { name: 'San Mateo', lat: 37.4969, lng: -122.3331 },
        { name: 'Redwood City', lat: 37.4852, lng: -122.2364 },
        { name: 'Fremont', lat: 37.5485, lng: -121.9886 }
    ];
    
    // Create a simple selection dialog
    const locationList = bayAreaLocations.map(loc => 
        `<button class="location-option" onclick="searchNurseriesInArea(${loc.lat}, ${loc.lng})">
            <i class="fas fa-map-marker-alt"></i> ${loc.name}
        </button>`
    ).join('');
    
    const dialog = document.createElement('div');
    dialog.className = 'location-dialog';
    dialog.innerHTML = `
        <div class="dialog-content">
            <h3>Explore Bay Area Nurseries</h3>
            <p>Click on a location to find nurseries in that area:</p>
            <div class="location-options">
                ${locationList}
            </div>
            <button class="btn-secondary" onclick="this.parentElement.parentElement.remove()">Close</button>
        </div>
    `;
    
    document.body.appendChild(dialog);
}

// Global functions for HTML onclick handlers
window.usePreciseLocation = usePreciseLocation;
window.refreshNurseries = refreshNurseries;
window.switchView = switchView;
window.searchByZipCode = searchByZipCode;
window.exploreBayArea = exploreBayArea;
window.addPlantToGarden = addPlantToGarden;
window.closeModal = closeModal;
window.showProfile = showProfile;
window.exportCalendar = exportCalendar;
window.searchNurseriesForPlant = searchNurseriesForPlant; 