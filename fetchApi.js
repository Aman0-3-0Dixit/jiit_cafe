// fetchApi.mjs
import AsyncStorage from '@react-native-async-storage/async-storage';

//const BASE_URL = 'http://192.168.1.104:3000';
export const fetchUserDetails = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log('Token:', token);

    if (!token) {
      // Token not found, handle as needed (e.g., redirect to login)
      return null;
    }

    const response = await fetch('http://192.168.1.6:3000/user/details', {
      method: 'GET',
      headers: {
        Authorization : `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('API Response:', response);

    console.log('API Response:', response.status); // Log the response status

    if (response.ok) {
      const userDetails = await response.json();
      console.log('User Details:', userDetails); // Log the user details
      return userDetails;
    } else {
      // Handle error response from the server
      console.log('Error from server 404');
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
    // Handle other errors as needed
    return null;
  }
};

