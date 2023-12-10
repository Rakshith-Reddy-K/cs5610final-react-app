import axios from "axios";
const API_BASE = process.env.REACT_APP_STORE_API_BASE;
const PRODUCT_URL = `${API_BASE}/products`;


export const createComment = async (productId, comment, user_id) => {
  const response = await axios.post(`${PRODUCT_URL}/${productId}/comments`, {"comment": comment, "user_id": user_id });
  return response.data;
};

export const findCommentsForProduct = async (productId) => {
  const response = await axios.get(`${PRODUCT_URL}/${productId}/comments`);
  return response.data;
};

export const getAllUsers = async () => {
  const response = await axios.get(`${API_BASE}/users`);
  return response.data;
}

export const getUserById= async (userId) => {
  const response = await axios.get(`${API_BASE}/users/${userId}`);
  return response.data;
}

export const deleteUser = async (userId) => {
  const response = await axios.delete(`${API_BASE}/users/${userId}`);
  return response.data;
};
