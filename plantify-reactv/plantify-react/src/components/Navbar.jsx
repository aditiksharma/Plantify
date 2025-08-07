import { Link, useLocation } from 'react-router-dom';
import { Leaf, User, Settings, Home } from 'lucide-react';

const Navbar = ({ userProfile }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <Leaf className="navbar-logo" />
          <span>Plantify</span>
        </Link>

        <div className="navbar-menu">
          <Link 
            to="/" 
            className={`navbar-link ${isActive('/') ? 'active' : ''}`}
          >
            <Home size={20} />
            <span>Home</span>
          </Link>

          <Link 
            to="/dashboard" 
            className={`navbar-link ${isActive('/dashboard') ? 'active' : ''}`}
          >
            <Leaf size={20} />
            <span>Dashboard</span>
          </Link>

          <Link 
            to="/profile" 
            className={`navbar-link ${isActive('/profile') ? 'active' : ''}`}
          >
            <User size={20} />
            <span>Profile</span>
          </Link>

          <Link 
            to="/settings" 
            className={`navbar-link ${isActive('/settings') ? 'active' : ''}`}
          >
            <Settings size={20} />
            <span>Settings</span>
          </Link>
        </div>

        {userProfile && (
          <div className="navbar-profile">
            <span>Welcome, {userProfile.name}!</span>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 