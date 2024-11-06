import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GlobalContext = createContext();

export const GlobalProvider = ({children}) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Load user data from AsyncStorage when the app starts
    const loadData = async () => {
      const jsonValue = await AsyncStorage.getItem('userData');
      if (jsonValue) {
        setUserData(JSON.parse(jsonValue));
      }
    };

    loadData();
  }, []);

  const saveData = async data => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(data));
      setUserData(data);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  const saveToken = async data => {
    try {
      await AsyncStorage.setItem('getLoadToken', data);
      setUserData(data);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  useEffect(() => {
    // Load user data from AsyncStorage when the app starts
    const getLoadToken = async () => {
      const jsonValue = await AsyncStorage.getItem('getLoadToken');
      if (jsonValue) {
        setUserData(JSON.parse(jsonValue));
      }
    };

    getLoadToken();
  }, []);
  return (
    <GlobalContext.Provider value={{userData, saveData, saveToken}}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use global context
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
