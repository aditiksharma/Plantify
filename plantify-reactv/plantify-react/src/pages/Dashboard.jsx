import { useState } from 'react';
import { Leaf, Plus, Droplets, MapPin } from 'lucide-react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Dashboard = ({ userProfile }) => {
  const [activeTab, setActiveTab] = useState('recommendations');
  const [value, onChange] = useState(new Date());

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="dashboard-welcome">
          <h1>Welcome back{userProfile?.name ? `, ${userProfile.name}` : ''}! 🌱</h1>
          <p>Let's get growing</p>
        </div>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={`tab ${activeTab === 'recommendations' ? 'active' : ''}`}
          onClick={() => setActiveTab('recommendations')}
        >
          <Leaf size={20} />
          Recommendations
        </button>
        <button 
          className={`tab ${activeTab === 'garden' ? 'active' : ''}`}
          onClick={() => setActiveTab('garden')}
        >
          <Plus size={20} />
          My Garden
        </button>
        <button 
          className={`tab ${activeTab === 'maintenance' ? 'active' : ''}`}
          onClick={() => setActiveTab('maintenance')}
        >
          <Droplets size={20} />
          Maintenance Schedule
        </button>
        <button 
          className={`tab ${activeTab === 'nurseries' ? 'active' : ''}`}
          onClick={() => setActiveTab('nurseries')}
        >
          <MapPin size={20} />
          Local Nurseries
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'recommendations' && (
          <div className="recommendations-tab">
            <h2>Plant Recommendations</h2>
            <p>This is the recommendations tab content.</p>
          </div>
        )}

        {activeTab === 'garden' && (
          <div className="garden-tab">
            <h2>My Garden</h2>
            <p>This is the garden tab content.</p>
          </div>
        )}

        {activeTab === 'maintenance' && (
          <div className="maintenance-tab">
            <h2>Maintenance Schedule</h2><br></br><br></br>
              <Calendar onChange={onChange} value={value} />
          </div>
        )}

        {activeTab === 'nurseries' && (
          <div className="nurseries-tab">
            <p>Eventually this will include a Google Maps API with Bay Area nurseries</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 