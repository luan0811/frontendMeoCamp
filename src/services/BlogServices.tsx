import axios from 'axios';
import { getAllCustomer } from '../services/AuthServices';

// Define the API URL from environment variables or a hardcoded URL
const API_BE_URL = import.meta.env.VITE_API_BE_URL;

// Tạo instance Axios với cấu hình mặc định
const axiosInstance = axios.create({
  baseURL: API_BE_URL,
  headers: {
    'ngrok-skip-browser-warning': '69420'
  }
});

// Define types for your blog data
interface Blog {
  id: number;
  title: string;
  content: string;
  image: string;
  post_date: string;
  customerId: number;
  status: boolean;
  // Add other relevant blog fields
}

// Fetch all blogs
export const getAllBlogs = async (): Promise<Blog[]> => {
  try {
    const response = await axiosInstance.get<Blog[]>('Blog/getAllBlogs');
    return response.data;
  } catch (error) {
    console.error("Error fetching all blogs", error);
    throw error;
  }
};

// Fetch blogs by user ID
export const getBlogByUserId = async (userId: number): Promise<Blog[]> => {
  try {
    const response = await axiosInstance.get<Blog[]>(`Blog/getBlogbyuserId/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching blog for user ID: ${userId}`, error);
    throw error;
  }
};

// Define the type for createBlog data
interface CreateBlogData {
  title: string;
  content: string;
  image: string;
}

// Update the createBlog function
export const createBlog = async (userId: number, blogData: CreateBlogData): Promise<Blog> => {
  try {
    const response = await axiosInstance.post<Blog>(`Blog/CreateBlog/${userId}`, blogData);
    return response.data;
  } catch (error) {
    console.error(`Error creating blog for user ID: ${userId}`, error);
    throw error;
  }
};

// Update a blog
export const updateBlog = async (userId: number, updatedData: Partial<Blog>): Promise<Blog> => {
  try {
    const response = await axiosInstance.put<Blog>(`Blog/UpdateFBlog/${userId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating blog for user ID: ${userId}`, error);
    throw error;
  }
};

// Delete a blog
export const deleteBlogbyId = async (blogId: number): Promise<void> => {
  try {
    await axiosInstance.delete(`Blog/DeleteBlog/${blogId}`);
  } catch (error) {
    console.error(`Error deleting blog for user ID: ${blogId}`, error);
    throw error;
  }
};

//Approve a blog
export const approveBlog = async (blogId: number): Promise<void> => {
  try {
    await axiosInstance.put(`Blog/ApproveBlog/${blogId}`);
  } catch (error) {
    console.error(`Error approving blog for user ID: ${blogId}`, error);
    throw error;
  }
};

// Thêm hàm này vào cuối file
export const getBlogById = async (id: string): Promise<Blog | null> => {
  try {
    const allBlogs = await getAllBlogs();
    const blog = allBlogs.find(blog => blog.id === parseInt(id));
    return blog || null;
  } catch (error) {
    console.error(`Error fetching blog with id ${id}:`, error);
    throw error;
  }
};

// Add this function at the end of the file
export const getCustomerMap = async (): Promise<Map<number, string>> => {
  try {
    const customers: any[] = await getAllCustomer();
    const customerMap = new Map<number, string>();
    customers.forEach(customer => {
      customerMap.set(customer.id, customer.username);
    });
    return customerMap;
  } catch (error) {
    console.error("Error creating customer map", error);
    throw error;
  }
};
