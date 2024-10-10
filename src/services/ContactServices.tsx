import axios from "axios";

const API_BE_URL = import.meta.env.VITE_API_BE_URL;

interface Contact {
    id: number;
    user_name: string;
    mail: string;
    phone: string;
    description: string;
}

export const getAllContacts = async (): Promise<Contact[]> => {
    const response = await axios.get(`${API_BE_URL}Contact/getAllContacts`);
    return response.data;
};

export const deleteContact = async (id: number): Promise<void> => {
    await axios.delete(`${API_BE_URL}Contact/DeleteContact/${id}`);
};

export const createContact = async (contact: Contact): Promise<void> => {
    await axios.post(`${API_BE_URL}Contact/CreateContact`, contact);
};


