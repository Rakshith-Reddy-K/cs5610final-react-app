import axios from "axios";
const API_BASE = "https://cs5610-final-56af3c7859e7.herokuapp.com";
const USERS_URL = `${API_BASE}/users`;
const FOLLOWS_URL = `${API_BASE}/follows`;

export const getUserById= async(userId) => {
    const response = await axios.get(`${USERS_URL}/${userId}`);
    console.log(response)
    return response.data;
}

export const updateUser = async(user) => {
    const response = await axios.put(`${USERS_URL}/${user.id}`,user)
    return response.data
}

export const getFollowersCount = async(sellerId) => {
    const response = await axios.get(`${FOLLOWS_URL}?sellerId=${sellerId}`)
    return response.data
}

export const getFollowingCount = async(userId) => {
    const response = await axios.get(`${FOLLOWS_URL}?userId=${userId}`)
    return response.data
}

export const getFollow = async(userId,sellerId) => {
    const response = await axios.get(`${FOLLOWS_URL}/${userId}/${sellerId}`)
    return response.data
}
export const createFollow = async(userId,sellerId) => {
    const response = await axios.post(`${FOLLOWS_URL}`,{userId: userId, sellerId: sellerId})
    return response.data
}

export const deleteFollow = async(followId) => {
    const response = await axios.delete(`${FOLLOWS_URL}/${followId}`)
    return response.data
}



