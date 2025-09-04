// src/context/GamesContext.js
import { createContext, useState, useEffect } from "react";
import { getGames } from "../API/API.JSX";

// eslint-disable-next-line react-refresh/only-export-components
export const GamesContext = createContext();

export const GamesProvider = ({ children }) => {
  const [Games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await getGames();
        setGames(data);
      } catch (err) {
        setError(err.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  return (
    <GamesContext.Provider value={{ Games, loading, error }}>
      {children}
    </GamesContext.Provider>
  );
};
