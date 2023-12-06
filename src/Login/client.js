import axios from "axios";
export const BASE_API = process.env.REACT_APP_STORE_API_BASE;

export const Signin = async (username, password) => {
  const response = await axios.post(`${BASE_API}/login`, { "username": username, "password": password });
  return response.data;
};
