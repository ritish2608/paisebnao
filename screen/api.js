// import axios from 'axios';
// let token = AsyncStorage.getItem('access_token');
// console.log('API TOKEN ::: ', token);
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // Create an Axios instance
// const api = axios.create({
//   baseURL: 'https://api.paisebnao.com/v1',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export const submitBankDetails = async (
//   accountNumber,
//   ifscCode,
//   accountHolderName,
//   token,
// ) => {
//   try {
//     const response = await api.post(
//       '/bank-details/',
//       {
//         account_number: accountNumber,
//         ifsc: ifscCode,
//         account_holder: accountHolderName,
//       },
//       {
//         headers: {
//           Accept: 'application/json, text/plain, */*',
//           Authorization: token,
//         },
//       },
//     );
//     return response;
//   } catch (error) {
//     console.error('Bank details submission failed:', error);
//     throw error;
//   }
// };

// const getToken = async () => {
//   try {
//     token = await AsyncStorage.getItem('access_token');
//     return token;
//   } catch (error) {
//     console.error('Error fetching token:', error);
//     return null;
//   }
// };
// export const createOrder = async (amount, membership_plan_id, token) => {
//   try {
//     const response = await axios.post(
//       'https://api.paisebnao.com/v1/create-order/',
//       {amount, membership_plan_id},
//       {
//         headers: {
//           Accept: 'application/json, text/plain, */*',
//           Authorization: token,
//         },
//       },
//     );

//     return response.data;
//   } catch (error) {
//     console.error('Error creating order:', error);
//     throw error;
//   }
// };

// // export const createOrder = async (amount, membership_plan_id, token) => {
// //   try {
// //     const response = await axios.post(
// //       'https://api.paisebnao.com/v1/create-order/',
// //       {amount, membership_plan_id},
// //       {
// //         headers: {
// //           Accept: 'application/json, text/plain, */*',
// //           Authorization: token,
// //         },
// //       },
// //     );

// //     return response.data;
// //   } catch (error) {
// //     console.error('Error creating order:', error);
// //     throw error;
// //   }
// // };

// export const registerUser = async userData => {
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
//     const token = await getToken();
//     const response = await axios.get(
//       'https://api.paisebnao.com/v1/dashboard/',
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: token,
//         },
//         params: {
//           link: 'https://www.youtube.com/watch?v=3WEkV_ciEYQ',
//         },
//       },
//     );
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching dashboard data:', error);
//     throw error;
//   }
// };

// export const withdrawalrequest = async (upi_id, amount, token) => {
//   try {
//     const response = await api.post(
//       'add-withdraw/',
//       {
//         upi_id: upi_id,
//         amount: amount,
//       },
//       {
//         headers: {
//           Accept: 'application/json, text/plain, */*',
//           Authorization: token,
//         },
//       },
//     );
//     return response.data;
//   } catch (error) {
//     console.error('Error in withdrawal request:', error);
//     throw error;
//   }
// };

// export const getBankDetails = async token => {
//   try {
//     const response = await api.get('/bank-details/', {
//       headers: {
//         Accept: 'application/json, text/plain, */*',
//         Authorization: token,
//       },
//     });

//     return response;
//   } catch (error) {
//     console.error('Failed to fetch bank details:', error);
//     throw error;
//   }
// };

// // Function for fetching partners data

// // export const PartnerApi = async () => {
// //   try {
// //     const token = await getToken();
// //     const response = await axios.get(
// //       'https://api.paisebnao.com/v1/our-partners/',
// //       {
// //         headers: {
// //           'Content-Type': 'application/json',
// //           Authorization: `Bearer ${token}`,
// //         },
// //         params: {
// //           link: 'https://www.youtube.com/watch?v=3WEkV_ciEYQ',
// //         },
// //       },
// //     );
// //     return response.data;
// //   } catch (error) {
// //     console.error('Error fetching partner data:', error);
// //     throw error;
// //   }
// // };

