// Plantify Database - Comprehensive plant and nursery data
class PlantifyDatabase {
    constructor() {
        this.plants = this.initializePlants();
        this.nurseries = this.initializeNurseries();
        this.nativePlants = this.initializeNativePlants();
    }

    initializePlants() {
        return [
            {
                id: 1,
                name: "Snake Plant",
                scientificName: "Sansevieria trifasciata",
                maintenance: "Low",
                light: "Low to Bright Indirect",
                water: "Low",
                space: ["No Outdoor Space", "Balcony"],
                travelFriendly: true,
                petSafe: false,
                description: "Perfect for beginners and low-light spaces. Tolerates neglect well.",
                wateringSchedule: 14, // days
                image: "snake-plant.jpg"
            },
            {
                id: 2,
                name: "Pothos",
                scientificName: "Epipremnum aureum",
                maintenance: "Low",
                light: "Low to Bright Indirect",
                water: "Low",
                space: ["No Outdoor Space", "Balcony"],
                travelFriendly: true,
                petSafe: false,
                description: "Trailing vine that's easy to care for and great for hanging baskets.",
                wateringSchedule: 7,
                image: "pothos.jpg"
            },
            {
                id: 3,
                name: "ZZ Plant",
                scientificName: "Zamioculcas zamiifolia",
                maintenance: "Low",
                light: "Low to Bright Indirect",
                water: "Low",
                space: ["No Outdoor Space", "Balcony"],
                travelFriendly: true,
                petSafe: false,
                description: "Nearly indestructible plant that thrives on neglect.",
                wateringSchedule: 21,
                image: "zz-plant.jpg"
            },
            {
                id: 4,
                name: "Spider Plant",
                scientificName: "Chlorophytum comosum",
                maintenance: "Low",
                light: "Bright Indirect",
                water: "Medium",
                space: ["No Outdoor Space", "Balcony"],
                travelFriendly: true,
                petSafe: true,
                description: "Produces baby plants and is safe for pets.",
                wateringSchedule: 7,
                image: "spider-plant.jpg"
            },
            {
                id: 5,
                name: "Peace Lily",
                scientificName: "Spathiphyllum",
                maintenance: "Medium",
                light: "Low to Bright Indirect",
                water: "High",
                space: ["No Outdoor Space", "Balcony"],
                travelFriendly: false,
                petSafe: false,
                description: "Beautiful flowering plant that indicates when it needs water.",
                wateringSchedule: 5,
                image: "peace-lily.jpg"
            },
            {
                id: 6,
                name: "Succulent Collection",
                scientificName: "Various",
                maintenance: "Low",
                light: "Bright Direct",
                water: "Low",
                space: ["No Outdoor Space", "Balcony", "Yard"],
                travelFriendly: true,
                petSafe: true,
                description: "Drought-tolerant plants perfect for sunny windowsills.",
                wateringSchedule: 14,
                image: "succulents.jpg"
            },
            {
                id: 7,
                name: "Aloe Vera",
                scientificName: "Aloe barbadensis",
                maintenance: "Low",
                light: "Bright Direct",
                water: "Low",
                space: ["No Outdoor Space", "Balcony"],
                travelFriendly: true,
                petSafe: false,
                description: "Medicinal plant that's easy to care for and useful.",
                wateringSchedule: 14,
                image: "aloe-vera.jpg"
            },
            {
                id: 8,
                name: "Chinese Evergreen",
                scientificName: "Aglaonema",
                maintenance: "Low",
                light: "Low to Bright Indirect",
                water: "Medium",
                space: ["No Outdoor Space", "Balcony"],
                travelFriendly: true,
                petSafe: false,
                description: "Colorful foliage plant that's very forgiving.",
                wateringSchedule: 10,
                image: "chinese-evergreen.jpg"
            }
        ];
    }

