import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000'; // Replace with your API URL

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login/`, { email, password });
  return response.data;
};

export const getUserProfile = async (token) => {
  const response = await axios.get(`${API_URL}/auth/profile/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};