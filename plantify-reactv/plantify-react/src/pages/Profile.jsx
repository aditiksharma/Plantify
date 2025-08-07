import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, Home, Sun, Clock, Heart, Leaf } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Profile = ({ setUserProfile }) => {
  const navigate = useNavigate();
  const { userProfile: existingProfile, updateProfile } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    zip: '',
    email: '',
    space: '',
    light: '',
    level: '',
    timeCommitment: '',
    movingSoon: false,
    petSafe: false,
    interestedInNative: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  // Load existing profile data if available
  useEffect(() => {
    if (existingProfile) {
      setFormData(existingProfile);
    }
  }, [existingProfile]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.zip.trim()) {
      newErrors.zip = 'ZIP code is required';
    } else if (!/^94\d{3}$/.test(formData.zip)) {
      newErrors.zip = 'Please enter a valid Bay Area ZIP code (94xxx)';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.space) {
      newErrors.space = 'Please select your space type';
    }

    if (!formData.light) {
      newErrors.light = 'Please select your light conditions';
    }

    if (!formData.level) {
      newErrors.level = 'Please select your experience level';
    }

    if (!formData.timeCommitment) {
      newErrors.timeCommitment = 'Please select your time commitment';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setShowLoading(true);

    try {
      updateProfile(formData);
      setUserProfile(formData);
      
      // Show loading screen for 2.5 seconds before redirecting
      setTimeout(() => {
        navigate('/dashboard');
      }, 2500);
    } catch (error) {
      console.error('Error saving profile:', error);
      setIsSubmitting(false);
      setShowLoading(false);
    }
  };

  if (showLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-container">
          <div className="plant-animation">
            <div className="pot">
              <div className="soil"></div>
            </div>
            <div className="plant">
              <div className="stem"></div>
              <div className="leaf leaf-1"></div>
              <div className="leaf leaf-2"></div>
              <div className="leaf leaf-3"></div>
              <div className="leaf leaf-4"></div>
            </div>
            <div className="sparkles">
              <div className="sparkle sparkle-1">✨</div>
              <div className="sparkle sparkle-2">🌱</div>
              <div className="sparkle sparkle-3">💚</div>
            </div>
          </div>
          <h2>{existingProfile ? 'Updating Your Profile...' : 'Growing Your Perfect Garden...'}</h2>
          <p>{existingProfile ? 'We\'re updating your preferences and recommendations!' : 'We\'re analyzing your preferences and finding the best plants for you!'}</p>
          <div className="loading-dots">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <User className="profile-icon" />
          <h1>{existingProfile ? 'Edit Your Plant Profile' : 'Create Your Plant Profile'}</h1>
          <p>{existingProfile ? 'Update your preferences to get better recommendations' : 'Help us recommend the perfect plants for your space and lifestyle'}</p>
        </div>

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-section">
            <h2>Basic Information</h2>
            
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="zip">ZIP Code *</label>
              <div className="input-with-icon">
                <MapPin size={20} />
                <input
                  type="text"
                  id="zip"
                  name="zip"
                  value={formData.zip}
                  onChange={handleInputChange}
                  placeholder="Enter your ZIP code"
                  className={errors.zip ? 'error' : ''}
                />
              </div>
              {errors.zip && <span className="error-message">{errors.zip}</span>}
              <small className="help-text">Bay Area ZIP codes only (94xxx)</small>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
              <small className="help-text">We'll send you watering reminders and plant care tips</small>
            </div>
          </div>

          <div className="form-section">
            <h2>Your Space</h2>
            
            <div className="form-group">
              <label htmlFor="space">What type of space do you have? *</label>
              <div className="input-with-icon">
                <Home size={20} />
                <select
                  id="space"
                  name="space"
                  value={formData.space}
                  onChange={handleInputChange}
                  className={errors.space ? 'error' : ''}
                >
                  <option value="">Select your space type</option>
                  <option value="No Outdoor Space">No Outdoor Space (Apartment/Indoor only)</option>
                  <option value="Balcony">Balcony or Small Outdoor Space</option>
                  <option value="Yard">Yard or Garden</option>
                </select>
              </div>
              {errors.space && <span className="error-message">{errors.space}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="light">Light Conditions *</label>
              <div className="input-with-icon">
                <Sun size={20} />
                <select
                  id="light"
                  name="light"
                  value={formData.light}
                  onChange={handleInputChange}
                  className={errors.light ? 'error' : ''}
                >
                  <option value="">Select light conditions</option>
                  <option value="Low">Low Light (North-facing, few windows)</option>
                  <option value="Bright Indirect">Bright Indirect (East/West windows)</option>
                  <option value="Bright Direct">Bright Direct (South-facing, lots of sun)</option>
                </select>
              </div>
              {errors.light && <span className="error-message">{errors.light}</span>}
            </div>
          </div>

          <div className="form-section">
            <h2>Experience & Time</h2>
            
            <div className="form-group">
              <label htmlFor="level">Plant Experience Level *</label>
              <select
                id="level"
                name="level"
                value={formData.level}
                onChange={handleInputChange}
                className={errors.level ? 'error' : ''}
              >
                <option value="">Select your experience level</option>
                <option value="Novice">Novice (New to plants)</option>
                <option value="Intermediate">Intermediate (Some experience)</option>
                <option value="Advanced">Advanced (Experienced gardener)</option>
              </select>
              {errors.level && <span className="error-message">{errors.level}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="timeCommitment">Time Commitment *</label>
              <div className="input-with-icon">
                <Clock size={20} />
                <select
                  id="timeCommitment"
                  name="timeCommitment"
                  value={formData.timeCommitment}
                  onChange={handleInputChange}
                  className={errors.timeCommitment ? 'error' : ''}
                >
                  <option value="">Select time commitment</option>
                  <option value="Low">Low (5-10 minutes/week)</option>
                  <option value="Medium">Medium (15-30 minutes/week)</option>
                  <option value="High">High (30+ minutes/week)</option>
                </select>
              </div>
              {errors.timeCommitment && <span className="error-message">{errors.timeCommitment}</span>}
            </div>
          </div>

          <div className="form-section">
            <h2>Preferences</h2>
            
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="movingSoon"
                  checked={formData.movingSoon}
                  onChange={handleInputChange}
                />
                <span className="checkmark"></span>
                <div className="checkbox-content">
                  <span className="checkbox-title">Moving Soon</span>
                  <span className="checkbox-description">I plan to move within the next year</span>
                </div>
              </label>
            </div>

            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="petSafe"
                  checked={formData.petSafe}
                  onChange={handleInputChange}
                />
                <span className="checkmark"></span>
                <div className="checkbox-content">
                  <Heart size={20} />
                  <div>
                    <span className="checkbox-title">Pet Safe Plants</span>
                    <span className="checkbox-description">I have pets and need non-toxic plants</span>
                  </div>
                </div>
              </label>
            </div>

            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="interestedInNative"
                  checked={formData.interestedInNative}
                  onChange={handleInputChange}
                />
                <span className="checkmark"></span>
                <div className="checkbox-content">
                  <Leaf size={20} />
                  <div>
                    <span className="checkbox-title">Native Plants</span>
                    <span className="checkbox-description">I'm interested in Bay Area native plants</span>
                  </div>
                </div>
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (existingProfile ? 'Updating Profile...' : 'Creating Profile...') : (existingProfile ? 'Update Profile' : 'Create Profile')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile; 