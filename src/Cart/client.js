import axios from "axios";
const API_BASE = process.env.REACT_APP_STORE_API_BASE;

export const UpdateCart = async (userId, productId) => {
  const response = await axios.post(`${API_BASE}/cart`, { user_id: userId, product_id: productId });
  return response.data;
};
export const RemoveFromCart = async (id) => {
  const response = await axios.delete(`${API_BASE}/cart/${id}`);
  return response.data;
};
