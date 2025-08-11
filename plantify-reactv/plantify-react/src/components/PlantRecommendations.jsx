import { useState } from 'react';
import { Star, Leaf, Home, Sun, Clock, Heart, MapPin, Sparkles, Plus, Info } from 'lucide-react';
import { plantDatabase } from '../data/plantDatabase';

const PlantRecommendations = ({ userProfile }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('score');

  if (!userProfile) {
    return (
      <div className="recommendations-empty">
        <div className="empty-state">
          <Leaf size={48} className="empty-icon" />
          <h3>Complete Your Profile First</h3>
          <p>Fill out your plant profile to get personalized recommendations!</p>
        </div>
      </div>
    );
  }

  const allRecommendations = plantDatabase.getRecommendations(userProfile);
  const categorizedRecommendations = plantDatabase.getRecommendationsByCategory(userProfile);

  const getFilteredRecommendations = () => {
    switch (activeFilter) {
      case 'perfect':
        return categorizedRecommendations.perfect;
      case 'great':
        return categorizedRecommendations.great;
      case 'good':
        return categorizedRecommendations.good;
      case 'houseplants':
        return categorizedRecommendations.houseplants;
      case 'native':
        return categorizedRecommendations.nativePlants;
      default:
        return allRecommendations;
    }
  };

  const getSortedRecommendations = (recommendations) => {
    return [...recommendations].sort((a, b) => {
      switch (sortBy) {
        case 'score':
          return b.score - a.score;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'maintenance':
          const maintenanceOrder = { 'Low': 1, 'Medium': 2, 'High': 3 };
          return maintenanceOrder[a.maintenance] - maintenanceOrder[b.maintenance];
        case 'watering':
          return a.wateringSchedule - b.wateringSchedule;
        default:
          return b.score - a.score;
      }
    });
  };

  const recommendations = getSortedRecommendations(getFilteredRecommendations());

  const getMatchColor = (score) => {
    if (score >= 80) return '#10b981'; // Green
    if (score >= 60) return '#f59e0b'; // Amber
    return '#ef4444'; // Red
  };

  const getMatchLabel = (score) => {
    if (score >= 80) return 'Perfect Match';
    if (score >= 60) return 'Great Match';
    if (score >= 40) return 'Good Match';
    return 'Fair Match';
  };

  const getPlantImage = (plantName) => {
    const normalizedName = plantName.toLowerCase().replace(/\s+/g, '-');
    return `https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop&crop=center`;
  };

  return (
    <div className="plant-recommendations">
      <div className="recommendations-header">
        <div className="recommendations-title">
          <Sparkles size={24} className="sparkle-icon" />
          <h2>Your Personalized Plant Recommendations</h2>
        </div>
        <p className="recommendations-subtitle">
          Based on your preferences for {userProfile.space.toLowerCase()}, {userProfile.light.toLowerCase()} light, 
          and {userProfile.level.toLowerCase()} experience level
        </p>
      </div>

      <div className="recommendations-summary">
        <div className="summary-card">
          <Star size={20} />
          <div>
            <h4>Perfect Matches</h4>
            <span>{categorizedRecommendations.perfect.length} plants</span>
          </div>
        </div>
        <div className="summary-card">
          <Leaf size={20} />
          <div>
            <h4>Great Matches</h4>
            <span>{categorizedRecommendations.great.length} plants</span>
          </div>
        </div>
        <div className="summary-card">
          <Home size={20} />
          <div>
            <h4>Houseplants</h4>
            <span>{categorizedRecommendations.houseplants.length} plants</span>
          </div>
        </div>
        <div className="summary-card">
          <MapPin size={20} />
          <div>
            <h4>Native Plants</h4>
            <span>{categorizedRecommendations.nativePlants.length} plants</span>
          </div>
        </div>
      </div>

      <div className="recommendations-controls">
        <div className="filter-buttons">
          <button
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All ({allRecommendations.length})
          </button>
          <button
            className={`filter-btn ${activeFilter === 'perfect' ? 'active' : ''}`}
            onClick={() => setActiveFilter('perfect')}
          >
            <Star size={16} />
            Perfect ({categorizedRecommendations.perfect.length})
          </button>
          <button
            className={`filter-btn ${activeFilter === 'great' ? 'active' : ''}`}
            onClick={() => setActiveFilter('great')}
          >
            <Leaf size={16} />
            Great ({categorizedRecommendations.great.length})
          </button>
          <button
            className={`filter-btn ${activeFilter === 'houseplants' ? 'active' : ''}`}
            onClick={() => setActiveFilter('houseplants')}
          >
            <Home size={16} />
            Houseplants ({categorizedRecommendations.houseplants.length})
          </button>
          <button
            className={`filter-btn ${activeFilter === 'native' ? 'active' : ''}`}
            onClick={() => setActiveFilter('native')}
          >
            <MapPin size={16} />
            Native ({categorizedRecommendations.nativePlants.length})
          </button>
        </div>

        <div className="sort-controls">
          <label htmlFor="sort-select">Sort by:</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="score">Best Match</option>
            <option value="name">Name</option>
            <option value="maintenance">Maintenance Level</option>
            <option value="watering">Watering Frequency</option>
          </select>
        </div>
      </div>

      {recommendations.length === 0 ? (
        <div className="no-recommendations">
          <Leaf size={48} className="empty-icon" />
          <h3>No plants match your current filters</h3>
          <p>Try adjusting your filters or complete your profile with different preferences.</p>
        </div>
      ) : (
        <div className="recommendations-grid">
          {recommendations.map((plant) => (
            <div key={plant.id} className="recommendation-card">
              <div className="match-badge" style={{ backgroundColor: getMatchColor(plant.score) }}>
                <span className="match-percentage">{plant.matchPercentage}%</span>
                <span className="match-label">{getMatchLabel(plant.score)}</span>
              </div>
              
              <div className="plant-card">
                <div className="plant-image">
                  <img 
                    src={getPlantImage(plant.name)} 
                    alt={plant.name}
                  />
                  
                  <div className="plant-badges">
                    {plant.petSafe && <Heart className="badge-icon pet-safe" title="Pet Safe" />}
                    {plant.travelFriendly && <Leaf className="badge-icon travel-friendly" title="Travel Friendly" />}
                    {plant.nativeTo && <MapPin className="badge-icon native" title="Native Plant" />}
                  </div>
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
                    <button className="btn-secondary">
                      <Info size={16} />
                      <span>Details</span>
                    </button>
                    <button className="btn-primary">
                      <Plus size={16} />
                      <span>Add to Garden</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="match-reasons">
                <h4>Why this plant matches you:</h4>
                <ul>
                  {plant.reasons.slice(0, 3).map((reason, index) => (
                    <li key={index} className="reason-item">
                      <span className="reason-bullet">•</span>
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="plant-details">
                <div className="detail-item">
                  <Sun size={16} />
                  <span>{plant.light}</span>
                </div>
                <div className="detail-item">
                  <Clock size={16} />
                  <span>Water every {plant.wateringSchedule} days</span>
                </div>
                <div className="detail-item">
                  <Leaf size={16} />
                  <span>{plant.maintenance} maintenance</span>
                </div>
                {plant.petSafe && (
                  <div className="detail-item">
                    <Heart size={16} />
                    <span>Pet safe</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlantRecommendations; 