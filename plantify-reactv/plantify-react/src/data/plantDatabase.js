// Plant Database for Plantify React App
export const plantDatabase = {
  // Houseplants
  getAllHouseplants() {
    return [
      {
        id: 1,
        name: "Snake Plant",
        scientificName: "Sansevieria trifasciata",
        maintenance: "Low",
        light: "Low",
        water: "Low",
        space: ["No Outdoor Space", "Balcony"],
        travelFriendly: true,
        petSafe: false,
        description: "Perfect for beginners. Tolerates neglect and low light.",
        wateringSchedule: 14,
        image: "snake-plant"
      },
      {
        id: 2,
        name: "Pothos",
        scientificName: "Epipremnum aureum",
        maintenance: "Low",
        light: "Bright Indirect",
        water: "Medium",
        space: ["No Outdoor Space", "Balcony"],
        travelFriendly: true,
        petSafe: false,
        description: "Fast-growing vine with heart-shaped leaves. Great for hanging baskets.",
        wateringSchedule: 7,
        image: "pothos"
      },
      {
        id: 3,
        name: "ZZ Plant",
        scientificName: "Zamioculcas zamiifolia",
        maintenance: "Low",
        light: "Low",
        water: "Low",
        space: ["No Outdoor Space"],
        travelFriendly: true,
        petSafe: false,
        description: "Nearly indestructible plant with glossy leaves. Perfect for dark corners.",
        wateringSchedule: 21,
        image: "zz-plant"
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
        description: "Produces baby plants on long stems. Great air purifier.",
        wateringSchedule: 7,
        image: "spider-plant"
      },
      {
        id: 5,
        name: "Peace Lily",
        scientificName: "Spathiphyllum",
        maintenance: "Medium",
        light: "Bright Indirect",
        water: "High",
        space: ["No Outdoor Space"],
        travelFriendly: false,
        petSafe: false,
        description: "Beautiful white flowers and dark green leaves. Loves humidity.",
        wateringSchedule: 5,
        image: "peace-lily"
      },
      {
        id: 6,
        name: "Succulents",
        scientificName: "Various",
        maintenance: "Low",
        light: "Bright Direct",
        water: "Low",
        space: ["No Outdoor Space", "Balcony", "Yard"],
        travelFriendly: true,
        petSafe: true,
        description: "Diverse group of drought-resistant plants. Perfect for sunny spots.",
        wateringSchedule: 14,
        image: "succulents"
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
        description: "Medicinal plant with soothing gel. Loves bright light.",
        wateringSchedule: 14,
        image: "aloe-vera"
      },
      {
        id: 8,
        name: "Chinese Evergreen",
        scientificName: "Aglaonema",
        maintenance: "Low",
        light: "Low",
        water: "Medium",
        space: ["No Outdoor Space"],
        travelFriendly: false,
        petSafe: false,
        description: "Colorful leaves and easy care. Perfect for low light.",
        wateringSchedule: 7,
        image: "chinese-evergreen"
      }
    ];
  },

  // Bay Area Native Plants
  getAllNativePlants() {
    return [
      {
        id: 101,
        name: "California Poppy",
        scientificName: "Eschscholzia californica",
        maintenance: "Low",
        light: "Bright Direct",
        water: "Low",
        space: ["Balcony", "Yard"],
        travelFriendly: false,
        petSafe: true,
        description: "California's state flower. Bright orange blooms in spring.",
        wateringSchedule: 7,
        image: "california-poppy",
        nativeTo: ["San Francisco", "Oakland", "Berkeley", "San Jose", "Palo Alto"]
      },
      {
        id: 102,
        name: "Douglas Iris",
        scientificName: "Iris douglasiana",
        maintenance: "Medium",
        light: "Bright Indirect",
        water: "Medium",
        space: ["Yard"],
        travelFriendly: false,
        petSafe: true,
        description: "Native iris with purple flowers. Attracts pollinators.",
        wateringSchedule: 7,
        image: "douglas-iris",
        nativeTo: ["San Francisco", "Oakland", "Berkeley", "San Jose", "Palo Alto"]
      },
      {
        id: 103,
        name: "Coyote Mint",
        scientificName: "Monardella villosa",
        maintenance: "Low",
        light: "Bright Direct",
        water: "Low",
        space: ["Yard"],
        travelFriendly: false,
        petSafe: true,
        description: "Fragrant native mint. Great for attracting butterflies.",
        wateringSchedule: 10,
        image: "coyote-mint",
        nativeTo: ["San Francisco", "Oakland", "Berkeley", "San Jose", "Palo Alto"]
      },
      {
        id: 104,
        name: "Yarrow",
        scientificName: "Achillea millefolium",
        maintenance: "Low",
        light: "Bright Direct",
        water: "Low",
        space: ["Yard"],
        travelFriendly: false,
        petSafe: true,
        description: "Drought-tolerant with white or yellow flowers.",
        wateringSchedule: 14,
        image: "yarrow",
        nativeTo: ["San Francisco", "Oakland", "Berkeley", "San Jose", "Palo Alto"]
      },
      {
        id: 105,
        name: "California Sagebrush",
        scientificName: "Artemisia californica",
        maintenance: "Low",
        light: "Bright Direct",
        water: "Low",
        space: ["Yard"],
        travelFriendly: false,
        petSafe: true,
        description: "Aromatic native shrub. Perfect for dry gardens.",
        wateringSchedule: 21,
        image: "california-sagebrush",
        nativeTo: ["San Francisco", "Oakland", "Berkeley", "San Jose", "Palo Alto"]
      },
      {
        id: 106,
        name: "Coast Live Oak",
        scientificName: "Quercus agrifolia",
        maintenance: "Low",
        light: "Bright Direct",
        water: "Low",
        space: ["Yard"],
        travelFriendly: false,
        petSafe: true,
        description: "Majestic native oak tree. Provides shade and habitat.",
        wateringSchedule: 30,
        image: "coast-live-oak",
        nativeTo: ["San Francisco", "Oakland", "Berkeley", "San Jose", "Palo Alto"]
      },
      {
        id: 107,
        name: "California Buckwheat",
        scientificName: "Eriogonum fasciculatum",
        maintenance: "Low",
        light: "Bright Direct",
        water: "Low",
        space: ["Yard"],
        travelFriendly: false,
        petSafe: true,
        description: "Drought-tolerant with white to pink flowers.",
        wateringSchedule: 21,
        image: "california-buckwheat",
        nativeTo: ["San Francisco", "Oakland", "Berkeley", "San Jose", "Palo Alto"]
      },
      {
        id: 108,
        name: "Ceanothus",
        scientificName: "Ceanothus spp.",
        maintenance: "Low",
        light: "Bright Direct",
        water: "Low",
        space: ["Yard"],
        travelFriendly: false,
        petSafe: true,
        description: "California lilac with blue flowers. Attracts bees.",
        wateringSchedule: 14,
        image: "ceanothus",
        nativeTo: ["San Francisco", "Oakland", "Berkeley", "San Jose", "Palo Alto"]
      },
      {
        id: 109,
        name: "Manzanita",
        scientificName: "Arctostaphylos manzanita",
        maintenance: "Low",
        light: "Bright Direct",
        water: "Low",
        space: ["Yard"],
        travelFriendly: false,
        petSafe: true,
        description: "Native shrub with red bark and white flowers.",
        wateringSchedule: 21,
        image: "manzanita",
        nativeTo: ["San Francisco", "Oakland", "Berkeley", "San Jose", "Palo Alto"]
      },
      {
        id: 110,
        name: "California Fuchsia",
        scientificName: "Epilobium canum",
        maintenance: "Low",
        light: "Bright Direct",
        water: "Low",
        space: ["Yard"],
        travelFriendly: false,
        petSafe: true,
        description: "Hummingbird favorite with red tubular flowers.",
        wateringSchedule: 10,
        image: "california-fuchsia",
        nativeTo: ["San Francisco", "Oakland", "Berkeley", "San Jose", "Palo Alto"]
      },
      {
        id: 111,
        name: "Lupine",
        scientificName: "Lupinus albifrons",
        maintenance: "Low",
        light: "Bright Direct",
        water: "Low",
        space: ["Yard"],
        travelFriendly: false,
        petSafe: true,
        description: "Native lupine with purple flower spikes.",
        wateringSchedule: 14,
        image: "lupine",
        nativeTo: ["San Francisco", "Oakland", "Berkeley", "San Jose", "Palo Alto"]
      },
      {
        id: 112,
        name: "California Wild Rose",
        scientificName: "Rosa californica",
        maintenance: "Medium",
        light: "Bright Direct",
        water: "Medium",
        space: ["Yard"],
        travelFriendly: false,
        petSafe: true,
        description: "Native rose with pink flowers and red hips.",
        wateringSchedule: 7,
        image: "california-wild-rose",
        nativeTo: ["San Francisco", "Oakland", "Berkeley", "San Jose", "Palo Alto"]
      },
      {
        id: 113,
        name: "Toyon",
        scientificName: "Heteromeles arbutifolia",
        maintenance: "Low",
        light: "Bright Direct",
        water: "Low",
        space: ["Yard"],
        travelFriendly: false,
        petSafe: true,
        description: "California holly with red berries in winter.",
        wateringSchedule: 21,
        image: "toyon",
        nativeTo: ["San Francisco", "Oakland", "Berkeley", "San Jose", "Palo Alto"]
      },
      {
        id: 114,
        name: "California Goldenrod",
        scientificName: "Solidago californica",
        maintenance: "Low",
        light: "Bright Direct",
        water: "Low",
        space: ["Yard"],
        travelFriendly: false,
        petSafe: true,
        description: "Late summer bloomer with yellow flowers.",
        wateringSchedule: 14,
        image: "california-goldenrod",
        nativeTo: ["San Francisco", "Oakland", "Berkeley", "San Jose", "Palo Alto"]
      },
      {
        id: 115,
        name: "California Aster",
        scientificName: "Symphyotrichum chilense",
        maintenance: "Low",
        light: "Bright Direct",
        water: "Low",
        space: ["Yard"],
        travelFriendly: false,
        petSafe: true,
        description: "Fall-blooming aster with purple flowers.",
        wateringSchedule: 14,
        image: "california-aster",
        nativeTo: ["San Francisco", "Oakland", "Berkeley", "San Jose", "Palo Alto"]
      }
    ];
  },

  // Get all plants
  getAllPlants() {
    return [...this.getAllHouseplants(), ...this.getAllNativePlants()];
  },

  // Get plant by ID
  getPlantById(id) {
    const allPlants = this.getAllPlants();
    return allPlants.find(plant => plant.id === id);
  },

  // Search plants
  searchPlants(query) {
    const allPlants = this.getAllPlants();
    const searchTerm = query.toLowerCase();
    
    return allPlants.filter(plant => 
      plant.name.toLowerCase().includes(searchTerm) ||
      plant.scientificName.toLowerCase().includes(searchTerm) ||
      plant.description.toLowerCase().includes(searchTerm)
    );
  }
}; 