    initializeNurseries() {
        return [
            {
                id: 1,
                name: "Flora Grubb Gardens",
                address: "1634 Jerrold Ave, San Francisco, CA 94124",
                zip: "94124",
                phone: "(415) 626-7256",
                website: "https://floragrubb.com",
                specialties: ["Indoor Plants", "Succulents", "Tropical Plants"],
                rating: 4.8,
                hours: "Mon-Sat 9AM-6PM, Sun 10AM-5PM"
            },
            {
                id: 2,
                name: "Sloat Garden Center",
                address: "2700 Sloat Blvd, San Francisco, CA 94116",
                zip: "94116",
                phone: "(415) 566-4415",
                website: "https://sloatgardens.com",
                specialties: ["Indoor Plants", "Outdoor Plants", "Garden Supplies"],
                rating: 4.6,
                hours: "Mon-Sat 8AM-6PM, Sun 9AM-5PM"
            },
            {
                id: 3,
                name: "Flora Grubb Gardens - Mission",
                address: "1460 16th St, San Francisco, CA 94103",
                zip: "94103",
                phone: "(415) 626-7256",
                website: "https://floragrubb.com",
                specialties: ["Indoor Plants", "Design Services", "Plant Care"],
                rating: 4.7,
                hours: "Mon-Sat 9AM-6PM, Sun 10AM-5PM"
            },
            {
                id: 4,
                name: "Berkeley Horticultural Nursery",
                address: "1310 McGee Ave, Berkeley, CA 94703",
                zip: "94703",
                phone: "(510) 526-4704",
                website: "https://berkeleyhort.com",
                specialties: ["Native Plants", "Organic Gardening", "Expert Advice"],
                rating: 4.9,
                hours: "Mon-Sat 9AM-6PM, Sun 10AM-5PM"
            },
            {
                id: 5,
                name: "East Bay Nursery",
                address: "2332 San Pablo Ave, Berkeley, CA 94702",
                zip: "94702",
                phone: "(510) 845-6490",
                website: "https://eastbaynursery.com",
                specialties: ["Indoor Plants", "Outdoor Plants", "Garden Design"],
                rating: 4.5,
                hours: "Mon-Sat 8AM-6PM, Sun 9AM-5PM"
            },
            {
                id: 6,
                name: "Annie's Annuals & Perennials",
                address: "740 Market Ave, Richmond, CA 94801",
                zip: "94801",
                phone: "(510) 215-3301",
                website: "https://anniesannuals.com",
                specialties: ["Annuals", "Perennials", "Native Plants"],
                rating: 4.8,
                hours: "Wed-Sun 10AM-5PM"
            }
        ];
    }

    initializeNativePlants() {
        return [
            {
                id: 1,
                name: "California Poppy",
                scientificName: "Eschscholzia californica",
                maintenance: "Low",
                light: "Full Sun",
                water: "Low",
                space: ["Balcony", "Yard"],
                travelFriendly: false,
                petSafe: true,
                description: "California's state flower, perfect for sunny spots.",
                wateringSchedule: 7,
                image: "california-poppy.jpg",
                nativeTo: ["San Francisco", "Oakland", "Berkeley", "San Jose"]
            },
            {
                id: 2,
                name: "Douglas Iris",
                scientificName: "Iris douglasiana",
                maintenance: "Low",
                light: "Partial Shade",
                water: "Medium",
                space: ["Balcony", "Yard"],
                travelFriendly: false,
                petSafe: true,
                description: "Beautiful native iris that attracts pollinators.",
                wateringSchedule: 7,
                image: "douglas-iris.jpg",
                nativeTo: ["San Francisco", "Oakland", "Berkeley"]
            },
            {
                id: 3,
                name: "Coyote Mint",
                scientificName: "Monardella villosa",
                maintenance: "Low",
                light: "Full Sun",
                water: "Low",
                space: ["Balcony", "Yard"],
                travelFriendly: true,
                petSafe: true,
                description: "Aromatic native mint that's drought-tolerant.",
                wateringSchedule: 10,
                image: "coyote-mint.jpg",
                nativeTo: ["San Francisco", "Oakland", "Berkeley", "San Jose"]
            },
            {
                id: 4,
                name: "Yarrow",
                scientificName: "Achillea millefolium",
                maintenance: "Low",
                light: "Full Sun",
                water: "Low",
                space: ["Balcony", "Yard"],
                travelFriendly: true,
                petSafe: true,
                description: "Hardy native plant with medicinal properties.",
                wateringSchedule: 14,
                image: "yarrow.jpg",
                nativeTo: ["San Francisco", "Oakland", "Berkeley", "San Jose"]
            },
            {
                id: 5,
                name: "California Sagebrush",
                scientificName: "Artemisia californica",
                maintenance: "Low",
                light: "Full Sun",
                water: "Low",
                space: ["Balcony", "Yard"],
                travelFriendly: true,
                petSafe: true,
                description: "Aromatic native shrub perfect for dry gardens.",
                wateringSchedule: 21,
                image: "california-sagebrush.jpg",
                nativeTo: ["San Francisco", "Oakland", "Berkeley", "San Jose"]
            }
        ];
    }

    // Filter plants based on user profile
    getRecommendedPlants(profile) {
        let filteredPlants = this.plants.filter(plant => {
            // Check if plant matches user's space requirements
            if (!plant.space.includes(profile.space)) {
                return false;
            }

            // Check maintenance level
            if (profile.level === "Novice" && plant.maintenance !== "Low") {
                return false;
            }

            // Check if user is moving soon (rental friendly)
            if (profile.movingSoon && !plant.travelFriendly) {
                return false;
            }

            return true;
        });

        // Add native plants if user is interested
        if (profile.interestedInNative) {
            const nativePlants = this.nativePlants.filter(plant => 
                plant.nativeTo.some(city => 
                    this.getCityFromZip(profile.zip) === city
                )
            );
            filteredPlants = [...filteredPlants, ...nativePlants];
        }

        return filteredPlants;
    }

