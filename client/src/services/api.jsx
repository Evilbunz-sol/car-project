import axios from 'axios';
import { API_URL } from '../config';

export const getRecommendations = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/api/v1/recommend`, formData);
    return response.data;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};