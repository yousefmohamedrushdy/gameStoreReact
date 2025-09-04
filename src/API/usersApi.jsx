import axios from "axios";

const BASE_URL = "http://localhost:3000/user";

// Register new user
export const registerUser = async (userData) => {
  try {
    const defaultUserData = {
      ...userData,
      role: "user",
      likes: [],
      cart: [],
      order: [],
      userImg: "/user/default.png",
    };

    const response = await axios.post(BASE_URL, defaultUserData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "Registration failed");
  }
};

// Login user
export const loginUser = async (email, password) => {
  try {
    const response = await axios.get(BASE_URL);
    const users = response.data;

    const user = users.find((u) => u.email === email);
    if (!user) throw new Error("Email not found");
    if (user.password !== password) throw new Error("Incorrect password");

    return user;
  } catch (err) {
    throw new Error(err.message || "Login failed");
  }
};

export const getUsers = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const getUserById = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const updateUser = async (id, updatedData) => {
  const response = await axios.put(`${BASE_URL}/${id}`, updatedData);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
