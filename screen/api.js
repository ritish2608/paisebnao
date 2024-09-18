
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create an Axios instance
const api = axios.create({
  baseURL: 'https://api.paisebnao.com/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});


const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    return token;
  } catch (error) {
    console.error('Error fetching token:', error);
    return null;
  }
};

// Function to register a user
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/user/registration/', userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Function for fetching dashboard data
export const dashboardApi = async () => {
  try {
    const token = await getToken();
    const response = await axios.get('https://api.paisebnao.com/v1/dashboard/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      params: {
        link: 'https://www.youtube.com/watch?v=3WEkV_ciEYQ',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};

// Function for fetching partners data
export const PartnerApi = async () => {
  try {
    const token = await getToken();
    const response = await axios.get('https://api.paisebnao.com/v1/our-partners/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      params: {
        link: 'https://www.youtube.com/watch?v=3WEkV_ciEYQ',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching partner data:', error);
    throw error;
  }
};

// Function to get membership details
export const handleGetMembership = async () => {
  try {
    const token = await getToken();
    const response = await axios.get('https://api.paisebnao.com/v1/get-membership/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching membership data:', error);
    throw error;
  }
};

// Function to add a reward
export const addReward = async (id) => {
  try {
    const token = await getToken();
    const response = await axios.post('https://api.paisebnao.com/v1/add-reward/', {
      id: id,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding reward:', error.response ? error.response.data : error.message);
    throw error;
  }
};
//`Bearer ${token}`,
// Function to fetch partner data
export const fetchPartnerData = async () => {
  try {
    const token = await getToken();
    const response = await axios.get('https://api.paisebnao.com/v1/our-partners/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching partner data:', error.message);
    throw error;
  }
};

// Function to fetch user details
export const fetchUserdetail = async () => {
  try {
    const token = await getToken();
    const response = await axios.get('https://api.paisebnao.com/v1/get-user/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error.message);
    throw error;
  }
};

// Function to login a user
export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/user/login/', {
      email: email,
      login_type: 'email',
      password: password,
    });
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};



// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const token = AsyncStorage.getItem('access_token');
// // Create an Axios instance
// const api = axios.create({
//   baseURL: 'https://api.paisebnao.com/v1',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Function to register a user
// export const registerUser = async (userData) => {
//   try {
//     const response = await api.post('/user/registration/', userData);
//     return response.data;
//   } catch (error) {
//     console.error('Error registering user:', error);
//     throw error;
//   }
// };
// // Function for fetching dashboard data
// export const dashboardApi = async () => {
//   try {
//     const response = await axios.get('https://api.paisebnao.com/v1/dashboard/', {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': token,
//       },
//       params: {
//         link: 'https://www.youtube.com/watch?v=3WEkV_ciEYQ',
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching dashboard data:', error);
//     throw error;
//   }
// };

// // Function for fetching dashboard data
// export const PartnerApi = async () => {
//   try {
//     const response = await axios.get('https://api.paisebnao.com/v1/our-partners/', {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': token,
//       },
//       params: {
//         link: 'https://www.youtube.com/watch?v=3WEkV_ciEYQ',
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching dashboard data:', error);
//     throw error;
//   }
// };

// // Function for GetMembership dashboard data
// export const handleGetMembership = async () => {
//   try {
//     const response = await axios.get('https://api.paisebnao.com/v1/get-membership/', {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': token,
//       },

//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching dashboard data:', error);
//     throw error;
//   }
// };



// export const addReward = async (id) => {
//   try {
//     const response = await axios.post('https://api.paisebnao.com/v1/add-reward/', {
//       id: id,
//     }, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': token,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error adding reward:', error.response ? error.response.data : error.message);
//     throw error;
//   }
// };

// export const fetchPartnerData = async () => {
//   try {
//     const response = await axios.get('https://api.paisebnao.com/v1/our-partners/', {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': token,
//       },

//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching partner data:', error.message);
//     throw error;
//   }
// };



// export const fetchUserdetail = async () => {
//   try {
//     const response = await axios.get('https://api.paisebnao.com/v1/get-user/', {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': token,
//       },

//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching partner data:', error.message);
//     throw error;
//   }
// };




// // Function to login a user
// export const loginUser = async (email, password) => {
//   try {
//     const response = await api.post('/user/login/', {
//       email: email,
//       login_type: 'email',
//       password: password,
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Login failed:', error);
//     throw error;
//   }
// };
