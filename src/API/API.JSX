import axios from "axios";

const BASE_URL = "http://localhost:3000";

// Get all games
export const getGames = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/games`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get a single game by ID
export const getGameById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/games/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add a new game
export const addGame = async (game) => {
  try {
    const response = await axios.post(`${BASE_URL}/games`, game, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update a game
export const updateGame = async (id, updatedGame) => {
  try {
    const response = await axios.put(`${BASE_URL}/games/${id}`, updatedGame, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a game
export const deleteGame = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/games/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
