import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { GamesContext } from "../context/GamesContext";
import GameCard from "../components/GameCard";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader";
import NotFound from "../custom/notFound";
import Nlikes from "../custom/likes";
function Library() {
  const { user, isLoggedIn, loading: authLoading } = useContext(AuthContext);
  const { Games, loading: gamesLoading, error } = useContext(GamesContext);
  const navigate = useNavigate();

  if (authLoading || gamesLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="page-container text-center">
        <Alert variant="danger">
          You must be logged in to view your library.
        </Alert>
        <Button variant="primary" onClick={() => navigate("/signin")}>
          Go to Sign In
        </Button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <NotFound />
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }

  const likedGames = Games.filter((game) => user.likes?.includes(game.id));

  return (
    <div className="page-container">
      {likedGames.length === 0 ? (
        <div
          className="mt-5 d-flex justify-content-center align-items-center  "
          style={{ height: "500px", width: "80%", margin: "0 auto" }}
        >
          <Nlikes />
          <h2 style={{ marginLeft: "40px" }}>
            you don't have any favorite games
          </h2>
        </div>
      ) : (
        <div
          className="row "
          style={{ height: "auto", width: "95%", margin: "0 auto" }}
        >
          {likedGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Library;
