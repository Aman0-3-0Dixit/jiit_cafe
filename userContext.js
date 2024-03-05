// UserContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { fetchUserDetails } from './fetchApi';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState();

  const updateUser = (newUserData) => {
    setUserData(newUserData);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userDetailsData = await fetchUserDetails(userData);
      setUserData((prevUserData) => ({ ...prevUserData, ...userDetailsData }));
    };
  
    if (userData) {
      fetchUserData();
    }
  }, []);

  const updateUserDetails = async () => {
    const userDetailsData = await fetchUserDetails(userData);
    setUserData((prevUserData) => ({ ...prevUserData, ...userDetailsData }));
  };

  return (
    <UserContext.Provider value={{ userData, updateUser, updateUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