// // Function to get membership details
// export const handleGetMembership = async () => {
//   try {
//     const token = await getToken();
//     const response = await axios.get(
//       'https://api.paisebnao.com/v1/get-membership/',
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: token,
//         },
//       },
//     );
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching membership data:', error);
//     throw error;
//   }
// };

// // Function to add a reward
// export const addReward = async id => {
//   try {
//     const token = await getToken();
//     const response = await axios.post(
//       'https://api.paisebnao.com/v1/add-reward/',
//       {
//         id: id,
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: token,
//         },
//       },
//     );
//     return response.data;
//   } catch (error) {
//     console.error(
//       'Error adding reward:',
//       error.response ? error.response.data : error.message,
//     );
//     throw error;
//   }
// };
// //`Bearer ${token}`,
// // Function to fetch partner data
// export const fetchPartnerData = async () => {
//   try {
//     const token = await getToken();
//     const response = await axios.get(
//       'https://api.paisebnao.com/v1/our-partners/',
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: token,
//         },
//       },
//     );
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching partner data 88:', error.message);
//     throw error;
//   }
// };

// export const fetchUserdetail = async () => {
//   try {
//     const response = await axios.get('https://api.paisebnao.com/v1/get-user/', {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: token,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching User data:', error.message);
//     throw error;
//   }
// };
// // Function to fetch user details
// export const handleFetchUserDetail = async () => {
//   try {
//     const token = await getToken();
//     const response = await axios.get('https://api.paisebnao.com/v1/get-user/', {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: token,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching user details:', error.message);
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

// // import axios from 'axios';
// // import AsyncStorage from '@react-native-async-storage/async-storage';

// // const token = AsyncStorage.getItem('access_token');
// // // Create an Axios instance
// // const api = axios.create({
// //   baseURL: 'https://api.paisebnao.com/v1',
// //   headers: {
// //     'Content-Type': 'application/json',
// //   },
// // });

// // // Function to register a user
// // export const registerUser = async (userData) => {
// //   try {
// //     const response = await api.post('/user/registration/', userData);
// //     return response.data;
// //   } catch (error) {
// //     console.error('Error registering user:', error);
// //     throw error;
// //   }
// // };
// // // Function for fetching dashboard data
// // export const dashboardApi = async () => {
// //   try {
// //     const response = await axios.get('https://api.paisebnao.com/v1/dashboard/', {
// //       headers: {
// //         'Content-Type': 'application/json',
// //         'Authorization': token,
// //       },
// //       params: {
// //         link: 'https://www.youtube.com/watch?v=3WEkV_ciEYQ',
// //       },
// //     });
// //     return response.data;
// //   } catch (error) {
// //     console.error('Error fetching dashboard data:', error);
// //     throw error;
// //   }
// // };

// // // Function for fetching dashboard data
// // export const PartnerApi = async () => {
// //   try {
// //     const response = await axios.get('https://api.paisebnao.com/v1/our-partners/', {
// //       headers: {
// //         'Content-Type': 'application/json',
// //         'Authorization': token,
// //       },
// //       params: {
// //         link: 'https://www.youtube.com/watch?v=3WEkV_ciEYQ',
// //       },
// //     });
// //     return response.data;
// //   } catch (error) {
// //     console.error('Error fetching dashboard data:', error);
// //     throw error;
// //   }
// // };

// // // Function for GetMembership dashboard data
// // export const handleGetMembership = async () => {
// //   try {
// //     const response = await axios.get('https://api.paisebnao.com/v1/get-membership/', {
// //       headers: {
// //         'Content-Type': 'application/json',
// //         'Authorization': token,
// //       },

// //     });
// //     return response.data;
// //   } catch (error) {
// //     console.error('Error fetching dashboard data:', error);
// //     throw error;
// //   }
// // };

// // export const addReward = async (id) => {
// //   try {
// //     const response = await axios.post('https://api.paisebnao.com/v1/add-reward/', {
// //       id: id,
// //     }, {
// //       headers: {
// //         'Content-Type': 'application/json',
// //         'Authorization': token,
// //       },
// //     });
// //     return response.data;
// //   } catch (error) {
// //     console.error('Error adding reward:', error.response ? error.response.data : error.message);
// //     throw error;
// //   }
// // };

