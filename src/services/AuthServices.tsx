import axios from 'axios';

const API_BE_URL = import.meta.env.VITE_API_BE_URL;

// Function to register a user
export const registerUser = async (userData: any) => {
  try {
      const response = await axios.post(`${API_BE_URL}AuthLogin/register`, userData);
      return response.data;
    } catch (error) {
        throw error;
    }
};

// New function to login a user

export const loginUser = async (userData: any) => {
  try {
    const response = await axios.post(`${API_BE_URL}AuthLogin`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};