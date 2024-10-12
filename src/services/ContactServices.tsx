import axios from "axios";

const API_BE_URL = import.meta.env.VITE_API_BE_URL;

// Tạo instance Axios với cấu hình mặc định
const axiosInstance = axios.create({
  baseURL: API_BE_URL,
  headers: {
    'ngrok-skip-browser-warning': '69420'
  }
});

interface Contact {
    id: number;
    user_name: string;
    mail: string;
    phone: string;
    description: string;
}

export const getAllContacts = async (): Promise<Contact[]> => {
    const response = await axiosInstance.get('Contact/getAllContacts');
    return response.data;
};

export const deleteContact = async (id: number): Promise<void> => {
    await axiosInstance.delete(`Contact/DeleteContact/${id}`);
};

export const createContact = async (contact: Contact): Promise<void> => {
    await axiosInstance.post('Contact/CreateContact', contact);
};



