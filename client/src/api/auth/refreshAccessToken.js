import axios from 'axios';

// Base API URL
const Api_Url = "http://localhost:8000/api";

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');

  try {
    const response = await axios.post(`${Api_Url}/refresh-token`, { refreshToken });

    const { accessToken } = response.data;
    localStorage.setItem('accessToken', accessToken);

    console.log('Access token refreshed:', accessToken);


  } catch (error) {
    console.error('Token refresh failed:', error);
  }
};
