import axios from 'axios';
import { API_URL } from '../constants'; // Adjust the path as necessary

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