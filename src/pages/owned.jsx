import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { GamesContext } from "../context/GamesContext";
import GameCard from "../components/GameCard";
import AutoDismissAlert from "../custom/alert";

function OwnedGames() {
  const { user } = useContext(AuthContext);
  const { Games, loading, error } = useContext(GamesContext);
  const [ownedGames, setOwnedGames] = useState([]);
  const [alert, setAlert] = useState({ message: "", variant: "success" });

  useEffect(() => {
    if (user && Games.length) {
      const owned = Games.filter((game) =>
        user.order?.map(String).includes(String(game.id))
      );
      setOwnedGames(owned);
    }
  }, [user, Games]);

  if (loading) return <div className="text-center m-5">Loading...</div>;
  if (error)
    return <div className="alert alert-danger m-5">Error: {error}</div>;
  if (!user)
    return (
      <div className="text-center m-5">Please log in to view your library.</div>
    );

  return (
    <div className="page-container mt-5">
      <AutoDismissAlert
        message={alert.message}
        variant={alert.variant}
        duration={3000}
        onClose={() => setAlert({ message: "", variant: "success" })}
      />

      <h2 className="m-5">Owned Games</h2>

      {ownedGames.length === 0 ? (
        <p className="m-5">You don’t own any games yet.</p>
      ) : (
        <div
          className="m-5 row"
          style={{ height: "auto", width: "95%", margin: "0 auto" }}
        >
          {ownedGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
}

export default OwnedGames;
