import { Link, useNavigate } from 'react-router-dom';
import { Leaf, ArrowRight, Star, MapPin, Calendar } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Home = () => {
  const { userProfile } = useUser();
  const navigate = useNavigate();

  const handleViewGarden = () => {
    navigate('/dashboard', { state: { activeTab: 'garden' } });
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Let's grow something beautiful together</h1>
          <p>Your personal plant companion for the Bay Area. Get personalized recommendations, track your garden, and discover local nurseries.</p>
          
          {userProfile ? (
            <div className="welcome-section">
              <div className="welcome-message" onClick={handleProfileClick}>
                <h2>Welcome back, {userProfile.name}! 🌱</h2>
                <p>Click to view your profile details</p>
                <div className="profile-summary">
                  <span>📍 {userProfile.zip}</span>
                  <span>🏠 {userProfile.space}</span>
                  <span>🌿 {userProfile.level}</span>
                </div>
              </div>
              <div className="hero-actions">
                <button className="btn-primary" onClick={handleViewGarden}>
                  <Leaf size={20} />
                  View Your Garden
                </button>
                <Link to="/dashboard" className="btn-secondary">
                  <Star size={20} />
                  Get Recommendations
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          ) : (
            <div className="hero-actions">
              <Link to="/profile" className="btn-primary">
                <Leaf size={20} />
                Create Your Profile
                <ArrowRight size={20} />
              </Link>
              <Link to="/dashboard" className="btn-secondary">
                <Star size={20} />
                Browse Plants
                <ArrowRight size={20} />
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="features-section">
        <h2>Everything you need to grow your perfect garden</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <MapPin size={32} />
            </div>
            <h3>Local Nursery Finder</h3>
            <p>Find nurseries near you that have the plants you want in stock</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <Leaf size={32} />
            </div>
            <h3>Plant Identification</h3>
            <p>Take a photo to identify plants and get care information</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <Calendar size={32} />
            </div>
            <h3>Watering Scheduler</h3>
            <p>Never forget to water your plants with smart reminders</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <Star size={32} />
            </div>
            <h3>Personalized Recommendations</h3>
            <p>Get plant suggestions based on your space and lifestyle</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 