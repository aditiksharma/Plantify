import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import { PlantProvider } from './context/PlantContext';
import { UserProvider } from './context/UserContext';
import './App.css';

function App() {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Load user profile from localStorage
    const profile = localStorage.getItem('plantifyProfile');
    if (profile) {
      setUserProfile(JSON.parse(profile));
    }
  }, []);

  return (
    <UserProvider>
      <PlantProvider>
        <Router>
          <div className="App">
            <Navbar userProfile={userProfile} />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile setUserProfile={setUserProfile} />} />
                <Route path="/dashboard" element={<Dashboard userProfile={userProfile} />} />
              </Routes>
            </main>
          </div>
        </Router>
      </PlantProvider>
    </UserProvider>
  );
}

export default App;
