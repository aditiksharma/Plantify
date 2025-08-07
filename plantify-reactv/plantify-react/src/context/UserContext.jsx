import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user profile from localStorage
    const savedProfile = localStorage.getItem('plantifyProfile');
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }
    setLoading(false);
  }, []);

  const updateProfile = (profileData) => {
    const newProfile = {
      ...profileData,
      createdAt: new Date().toISOString()
    };
    setUserProfile(newProfile);
    localStorage.setItem('plantifyProfile', JSON.stringify(newProfile));
  };

  const clearProfile = () => {
    setUserProfile(null);
    localStorage.removeItem('plantifyProfile');
  };

  const hasProfile = () => {
    return userProfile !== null;
  };

  const value = {
    userProfile,
    updateProfile,
    clearProfile,
    hasProfile,
    loading
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}; 