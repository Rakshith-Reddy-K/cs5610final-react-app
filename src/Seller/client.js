import axios from "axios";
export const API_BASE = process.env.REACT_APP_STORE_API_BASE;
export const deleteProduct = async (productId) => {
  console.log("deleteProduct", productId);
  const response = await axios.delete(`${API_BASE}/products/${productId}`);
  return response.data;
};
