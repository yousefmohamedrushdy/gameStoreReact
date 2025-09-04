import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { updateUser } from "../API/usersApi";
import AutoDismissAlert from "../custom/alert";

function GameSlide({ game, swiperRef }) {
  const [videoActive, setVideoActive] = useState(false);
  const [alertData, setAlertData] = useState({
    message: "",
    variant: "success",
  });

  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const handleVideoBtn = (e) => {
    e.stopPropagation();
    setVideoActive((prev) => {
      const newState = !prev;
      if (swiperRef.current) {
        if (newState) swiperRef.current.autoplay.stop();
        else swiperRef.current.autoplay.start();
      }
      return newState;
    });
  };

  const handleOrder = async (e) => {
    e.stopPropagation();

    if (!user) {
      setAlertData({
        message: "⚠️ Please sign in to order.",
        variant: "warning",
      });
      return;
    }

    const gameId = String(game.id);

    // Check if the game is already owned
    const ownsGame = user.order?.map(String).includes(gameId);
    if (ownsGame) {
      setAlertData({
        message: "You already own this game!",
        variant: "info",
      });
      return;
    }

    try {
      // Normalize all IDs to strings
      const existingCart = user.cart?.map(String) || [];

      if (existingCart.includes(gameId)) {
        setAlertData({
          message: "⚠️ This game is already in your cart!",
          variant: "warning",
        });
        return;
      }

      const updatedCart = [...existingCart, gameId];
      const updatedUser = { ...user, cart: updatedCart };

      const savedUser = await updateUser(user.id, updatedUser);

      setUser(savedUser);
      localStorage.setItem("authUser", JSON.stringify(savedUser));

      setAlertData({
        message: `✅ ${game.title} added to your cart!`,
        variant: "success",
      });
    } catch (err) {
      console.error("Order failed:", err.message);
      setAlertData({
        message: "❌ Failed to add to cart. Try again.",
        variant: "danger",
      });
    }
  };

  const handleNavigate = () => {
    navigate(`/game/${game.id}`);
  };

  return (
    <div className="game-slide" onClick={handleNavigate}>
      <AutoDismissAlert
        message={alertData.message}
        variant={alertData.variant}
        duration={3000}
        onClose={() => setAlertData({ message: "", variant: "success" })}
      />

      <img src={game.img} alt={game.title} />

      <div className={`video ${videoActive ? "active" : ""}`}>
        <iframe
          width="100%"
          height="100%"
          src={game.trailer}
          title={game.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>

      <div className="content">
        <h2>{game.title}</h2>
        <p>{game.description}</p>

        <div className="buttons">
          <button className="btn btn-primary orderBtn" onClick={handleOrder}>
            Order Now
          </button>
          <button
            className={`btn btn-secondary playBtn ${
              videoActive ? "active" : ""
            }`}
            onClick={handleVideoBtn}
          >
            <span className="pause">
              <i className="bi bi-pause-fill"></i>
            </span>
            <span className="play">
              <i className="bi bi-play-fill"></i>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameSlide;
