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
                light: ["Bright Indirect", "Low Light"],
                water: "Low",
                space: ["No Outdoor Space", "Balcony"],
                travelFriendly: true,
                petSafe: false,
                description: "Perfect for beginners and low-light spaces. Tolerates neglect well",
                wateringSchedule: 14, // days
                image: "snake-plant"
            },
            {
                id: 2,
                name: "Pothos",
                scientificName: "Epipremnum aureum",
                maintenance: "Low",
                light: ["Bright Indirect", "Low Light"],
                water: "Low",
                space: ["No Outdoor Space", "Balcony"],
                travelFriendly: true,
                petSafe: false,
                description: "Trailing vine that's easy to care for and great for hanging baskets",
                wateringSchedule: 7,
                image: "pothos"
            },
            {
                id: 3,
                name: "ZZ Plant",
                scientificName: "Zamioculcas zamiifolia",
                maintenance: "Low",
                light: ["Bright Indirect", "Low Light"],
                water: "Low",
                space: ["No Outdoor Space", "Balcony"],
                travelFriendly: true,
                petSafe: false,
                description: "Nearly indestructible plant that thrives on neglect",
                wateringSchedule: 21,
                image: "zz-plant"
            },
            {
                id: 4,
                name: "Spider Plant",
                scientificName: "Chlorophytum comosum",
                maintenance: "Low",
                light: ["Bright Indirect"],
                water: "Medium",
                space: ["No Outdoor Space", "Balcony"],
                travelFriendly: true,
                petSafe: true,
                description: "Produces baby plants and is safe for pets",
                wateringSchedule: 7,
                image: "spider-plant"
            },
            {
                id: 5,
                name: "Peace Lily",
                scientificName: "Spathiphyllum",
                maintenance: "Medium",
                light: ["Bright Indirect", "Low Light"],
                water: "High",
                space: ["No Outdoor Space", "Balcony"],
                travelFriendly: true,
                petSafe: false,
                description: "A plant with air-purifying qualities that produces striking white blossoms",
                wateringSchedule: 5,
                image: "peace-lily"
            },
            {
                id: 6,
                name: "Aloe Vera",
                scientificName: "Aloe barbadensis",
                maintenance: "Low",
                light: ["Bright Direct"],
                water: "Low",
                space: ["No Outdoor Space", "Balcony"],
                travelFriendly: true,
                petSafe: false,
                description: "Medicinal plant that's easy to care for",
                wateringSchedule: 14,
                image: "aloe-vera"
            },
            {
                id: 7,
                name: "Chinese Evergreen",
                scientificName: "Aglaonema",
                maintenance: "Low",
                light: ["Bright Indirect", "Low Light"],
                water: "Moderate",
                space: ["No Outdoor Space", "Balcony"],
                travelFriendly: true,
                petSafe: false,
                description: "Colorful foliage plant that's very forgiving",
                wateringSchedule: 10,
                image: "chinese-evergreen"
            },
            {
                id: 8,
                name: "Fiddle Leaf Fig",
                scientificName: "Ficus lyrata",
                maintenance: "Moderate",
                light: ["Bright Direct", "Bright Indirect"],
                water: "Moderate",
                space: ["No Outdoor Space", "Balcony", "Yard"],
                travelFriendly: true,
                petSafe: false,
                description: "This tropical plant is renowned for its large, leathery leaves that resemble the shape of a fiddle",
                wateringSchedule: 3,
                image: "fiddle-leaf-fig"
            },
            {
                id: 9,
                name: "Yerba Buena",
                scientificName: "Clinopodium douglasii",
                maintenance: "Low",
                light: ["Bright Inirect", "Low Light"],
                water: "Moderate",
                space: ["No Outdoor Space", "Balcony", "Yard"],
                travelFriendly: false,
                petSafe: true,
                description: "A creeping evergreen perennial herb with small, delicate leaves and tiny white flowers that have a pleasant fragrance",
                wateringSchedule: 7,
                image: "yerba-buena"
            },
            {
                id: 10,
                name: "Southern Maidenhair Fern",
                scientificName: "Adiantum capillus-veneris",
                maintenance: "Moderate",
                light: ["Bright Indirect", "Low Light"],
                water: "Moderate",
                space: ["No Outdoor Space", "Balcony", "Yard"],
                travelFriendly: false,
                petSafe: false,
                description: "A fern with delicate and lacy foliage, featuring dark stripes that accentuate the green leaves",
                wateringSchedule: 7,
                image: "maidenhair"
            },
            {
                id: 11,
                name: "Pancake Plant",
                scientificName: "Pilea peperomioides",
                maintenance: "Low",
                light: ["Bright Indirect"],
                water: "Low",
                space: ["No Outdoor Space", "Balcony"],
                travelFriendly: true,
                petSafe: true,
                description: "A low maintenance plant that is easy to propogate",
                wateringSchedule: 3,
                image: "pancake-plant"
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
                id: 101,
                name: "California Poppy",
                scientificName: "Eschscholzia californica",
                maintenance: "Low",
                light: ["Bright Direct"],
                water: "Low",
                space: ["Balcony", "Yard"],
                travelFriendly: false,
                petSafe: true,
                description: "California's state flower that produces bright orange blooms in spring",
                wateringSchedule: 14,
                image: "california-poppy",
                nativeTo: ["San Francisco", "Peninsula", "East Bay", "South Bay", "North Bay"]
            },
      {
        id: 102,
        name: "Douglas Iris",
        scientificName: "Iris douglasiana",
        maintenance: "Moderate",
        light: ["Bright Direct", "Bright Indirect", "Low Light"],
        water: "Moderate",
        space: ["Yard"],
        travelFriendly: true,
        petSafe: false,
        description: "A coastal iris with purple flowers that attract pollinators.",
        wateringSchedule: 7,
        image: "douglas-iris",
        nativeTo: ["San Francisco", "Peninsula", "East Bay", "South Bay", "North Bay"]
      },
      {
        id: 103,
        name: "Coyote Mint",
        scientificName: "Monardella villosa",
        maintenance: "Moderate",
        light: ["Bright Direct", "Bright Indirect"],
        water: "Low",
        space: ["Yard"],
        travelFriendly: false,
        petSafe: true,
        description: "A shrub with fragrant mint-scented foliage and delicate lavender flowers, which requires infrequent pruning. The leaves can be made into a tea that treats upset stomach and other ailments",
        wateringSchedule: 14,
        image: "coyote-mint",
        nativeTo: ["San Francisco", "Peninsula", "East Bay", "South Bay", "North Bay"]
      },
      {
        id: 104,
        name: "Yarrow",
        scientificName: "Achillea millefolium",
        maintenance: "Low",
        light: ["Bright Direct", "Bright Indirect", "Low Light"],
        water: "Low",
        space: ["Yard"],
        travelFriendly: true,
        petSafe: true,
        description: "A drought-tolerant plant with white or yellow flowers that's attractive to pollinators",
        wateringSchedule: 7,
        image: "yarrow",
        nativeTo: ["San Francisco", "Peninsula", "East Bay", "South Bay", "North Bay"]
      },
      {
        id: 105,
        name: "California Sagebrush",
        scientificName: "Artemisia californica",
        maintenance: "Low",
        light: ["Bright Direct"],
        water: "Low",
        space: ["Yard"],
        travelFriendly: false,
        petSafe: true,
        description: "An aromatic shrub that's a favorite of birds and insects and is able to tolerate harsh conditions",
        wateringSchedule: 30,
        image: "sagebrush",
        nativeTo: ["San Francisco", "Peninsula", "East Bay", "South Bay", "North Bay"]
      },
      {
        id: 106,
        name: "Sticky Monkey Flower",
        scientificName: "Diplacus aurantiacus",
        maintenance: "Low",
        light: ["Bright Direct", "Bright Indirect"],
        water: "Low",
        space: ["Yard"],
        travelFriendly: true,
        petSafe: true,
        description: "A shrub with orange and yellow flowers that are said to resemble a monkey's face, and leaves that produce a protective sticky resin",
        wateringSchedule: 14,
        image: "monkey-flower",
        nativeTo: ["San Francisco", "Peninsula", "East Bay", "South Bay", "North Bay"]
      },
      {
        id: 107,
        name: "California Buckwheat",
        scientificName: "Eriogonum fasciculatum",
        maintenance: "Low",
        light: ["Bright Direct"],
        water: "Low",
        space: ["Yard"],
        travelFriendly: false,
        petSafe: true,
        description: "A drought-tolerant shrub with leathery, woolly leaves and clusters of pink to cream-colored flowers",
        wateringSchedule: 30,
        image: "buckwheat",
        nativeTo: ["San Francisco", "Peninsula", "East Bay", "North Bay"]
      },
      {
        id: 108,
        name: "Bird's-eye gilia",
        scientificName: "Gilia tricolor",
        maintenance: "Moderate",
        light: ["Bright Direct"],
        water: "Low",
        space: ["Yard", "Baclony"],
        travelFriendly: false,
        petSafe: true,
        description: "Produces hundreds of white flowers with blue or lavender edges in spring",
        wateringSchedule: 7,
        image: "gilia",
        nativeTo: ["East Bay", "South Bay"]
      },
      {
        id: 109,
        name: "Mulefat",
        scientificName: "Baccharis salicifolia",
        maintenance: "Low",
        light: ["Bright Direct"],
        water: "Moderate",
        space: ["Yard"],
        travelFriendly: false,
        petSafe: false,
        description: "A tall, flowering shrub known for its sticky foliage and abundant fuzzy flowers. Its noted for attracting wildlife and helping with erosion control",
        wateringSchedule: 7,
        image: "mulefat",
        nativeTo: ["San Francisco", "East Bay", "South Bay", "North Bay"]
      },
      {
        id: 110,
        name: "California Fuchsia",
        scientificName: "Epilobium canum",
        maintenance: "Low",
        light: ["Bright Direct", "Bright Indirect"],
        water: "Low",
        space: ["Yard"],
        travelFriendly: true,
        petSafe: true,
        description: "Hummingbird favorite with red tubular flowers that flower in the height of summer",
        wateringSchedule: 21,
        image: "california-fuchsia",
        nativeTo: ["San Francisco", "Peninsula", "East Bay", "South Bay", "North Bay"]
      },
      {
        id: 111,
        name: "Silver Lupine",
        scientificName: "Lupinus albifrons",
        maintenance: "Low",
        light: ["Bright Direct"],
        water: "Low",
        space: ["Yard"],
        travelFriendly: false,
        petSafe: true,
        description: "Native lupine with purple flower spikes that does well in dry, well-drained soil",
        wateringSchedule: 14,
        image: "lupine",
        nativeTo: ["San Francisco", "Peninsula", "East Bay", "South Bay", "North Bay"]
      },
      {
        id: 112,
        name: "California Rose",
        scientificName: "Rosa californica",
        maintenance: "Medium",
        light: ["Bright Direct", "Bright Indirect", "Low Light"],
        water: "Low",
        space: ["Yard", "Balcony"],
        travelFriendly: false,
        petSafe: true,
        description: "Native rose with with pink flowers that blooms throughout spring and summer, and is a favorite of pollinators",
        wateringSchedule: 7,
        image: "california-rose",
        nativeTo: ["San Francisco", "Peninsula", "East Bay", "South Bay", "North Bay"]
      },
      {
        id: 113,
        name: "Toyon",
        scientificName: "Heteromeles arbutifolia",
        maintenance: "Low",
        light: ["Bright Direct", "Bright Indirect"],
        water: "Low",
        space: ["Yard"],
        travelFriendly: false,
        petSafe: false,
        description: "Evergreen shrub that with fragrant white flowers that develops vibrant clusters of scarlet berries in the winter",
        wateringSchedule: 14,
        image: "toyon",
        nativeTo: ["San Francisco", "Peninsula", "East Bay", "South Bay", "North Bay"]
      },
      {
        id: 114,
        name: "California Goldenrod",
        scientificName: "Solidago californica",
        maintenance: "Low",
        light: ["Bright Direct", "Bright Indirect"],
        water: "Low",
        space: ["Yard"],
        travelFriendly: true,
        petSafe: true,
        description: "Late summer bloomer with yellow flowers that attract birds and insect pollinators",
        wateringSchedule: 14,
        image: "california-goldenrod",
        nativeTo: ["San Francisco", "Peninsula", "East Bay", "North Bay"]
      },
      {
        id: 115,
        name: "California Aster",
        scientificName: "Symphyotrichum chilense",
        maintenance: "Low",
        light: ["Bright Direct", "Bright Indirect"],
        water: "Low",
        space: ["Yard"],
        travelFriendly: true,
        petSafe: true,
        description: "Purple flowering plant that blooms from summer to fall and attracts butterflies and moths",
        wateringSchedule: 14,
        image: "california-aster",
        nativeTo: ["San Francisco", "Peninsula", "East Bay", "South Bay", "North Bay"]
      },
      {
        id: 116,
        name: "California Mugwort",
        scientificName: "Artemisia douglasiana",
        maintenance: "Low",
        light: ["Bright Direct"],
        water: "Low",
        space: ["Yard"],
        travelFriendly: true,
        petSafe: false,
        description: "A fast growing shrub with aromatic foliage. It's good for erosion control, and easy to take cuttings from and propogate.",
        wateringSchedule: 14,
        image: "california-mugwort",
        nativeTo: ["San Francisco", "Peninsula", "East Bay", "South Bay", "North Bay"]
      },
      {
        id: 117,
        name: "Western Bracken Fern",
        scientificName: "Pteridium aquilinum",
        maintenance: "Moderate",
        light: ["Bright Direct", "Bright Indirect"],
        water: "Moderate",
        space: ["Yard", "Balcony"],
        travelFriendly: false,
        petSafe: false,
        description: "A widespread fern species that prefers milder, wetter climates",
        wateringSchedule: 7,
        image: "bracken-fern",
        nativeTo: ["San Francisco", "Peninsula", "East Bay", "South Bay", "North Bay"]
      },
      {
        id: 118,
        name: "Coast Silktassel",
        scientificName: "Garrya elliptica",
        maintenance: "Moderate",
        light: ["Bright Direct", "Bright Indirect"],
        water: "Low",
        space: ["Yard"],
        travelFriendly: true,
        petSafe: true,
        description: "An evergreen shrub that blossoms in winter with cascading flower clusters",
        wateringSchedule: 7,
        image: "silktassel",
        nativeTo: ["San Francisco", "Peninsula", "East Bay", "South Bay", "North Bay"]
      }, 
      {
        id: 119,
        name: "Thimbleberry",
        scientificName: "Rubus parviflorus",
        maintenance: "Low",
        light: ["Bright Indirect"],
        water: "Moderate",
        space: ["Yard"],
        travelFriendly: true,
        petSafe: true,
        description: "A relative of raspberries and blackberries, this shrub spreads through rhizomes and creates a dense stand once established. Produces large white flowers, and a small, red edible fruit",
        wateringSchedule: 30,
        image: "thimbleberry",
        nativeTo: ["San Francisco", "Peninsula", "East Bay", "South Bay", "North Bay"]
      }, 
      {
        id: 120,
        name: "Bee Plant",
        scientificName: "Scrophularia californica",
        maintenance: "Low",
        light: ["Bright Indirect"],
        water: "Low",
        space: ["Yard", "Balcony"],
        travelFriendly: false,
        petSafe: true,
        description: "A plant that produces small, red flowers that are very attractive to bees",
        wateringSchedule: 14,
        image: "bee-plant",
        nativeTo: ["San Francisco", "Peninsula", "East Bay", "South Bay", "North Bay"]
      },
      {
        id: 121,
        name: "Common Snowberry",
        scientificName: "Symphoricarpos albus",
        maintenance: "Low",
        light: ["Bright Indirect", "Low Light"],
        water: "Low",
        space: ["Yard"],
        travelFriendly: false,
        petSafe: false,
        description: "A deciduous shrub with bell-shaped pink flowers in the spring, and white berries in fall and winter",
        wateringSchedule: 7,
        image: "snowberry",
        nativeTo: ["San Francisco", "Peninsula", "East Bay", "South Bay", "North Bay"]
      },
      {
        id: 122,
        name: "Flowering Currant",
        scientificName: "Ribes sanguineum",
        maintenance: "Low",
        light: ["Bright Direct", "Bright Indirect"],
        water: "Low",
        space: ["Yard"],
        travelFriendly: false,
        petSafe: true,
        description: "A deciduous shrub that produces pink to red flowers",
        wateringSchedule: 7,
        image: "flowering-currant",
        nativeTo: ["San Francisco", "Peninsula", "East Bay", "South Bay", "North Bay"]
      },
      {
        id: 123,
        name: "Wild strawberry",
        scientificName: "Fragaria vesca",
        maintenance: "Low",
        light: ["Bright Direct", "Bright Indirect", "Low Light"],
        water: "Moderate",
        space: ["Yard", "Balcony"],
        travelFriendly: true,
        petSafe: true,
        description: "A wild strawberry plant that spreads by rhizomes (underground) and stolons (above-ground runners)",
        wateringSchedule: 7,
        image: "strawberry",
        nativeTo: ["San Francisco", "Peninsula", "East Bay", "North Bay"]
      },
      {
        id: 124,
        name: "Dog Violet",
        scientificName: "Viola adunca",
        maintenance: "Moderate",
        light: ["Bright Direct", "Bright Indirect"],
        water: "Moderate",
        space: ["Yard", "Balcony"],
        travelFriendly: true,
        petSafe: true,
        description: "A fragrant, compact plant that produces purple blooms and functions well as groundcover",
        wateringSchedule: 7,
        image: "dog-violet",
        nativeTo: ["San Francisco", "Peninsula", "East Bay", "North Bay"]
      },
      {
        id: 125,
        name: "California blackberry",
        scientificName: "Rubus ursinus",
        maintenance: "Easy",
        light: ["Bright Direct", "Bright Indirect", "Low Light"],
        water: "Moderate",
        space: ["Yard"],
        travelFriendly: true,
        petSafe: true,
        description: "A blackberry plant that produces berries that are a favorite of humans and animals alike",
        wateringSchedule: 14,
        image: "blackberry",
        nativeTo: ["San Francisco", "Peninsula", "East Bay", "South Bay", "North Bay"]
      },
      {
        id: 126,
        name: "Redwood sorrel",
        scientificName: "Oxalis oregana",
        maintenance: "Easy",
        light: ["Bright Indirect"],
        water: "High",
        space: ["Yard", "Balcony"],
        travelFriendly: false,
        petSafe: true,
        description: "A short, flowering, herbaceous perennial plant with three leaflets",
        wateringSchedule: 30,
        image: "sorrel",
        nativeTo: ["San Francisco", "Peninsula", "East Bay", "North Bay"]
      }
        ];
    }

    getAllNativePlants() {
        return this.nativePlants;
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
