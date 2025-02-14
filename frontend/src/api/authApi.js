import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/auth';

export const loginUser = async (credentials) => {
  return await axios.post(`${API_BASE}/login`, credentials, { withCredentials: true });
};

export const registerUser = async (credentials) => {
  return await axios.post(`${API_BASE}/register`, credentials);
};

export const logoutUser = async () => {
  return await axios.post(`${API_BASE}/logout`, {}, { withCredentials: true });
};

const API_URL = 'http://localhost:5000/api/locations';

export const getCities = async () => {
  try {
    const response = await axios.get(`${API_URL}/iller`);
    return response.data;
  } catch (error) {
    console.error('Şehirler çekilirken hata oluştu:', error);
    return [];
  }
};

export const getDistricts = async (cityName) => {
  try {
    const response = await axios.get(`${API_URL}/iller/${cityName}`);
    return response.data;
  } catch (error) {
    console.error('İlçeler çekilirken hata oluştu:', error);
    return [];
  }
};
