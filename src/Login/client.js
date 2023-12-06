import axios from "axios";
export const BASE_API = process.env.REACT_APP_STORE_API_BASE;

export const Signin = async (username, password) => {
  const response = await axios.post(`${BASE_API}/login`, { "username": username, "password": password });
  return response.data;
};

export const getUserByUsername = async (username) => {
  try {
    const response = await axios.get(`${BASE_API}/userid`, {
      params: { username: username }
    });
    return response.data;
  } catch (error) {
    console.error('Error retrieving user by username', error);
    throw error;
  }
};