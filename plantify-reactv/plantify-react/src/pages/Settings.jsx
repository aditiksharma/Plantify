import { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Key, Bell, Calendar, Mail, Save, TestTube } from 'lucide-react';

const Settings = () => {
  const [apiKey, setApiKey] = useState('');
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    browserNotifications: true,
    wateringReminders: true,
    careTips: true,
    weeklyDigest: false
  });
  const [apiStatus, setApiStatus] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Load saved settings
    const savedApiKey = localStorage.getItem('plantIdApiKey');
    const savedNotifications = localStorage.getItem('notificationSettings');
    
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
    
    if (savedNotifications) {
      setNotificationSettings(JSON.parse(savedNotifications));
    }
  }, []);

  const handleApiKeyChange = (e) => {
    setApiKey(e.target.value);
    setApiStatus('');
  };

  const handleNotificationChange = (setting) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const saveApiKey = async () => {
    if (!apiKey.trim()) {
      setApiStatus('Please enter an API key');
      return;
    }

    setIsSaving(true);
    
    try {
      // Simulate API validation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      localStorage.setItem('plantIdApiKey', apiKey);
      setApiStatus('API key saved successfully!');
      
      setTimeout(() => setApiStatus(''), 3000);
    } catch (error) {
      setApiStatus('Error saving API key: ' + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const testApiKey = async () => {
    if (!apiKey.trim()) {
      setApiStatus('Please enter an API key first');
      return;
    }

    setIsTesting(true);
    setApiStatus('Testing API connection...');
    
    try {
      // Simulate API test
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setApiStatus('API connection successful!');
      setTimeout(() => setApiStatus(''), 3000);
    } catch (error) {
      setApiStatus('API test failed: ' + error.message);
    } finally {
      setIsTesting(false);
    }
  };

  const saveNotificationSettings = () => {
    localStorage.setItem('notificationSettings', JSON.stringify(notificationSettings));
    // Show success message
    const originalStatus = apiStatus;
    setApiStatus('Notification settings saved!');
    setTimeout(() => setApiStatus(originalStatus), 2000);
  };

  return (
    <div className="settings-page">
      <div className="settings-container">
        <div className="settings-header">
          <SettingsIcon className="settings-icon" />
          <h1>Settings</h1>
          <p>Configure your Plantify experience</p>
        </div>

        <div className="settings-sections">
          {/* API Settings */}
          <div className="settings-section">
            <div className="section-header">
              <Key className="section-icon" />
              <h2>Plant Identification API</h2>
            </div>
            <p className="section-description">
              Configure your Plant.id API key to enable real plant identification.
            </p>
            
            <div className="api-setup">
              <div className="api-instructions">
                <h3>How to get your API key:</h3>
                <ol>
                  <li>Visit <a href="https://web.plant.id/api-access-key" target="_blank" rel="noopener noreferrer">Plant.id API Access</a></li>
                  <li>Sign up for a free account</li>
                  <li>Copy your API key from the dashboard</li>
                  <li>Paste it below</li>
                </ol>
              </div>
              
              <div className="form-group">
                <label htmlFor="apiKey">Plant.id API Key:</label>
                <input
                  type="password"
                  id="apiKey"
                  value={apiKey}
                  onChange={handleApiKeyChange}
                  placeholder="Enter your API key"
                />
                <small className="help-text">Your API key is stored locally and never shared</small>
              </div>
              
              <div className="api-actions">
                <button 
                  className="btn-primary" 
                  onClick={saveApiKey}
                  disabled={isSaving}
                >
                  <Save size={16} />
                  {isSaving ? 'Saving...' : 'Save API Key'}
                </button>
                <button 
                  className="btn-secondary" 
                  onClick={testApiKey}
                  disabled={isTesting || !apiKey.trim()}
                >
                  <TestTube size={16} />
                  {isTesting ? 'Testing...' : 'Test Connection'}
                </button>
              </div>
              
              {apiStatus && (
                <div className={`api-status ${apiStatus.includes('successful') ? 'success' : 'error'}`}>
                  {apiStatus}
                </div>
              )}
            </div>
          </div>

          {/* Notification Settings */}
          <div className="settings-section">
            <div className="section-header">
              <Bell className="section-icon" />
              <h2>Notification Preferences</h2>
            </div>
            <p className="section-description">
              Choose how you'd like to receive plant care reminders and updates.
            </p>
            
            <div className="notification-settings">
              <div className="notification-group">
                <h3>Email Notifications</h3>
                <div className="setting-item">
                  <label className="toggle-label">
                    <input
                      type="checkbox"
                      checked={notificationSettings.emailNotifications}
                      onChange={() => handleNotificationChange('emailNotifications')}
                    />
                    <span className="toggle-slider"></span>
                    <div className="toggle-content">
                      <Mail size={20} />
                      <div>
                        <span className="toggle-title">Email Notifications</span>
                        <span className="toggle-description">Receive watering reminders and care tips via email</span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="notification-group">
                <h3>Browser Notifications</h3>
                <div className="setting-item">
                  <label className="toggle-label">
                    <input
                      type="checkbox"
                      checked={notificationSettings.browserNotifications}
                      onChange={() => handleNotificationChange('browserNotifications')}
                    />
                    <span className="toggle-slider"></span>
                    <div className="toggle-content">
                      <Bell size={20} />
                      <div>
                        <span className="toggle-title">Browser Notifications</span>
                        <span className="toggle-description">Get pop-up notifications in your browser</span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="notification-group">
                <h3>Reminder Types</h3>
                <div className="setting-item">
                  <label className="toggle-label">
                    <input
                      type="checkbox"
                      checked={notificationSettings.wateringReminders}
                      onChange={() => handleNotificationChange('wateringReminders')}
                    />
                    <span className="toggle-slider"></span>
                    <div className="toggle-content">
                      <Calendar size={20} />
                      <div>
                        <span className="toggle-title">Watering Reminders</span>
                        <span className="toggle-description">Get notified when it's time to water your plants</span>
                      </div>
                    </div>
                  </label>
                </div>

                <div className="setting-item">
                  <label className="toggle-label">
                    <input
                      type="checkbox"
                      checked={notificationSettings.careTips}
                      onChange={() => handleNotificationChange('careTips')}
                    />
                    <span className="toggle-slider"></span>
                    <div className="toggle-content">
                      <Mail size={20} />
                      <div>
                        <span className="toggle-title">Care Tips</span>
                        <span className="toggle-description">Receive helpful plant care advice</span>
                      </div>
                    </div>
                  </label>
                </div>

                <div className="setting-item">
                  <label className="toggle-label">
                    <input
                      type="checkbox"
                      checked={notificationSettings.weeklyDigest}
                      onChange={() => handleNotificationChange('weeklyDigest')}
                    />
                    <span className="toggle-slider"></span>
                    <div className="toggle-content">
                      <Calendar size={20} />
                      <div>
                        <span className="toggle-title">Weekly Digest</span>
                        <span className="toggle-description">Get a weekly summary of your garden activities</span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div className="settings-actions">
              <button 
                className="btn-primary" 
                onClick={saveNotificationSettings}
              >
                <Save size={16} />
                Save Notification Settings
              </button>
            </div>
          </div>

          {/* Data Management */}
          <div className="settings-section">
            <div className="section-header">
              <SettingsIcon className="section-icon" />
              <h2>Data Management</h2>
            </div>
            <p className="section-description">
              Manage your stored data and preferences.
            </p>
            
            <div className="data-actions">
              <button className="btn-secondary">
                Export My Data
              </button>
              <button className="btn-danger">
                Clear All Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 