// // export const fetchPartnerData = async () => {
// //   try {
// //     const response = await axios.get('https://api.paisebnao.com/v1/our-partners/', {
// //       headers: {
// //         'Content-Type': 'application/json',
// //         'Authorization': token,
// //       },

// //     });
// //     return response.data;
// //   } catch (error) {
// //     console.error('Error fetching partner data:', error.message);
// //     throw error;
// //   }
// // };

// // export const fetchUserdetail = async () => {
// //   try {
// //     const response = await axios.get('https://api.paisebnao.com/v1/get-user/', {
// //       headers: {
// //         'Content-Type': 'application/json',
// //         'Authorization': token,
// //       },

// //     });
// //     return response.data;
// //   } catch (error) {
// //     console.error('Error fetching partner data:', error.message);
// //     throw error;
// //   }
// // };

// // // Function to login a user
// // export const loginUser = async (email, password) => {
// //   try {
// //     const response = await api.post('/user/login/', {
// //       email: email,
// //       login_type: 'email',
// //       password: password,
// //     });
// //     return response.data;
// //   } catch (error) {
// //     console.error('Login failed:', error);
// //     throw error;
// //   }
// // };

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create an Axios instance
const api = axios.create({
  baseURL: 'https://api.paisebnao.com/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
    console.error('Error saving data', e);
  }
};
const getData = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // read error
    console.error('Error fetching data', e);
  }
};

// Function to get the token from AsyncStorage
const getToken = async () => {
  return await AsyncStorage.getItem('access_token');
};

