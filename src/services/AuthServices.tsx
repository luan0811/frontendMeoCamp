import axios from 'axios';

const API_BE_URL = import.meta.env.VITE_API_BE_URL;

// Tạo instance Axios với cấu hình mặc định
const axiosInstance = axios.create({
  baseURL: API_BE_URL,
  headers: {
    'ngrok-skip-browser-warning': '69420'
  }
});

// Function to register a user
export const registerUser = async (userData: any) => {
  try {
    const response = await axiosInstance.post('AuthLogin/register', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to login a user
export const loginUser = async (userData: any) => {
  try {
    const response = await axiosInstance.post('AuthLogin', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (userData: any) => {
  try {
    const response = await axiosInstance.post(`AuthLogin/UpdateProfile/${userData.username}`, userData);
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
    const response = await axiosInstance.post<ChangePasswordResponse>(`AuthLogin/changePassword/${username}`, null, {
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
    const response = await axiosInstance.get('AuthLogin/listUser');
    return response.data;
  } catch (error) {
    throw error;
  }
};
