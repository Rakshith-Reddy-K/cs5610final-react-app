import axios from "axios";
export const BASE_API = process.env.REACT_APP_STORE_API_BASE;

export const Signup = async (username, password) => {
  const response = await axios.post(`${BASE_API}/signup`, { "username": username, "password": password, email:"email", "phone":mobilenum, isBuyer: "isBuyer" });
  return response.data;
};
