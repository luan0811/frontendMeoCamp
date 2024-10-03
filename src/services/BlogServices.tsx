import axios from 'axios';

// Define the API URL from environment variables or a hardcoded URL
const API_BE_URL = process.env.REACT_APP_API_BE_URL; // Ensure you've set this in .env

// Define types for your blog data
interface Blog {
  id: number;
  title: string;
  content: string;
  image: string;
  postDate: string;
  authorId: number;
  // Add other relevant blog fields
}

// Fetch all blogs
export const getAllBlogs = async (): Promise<Blog[]> => {
  try {
    const response = await axios.get<Blog[]>(`${API_BE_URL}Blog/getAllBlogs`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all blogs", error);
    throw error;
  }
};

// Fetch blogs by user ID
export const getBlogByUserId = async (userId: number): Promise<Blog[]> => {
  try {
    const response = await axios.get<Blog[]>(`${API_BE_URL}Blog/getBlogbyuserId/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching blog for user ID: ${userId}`, error);
    throw error;
  }
};

// Create a new blog
export const createBlog = async (userId: number, blogData: Omit<Blog, 'id'>): Promise<Blog> => {
  try {
    const response = await axios.post<Blog>(`${API_BE_URL}Blog/CreateBlog/${userId}`, blogData);
    return response.data;
  } catch (error) {
    console.error(`Error creating blog for user ID: ${userId}`, error);
    throw error;
  }
};

// Update a blog
export const updateBlog = async (userId: number, updatedData: Partial<Blog>): Promise<Blog> => {
  try {
    const response = await axios.put<Blog>(`${API_BE_URL}Blog/UpdateFBlog/${userId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating blog for user ID: ${userId}`, error);
    throw error;
  }
};

// Delete a blog
export const deleteBlog = async (userId: number): Promise<void> => {
  try {
    await axios.delete(`${API_BE_URL}Blog/DeleteBlog/${userId}`);
  } catch (error) {
    console.error(`Error deleting blog for user ID: ${userId}`, error);
    throw error;
  }
};
