import { createContext, useContext, useState, useEffect } from 'react';
import { plantDatabase } from '../data/plantDatabase';

const PlantContext = createContext();

export const usePlants = () => {
  const context = useContext(PlantContext);
  if (!context) {
    throw new Error('usePlants must be used within a PlantProvider');
  }
  return context;
};

export const PlantProvider = ({ children }) => {
  const [userGarden, setUserGarden] = useState([]);
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user garden from localStorage
    const savedGarden = localStorage.getItem('userGarden');
    if (savedGarden) {
      setUserGarden(JSON.parse(savedGarden));
    }

    // Load all plants
    const allPlants = [
      ...plantDatabase.getAllHouseplants(),
      ...plantDatabase.getAllNativePlants()
    ];
    setPlants(allPlants);
    setLoading(false);
  }, []);

  // Save garden to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('userGarden', JSON.stringify(userGarden));
  }, [userGarden]);

  const addToGarden = (plantId) => {
    const plant = plants.find(p => p.id === plantId);
    if (plant && !userGarden.find(p => p.id === plantId)) {
      const gardenPlant = {
        ...plant,
        addedDate: new Date().toISOString(),
        lastWatered: new Date().toISOString(),
        location: 'Home'
      };
      setUserGarden(prev => [...prev, gardenPlant]);
    }
  };

  const removeFromGarden = (plantId) => {
    setUserGarden(prev => prev.filter(p => p.id !== plantId));
  };

  const waterPlant = (plantId) => {
    setUserGarden(prev => 
      prev.map(plant => 
        plant.id === plantId 
          ? { ...plant, lastWatered: new Date().toISOString() }
          : plant
      )
    );
  };

  const updatePlant = (plantId, updates) => {
    setUserGarden(prev => 
      prev.map(plant => 
        plant.id === plantId 
          ? { ...plant, ...updates }
          : plant
      )
    );
  };

  const getPlantById = (plantId) => {
    return plants.find(p => p.id === plantId);
  };

  const getRecommendedPlants = (userProfile, limit = 10) => {
    if (!userProfile) return plants.slice(0, limit);

    // Simple recommendation logic (can be enhanced)
    return plants
      .filter(plant => {
        // Filter based on user preferences
        if (userProfile.petSafe && !plant.petSafe) return false;
        if (userProfile.movingSoon && !plant.travelFriendly) return false;
        if (userProfile.space === 'No Outdoor Space' && !plant.space.includes('No Outdoor Space')) return false;
        return true;
      })
      .slice(0, limit);
  };

  const value = {
    plants,
    userGarden,
    loading,
    addToGarden,
    removeFromGarden,
    waterPlant,
    updatePlant,
    getPlantById,
    getRecommendedPlants
  };

  return (
    <PlantContext.Provider value={value}>
      {children}
    </PlantContext.Provider>
  );
}; 