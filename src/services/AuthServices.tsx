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

export const updateUser = async (userData: any) => {
  try {
    const response = await axios.post(`${API_BE_URL}AuthLogin/UpdateProfile/${userData.username}`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const changePassword = async (userData: any) => {
//   try {
//     const response = await axios.post(`${API_BE_URL}AuthLogin/changePassword/${userData.username}`, userData);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };
interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

export const changePassword = async (username: string, newPassword: string, confirmPassword: string): Promise<ChangePasswordResponse> => {
  try {
    const response = await axios.post<ChangePasswordResponse>(`${API_BE_URL}AuthLogin/changePassword/${username}`, null, {
      params: {
        username: username,
        PW: newPassword,
        confirmPW: confirmPassword,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllCustomer = async () => {
  try {
    const response = await axios.get(`${API_BE_URL}AuthLogin/listUser`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