    // Get nurseries near user's zip code
    getNearbyNurseries(zipCode) {
        return this.nurseries.filter(nursery => {
            const distance = this.calculateZipDistance(zipCode, nursery.zip);
            return distance <= 20; // Within 20 miles
        }).sort((a, b) => {
            const distanceA = this.calculateZipDistance(zipCode, a.zip);
            const distanceB = this.calculateZipDistance(zipCode, b.zip);
            return distanceA - distanceB;
        });
    }

    // Get native plants for specific area
    getNativePlantsForArea(zipCode) {
        const city = this.getCityFromZip(zipCode);
        return this.nativePlants.filter(plant => 
            plant.nativeTo.includes(city)
        );
    }

    // Helper method to get city from zip code
    getCityFromZip(zipCode) {
        const zipToCity = {
            "94102": "San Francisco",
            "94103": "San Francisco",
            "94104": "San Francisco",
            "94105": "San Francisco",
            "94107": "San Francisco",
            "94108": "San Francisco",
            "94109": "San Francisco",
            "94110": "San Francisco",
            "94111": "San Francisco",
            "94112": "San Francisco",
            "94114": "San Francisco",
            "94115": "San Francisco",
            "94116": "San Francisco",
            "94117": "San Francisco",
            "94118": "San Francisco",
            "94121": "San Francisco",
            "94122": "San Francisco",
            "94123": "San Francisco",
            "94124": "San Francisco",
            "94127": "San Francisco",
            "94129": "San Francisco",
            "94130": "San Francisco",
            "94131": "San Francisco",
            "94132": "San Francisco",
            "94133": "San Francisco",
            "94134": "San Francisco",
            "94601": "Oakland",
            "94602": "Oakland",
            "94603": "Oakland",
            "94604": "Oakland",
            "94605": "Oakland",
            "94606": "Oakland",
            "94607": "Oakland",
            "94608": "Oakland",
            "94609": "Oakland",
            "94610": "Oakland",
            "94611": "Oakland",
            "94612": "Oakland",
            "94613": "Oakland",
            "94614": "Oakland",
            "94615": "Oakland",
            "94617": "Oakland",
            "94618": "Oakland",
            "94619": "Oakland",
            "94621": "Oakland",
            "94701": "Berkeley",
            "94702": "Berkeley",
            "94703": "Berkeley",
            "94704": "Berkeley",
            "94705": "Berkeley",
            "94706": "Berkeley",
            "94707": "Berkeley",
            "94708": "Berkeley",
            "94709": "Berkeley",
            "94710": "Berkeley",
            "95110": "San Jose",
            "95111": "San Jose",
            "95112": "San Jose",
            "95113": "San Jose",
            "95116": "San Jose",
            "95117": "San Jose",
            "95118": "San Jose",
            "95119": "San Jose",
            "95120": "San Jose",
            "95121": "San Jose",
            "95122": "San Jose",
            "95123": "San Jose",
            "95124": "San Jose",
            "95125": "San Jose",
            "95126": "San Jose",
            "95127": "San Jose",
            "95128": "San Jose",
            "95129": "San Jose",
            "95130": "San Jose",
            "95131": "San Jose",
            "95132": "San Jose",
            "95133": "San Jose",
            "95134": "San Jose",
            "95135": "San Jose",
            "95136": "San Jose",
            "95137": "San Jose",
            "95138": "San Jose",
            "95139": "San Jose",
            "95140": "San Jose",
            "95141": "San Jose",
            "95148": "San Jose"
        };
        return zipToCity[zipCode] || "Unknown";
    }

    // Simple distance calculation between zip codes
    calculateZipDistance(zip1, zip2) {
        // This is a simplified calculation - in a real app you'd use a proper geocoding service
        const num1 = parseInt(zip1);
        const num2 = parseInt(zip2);
        return Math.abs(num1 - num2) / 100; // Rough approximation
    }

    // Get plant by ID
    getPlantById(id) {
        return this.plants.find(plant => plant.id === id) || 
               this.nativePlants.find(plant => plant.id === id);
    }

    // Search plants by name
    searchPlants(query) {
        const allPlants = [...this.plants, ...this.nativePlants];
        return allPlants.filter(plant => 
            plant.name.toLowerCase().includes(query.toLowerCase()) ||
            plant.scientificName.toLowerCase().includes(query.toLowerCase())
        );
    }
}

// Export for use in other modules
window.PlantifyDatabase = PlantifyDatabase; 