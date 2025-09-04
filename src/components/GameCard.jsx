import React, { useContext, useState } from "react";
import styles from "../css/gameCard.module.css";
import GameRating from "./gameRating";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { updateUser } from "../API/usersApi";
import AutoDismissAlert from "../custom/alert";

function GameCard({ game }) {
  const navigate = useNavigate();
  const { user, refreshUser } = useContext(AuthContext);
  const [alert, setAlert] = useState({ message: "", variant: "success" });

  if (!game) return null;

  const handleNavigate = () => navigate(`/game/${game.id}`);

  const handleFavorite = async (e) => {
    e.stopPropagation();
    if (!user) return;

    try {
      const updatedLikes = user.likes?.map(String) || [];
      const gameId = String(game.id);
      if (updatedLikes.includes(gameId)) {
        const index = updatedLikes.indexOf(gameId);
        updatedLikes.splice(index, 1);
      } else {
        updatedLikes.push(gameId);
      }

      await updateUser(user.id, { ...user, likes: updatedLikes });
      await refreshUser();
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  const userOwnsGame = user?.order?.map(String).includes(String(game.id));

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (!user) {
      setAlert({
        message: "Please log in to add items to cart.",
        variant: "danger",
      });
      return;
    }

    if (userOwnsGame) {
      setAlert({ message: "You already own this game.", variant: "info" });
      return;
    }

    try {
      const updatedCart = user.cart?.map(String) || [];
      const gameId = String(game.id);

      if (!updatedCart.includes(gameId)) {
        updatedCart.push(gameId);
        await updateUser(user.id, { ...user, cart: updatedCart });
        await refreshUser();

        setAlert({
          message: `${game.title} added to cart!`,
          variant: "success",
        });
      } else {
        setAlert({
          message: `${game.title} is already in your cart.`,
          variant: "warning",
        });
      }
    } catch (error) {
      console.error("Error updating cart:", error);
      setAlert({
        message: "Something went wrong. Try again.",
        variant: "danger",
      });
    }
  };

  return (
    <>
      <AutoDismissAlert
        message={alert.message}
        variant={alert.variant}
        duration={3000}
        onClose={() => setAlert({ message: "", variant: "success" })}
      />

      <div className="col-xl-3 col-lg-4 col-md-6">
        <div className={styles.gameCard} onClick={handleNavigate}>
          <img src={game.img} alt={game.title} className="img-fluid" />

          <button className={styles.favorite} onClick={handleFavorite}>
            {user?.likes?.map(String).includes(String(game.id)) ? (
              <i className="bi bi-heart-fill text-danger"></i>
            ) : (
              <i className="bi bi-heart"></i>
            )}
          </button>

          <div className={styles.gameFeature}>
            <span className={styles.category}>{game.category}</span>
            <GameRating rating={game.rating} />
          </div>

          <div className={`${styles.gameTitle} mt-4 mb-3`}>{game.title}</div>

          <div className={styles.gamePrice}>
            {game.discount !== 0 && (
              <>
                <span className={styles.discount}>
                  <i>{game.discount * 100}%</i>
                </span>
                <span className={styles.prevPrice}>
                  ${game.price.toFixed(2)}
                </span>
              </>
            )}
            <span className={styles.currentPrice}>
              ${(game.price * (1 - game.discount)).toFixed(2)}
            </span>
          </div>

          {userOwnsGame ? (
            <span className={`${styles.ownedBadge} text-success`}>
              <i className="bi bi-check-circle-fill"></i> Owned
            </span>
          ) : (
            <button className={styles.addBag} onClick={handleAddToCart}>
              <i className="bi bi-bag-plus-fill"></i>
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default GameCard;
