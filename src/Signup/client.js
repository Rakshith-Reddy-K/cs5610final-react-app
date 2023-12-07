import axios from "axios";
export const BASE_API = process.env.REACT_APP_STORE_API_BASE;

export const Signup = async (username, name, password, email, mobilenum, isBuyer, description) => {
  let response;
  if (!isBuyer) {
    response = await axios.post(`${BASE_API}/registerseller`, { "username": username, "name": name,  "password": password, "email":email, "mobilenum":mobilenum, "description": description});
  }
  else{
      response = await axios.post(`${BASE_API}/register`, { "username": username, "password": password, "email":email, "mobilenum":mobilenum });
  }
  return response.data;
};
