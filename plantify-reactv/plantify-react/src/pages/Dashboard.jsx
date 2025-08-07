import { useState } from 'react';
import { Leaf, Plus, Droplets } from 'lucide-react';

const Dashboard = ({ userProfile }) => {
  const [activeTab, setActiveTab] = useState('recommendations');

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="dashboard-welcome">
          <h1>Welcome back{userProfile?.name ? `, ${userProfile.name}` : ''}! 🌱</h1>
          <p>Let's grow something beautiful together</p>
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
          Maintenance
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
            <h2>Maintenance</h2>
            <p>This is the maintenance tab content.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 