// Function to register a user
export const registerUser = async userData => {
  try {
    const response = await api.post('/user/registration/', userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Function to forget password
export const forgetPassword = async email_id => {
  try {
    const response = await api.post(
      '/forgot-password/',
      {email_id},
      {
        headers: {
          Accept: 'application/json, text/plain, */*',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error sending forget password request:', error);
    throw error;
  }
};

// Function to verify OTP
export const verifyOtp = async (otp, email_id) => {
  try {
    const response = await api.post(
      '/verify-otp/',
      {otp, email_id},
      {
        headers: {
          Accept: 'application/json, text/plain, */*',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
};

// Function to verify OTP after signup
export const verifyOtpAfterSignup = async otp => {
  const token = await getToken();
  try {
    const response = await api.post(
      '/verify-otp-after-signup/',
      {otp},
      {
        headers: {
          Accept: 'application/json, text/plain, */*',
          Authorization: token,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
};

// Function to create an order
// export const createOrder = async (amount, membership_plan_id) => {
//   const token = await getToken();
//   console.error('Error verifying token:', token);
//   try {
//     const response = await api.post(
//       '/create-order/',
//       {amount, membership_plan_id},
//       {
//         headers: {
//           Accept: 'application/json, text/plain, */*',
//           Authorization: token,
//         },
//       },
//     );
//     return response.data;
//   } catch (error) {
//     console.error('Error creating order:', error);
//     throw error;
//   }
// };

export const createOrder = async (amount, membership_plan_id) => {
  try {
    // Retrieve the token from AsyncStorage
    // const token = await AsyncStorage.getItem('access_token');
    const token = await getToken();
    console.log('createOrder token :: ', token, membership_plan_id);
    const response = await axios.post(
      'https://api.paisebnao.com/v1/create-order/',
      {amount, membership_plan_id},
      {
        headers: {
          Accept: 'application/json, text/plain, */*',
          Authorization: token,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Function for payment link
export const PaymentLinkApi = async payment_session_id => {
  const token = await getToken();
  try {
    const response = await api.post(
      '/payment-link/',
      {payment_session_id},
      {
        headers: {
          Accept: 'application/json, text/plain, */*',
          Authorization: token,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error creating payment link:', error);
    throw error;
  }
};

// Function to edit profile
export const editProfileContainer = async (first_name, phone_number) => {
  const token = await getToken();
  try {
    const response = await api.patch(
      '/edit-profile/',
      {
        first_name,
        phone_number,
      },
      {
        headers: {
          Accept: 'application/json, text/plain, */*',
          Authorization: token,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error editing profile:', error);
    throw error;
  }
};

// Function to set a new password
export const setNewPassword = async (email_id, new_password) => {
  const token = await getToken();
  console.log('setNewPassword ::: ', token);
  try {
    const response = await api.post(
      '/new-password/',
      {email_id, new_password},
      {
        headers: {
          Accept: 'application/json, text/plain, */*',
          Authorization: token,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error setting new password:', error);
    throw error;
  }
};

// Function for fetching dashboard data
export const dashboardApi = async () => {
  const token = await getToken();
  console.log('dashboard ship :: token :: ', token);
  try {
    const response = await api.get('/dashboard/', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};

// Function for fetching partner data
export const PartnerApi = async () => {
  const token = await getToken();
  try {
    const response = await api.get('/our-partners/', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching partner data:', error);
    throw error;
  }
};

// Function for getting membership data
export const handleGetMembership = async () => {
  const token = await getToken();
  console.log('member ship :: token :: ', token);
  try {
    const response = await api.get('/get-membership/', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching membership data:', error);
    throw error;
  }
};

// Function to add a reward
export const addReward = async id => {
  const token = await getToken();
  try {
    const response = await api.post(
      '/add-reward/',
      {id},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error adding reward:', error.message);
    throw error;
  }
};

// Function to fetch user details
export const fetchUserDetail = async () => {
  const token = await getToken();
  console.log('fetchUserdetail :::: ', token);
  try {
    const response = await api.get('/get-user/', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    throw error;
  }
};

// Function to login a user
export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/user/login/', {
      email,
      login_type: 'email',
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

// Function to contact us
export const ContactUs = async (message, name, email) => {
  try {
    const response = await api.post('/contact-us/', {
      message,
      name,
      email,
    });
    return response.data;
  } catch (error) {
    console.error('Error in contact detail', error);
    throw error;
  }
};

// Function to submit withdrawal request
export const withdrawalRequest = async (upi_id, amount) => {
  const token = await getToken();
  try {
    const response = await api.post(
      '/add-withdraw/',
      {
        upi_id,
        amount,
      },
      {
        headers: {
          Accept: 'application/json, text/plain, */*',
          Authorization: token,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error in withdrawal request:', error);
    throw error;
  }
};

// Function to fetch IFSC details
export const fetchIFSCDetails = async ifscCode => {
  try {
    const response = await fetch(`https://ifsc.razorpay.com/${ifscCode}`);
    if (!response.ok) {
      throw new Error('Invalid IFSC code');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching IFSC details:', error);
    throw error;
  }
};

// Function to submit bank details
export const submitBankDetails = async (
  accountNumber,
  ifscCode,
  accountHolderName,
) => {
  const token = await getToken();
  try {
    const response = await api.post(
      '/bank-details/',
      {
        account_number: accountNumber,
        ifsc: ifscCode,
        account_holder: accountHolderName,
      },
      {
        headers: {
          Accept: 'application/json, text/plain, */*',
          Authorization: token,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Bank details submission failed:', error);
    throw error;
  }
};

// Function to get bank details
export const getBankDetails = async () => {
  const token = await getToken();
  try {
    const response = await api.get('/bank-details/', {
      headers: {
        Accept: 'application/json, text/plain, */*',
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch bank details:', error);
    throw error;
  }
};

// Function to fetch IFSC suggestions
export const fetchIFSCSuggestions = async inputIFSC => {
  try {
    const response = await fetch(`https://ifsc.razorpay.com/${inputIFSC}`);
    if (!response.ok) {
      throw new Error('Error fetching IFSC suggestions');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching IFSC suggestions:', error);
    throw error;
  }
};
