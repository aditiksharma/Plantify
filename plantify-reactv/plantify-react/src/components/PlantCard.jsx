import { useState } from 'react';
import { Plus, Info, Star, Heart, Suitcase, Leaf } from 'lucide-react';
import { usePlants } from '../context/PlantContext';
import { useUser } from '../context/UserContext';

const PlantCard = ({ plant, showRecommendation = false }) => {
  const { addToGarden } = usePlants();
  const { userProfile } = useUser();
  const [imageError, setImageError] = useState(false);

  const getPlantImage = (plantName) => {
    const normalizedName = plantName.toLowerCase().replace(/\s+/g, '-');
    return `https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop&crop=center`;
  };

  const calculateRecommendationScore = (plant) => {
    if (!userProfile) return 0;

    let score = 0;

    // Space compatibility
    if (userProfile.space === 'No Outdoor Space' && plant.space.includes('No Outdoor Space')) {
      score += 30;
    } else if (userProfile.space === 'Balcony' && plant.space.includes('Balcony')) {
      score += 30;
    } else if (userProfile.space === 'Yard') {
      score += 30;
    }

    // Pet safety
    if (userProfile.petSafe && plant.petSafe) {
      score += 20;
    } else if (!userProfile.petSafe) {
      score += 20;
    }

    // Moving plans
    if (userProfile.movingSoon && plant.travelFriendly) {
      score += 20;
    } else if (!userProfile.movingSoon) {
      score += 20;
    }

    // Experience level
    if (userProfile.level === 'Novice' && plant.maintenance === 'Low') {
      score += 15;
    } else if (userProfile.level === 'Intermediate' && plant.maintenance === 'Medium') {
      score += 15;
    } else if (userProfile.level === 'Advanced') {
      score += 15;
    }

    return Math.min(score, 100);
  };

  const getRecommendationLevel = (score) => {
    if (score >= 90) return 'Perfect Match';
    if (score >= 80) return 'Excellent Choice';
    if (score >= 70) return 'Great Option';
    if (score >= 60) return 'Good Match';
    return 'Not Recommended';
  };

  const getRecommendationColor = (score) => {
    if (score >= 90) return 'perfect';
    if (score >= 80) return 'excellent';
    if (score >= 70) return 'great';
    if (score >= 60) return 'good';
    return 'not-recommended';
  };

  const recommendationScore = calculateRecommendationScore(plant);
  const recommendationLevel = getRecommendationLevel(recommendationScore);
  const recommendationColor = getRecommendationColor(recommendationScore);

  return (
    <div className="plant-card">
      <div className="plant-image">
        <img 
          src={getPlantImage(plant.name)} 
          alt={plant.name}
          onError={() => setImageError(true)}
          className={imageError ? 'image-error' : ''}
        />
        
        <div className="plant-badges">
          {plant.petSafe && <Heart className="badge-icon pet-safe" title="Pet Safe" />}
          {plant.travelFriendly && <Suitcase className="badge-icon travel-friendly" title="Travel Friendly" />}
          {plant.nativeTo && <Leaf className="badge-icon native" title="Native Plant" />}
        </div>

        {showRecommendation && recommendationScore >= 70 && (
          <div className={`recommendation-badge ${recommendationColor}`}>
            <Star size={14} />
            <span>{recommendationLevel}</span>
          </div>
        )}
      </div>

      <div className="plant-info">
        <h3>{plant.name}</h3>
        <p className="scientific-name">{plant.scientificName}</p>
        <p className="description">{plant.description}</p>
        
        <div className="plant-details">
          <span className="detail">
            <span className="detail-icon">💧</span>
            {plant.water}
          </span>
          <span className="detail">
            <span className="detail-icon">☀️</span>
            {plant.light}
          </span>
          <span className="detail">
            <span className="detail-icon">🔧</span>
            {plant.maintenance}
          </span>
        </div>

        <div className="plant-actions">
          <button className="btn-secondary" onClick={() => {/* TODO: Show details */}}>
            <Info size={16} />
            <span>Details</span>
          </button>
          <button className="btn-primary" onClick={() => addToGarden(plant.id)}>
            <Plus size={16} />
            <span>Add to Garden</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlantCard; 