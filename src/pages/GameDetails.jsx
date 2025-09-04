/* eslint-disable no-unused-vars */
import { useParams, Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { GamesContext } from "../context/GamesContext.jsx";
import Loader from "../components/loader.jsx";
import styles from "../css/gameDetails.module.css";
import Badge from "react-bootstrap/Badge";
import GameRating from "../components/gameRating.jsx";
import { AuthContext } from "../context/AuthContext";
import { updateUser } from "../API/usersApi";
import AutoDismissAlert from "../custom/alert";
import { updateGame } from "../API/API.JSX";

function GameDetails() {
  const { id } = useParams();
  const { Games, loading, error } = useContext(GamesContext);
  const { user, refreshUser } = useContext(AuthContext);
  const [game, setGame] = useState(null);
  const [videoActive, setVideoActive] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [alert, setAlert] = useState({ message: "", variant: "success" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && Games.length) {
      const foundGame = Games.find((g) => String(g.id) === id);
      if (foundGame) {
        setGame(foundGame);
        setComments(
          foundGame.comments?.map((text, index) => ({
            id: index,
            text,
          })) || []
        );
      }
    }
  }, [loading, Games, id]);

  if (loading) return <Loader />;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;
  if (!game)
    return (
      <div className="container text-center mt-5 page-container">
        <h2>Game not found</h2>
        <Link to="/" className="btn btn-primary mt-3">
          Back to Home
        </Link>
      </div>
    );

  const handleVideoBtn = (e) => {
    e.stopPropagation();
    setVideoActive((prev) => !prev);
  };

  const userOwnsGame = user?.order?.map(String).includes(String(game.id));

  const handleAddToCart = async () => {
    if (!user) {
      setAlert({
        message: "Please log in to add items to cart.",
        variant: "danger",
      });
      return;
    }

    if (userOwnsGame) {
      setAlert({
        message: "You already own this game.",
        variant: "info",
      });
      return;
    }

    try {
      const existingCart = user.cart?.map(String) || [];
      const gameId = String(game.id);

      if (!existingCart.includes(gameId)) {
        const updatedCart = [...existingCart, gameId];
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

  const handleDeleteOwnedGame = async () => {
    if (!userOwnsGame) return;

    try {
      const updatedOrder = user.order.filter(
        (id) => String(id) !== String(game.id)
      );
      const updatedUser = { ...user, order: updatedOrder };

      await updateUser(user.id, updatedUser);
      await refreshUser();

      setAlert({
        message: `${game.title} removed from your library.`,
        variant: "success",
      });
    } catch (err) {
      console.error("Failed to remove game:", err);
      setAlert({
        message: "Failed to remove the game. Try again.",
        variant: "danger",
      });
    }
  };

  const handleFavorite = async () => {
    if (!user) return;

    try {
      const updatedLikes = user.likes?.map(String) || [];
      const gameId = String(game.id);

      if (updatedLikes.includes(gameId)) {
        const filtered = updatedLikes.filter((id) => id !== gameId);
        await updateUser(user.id, { ...user, likes: filtered });
      } else {
        updatedLikes.push(gameId);
        await updateUser(user.id, { ...user, likes: updatedLikes });
      }
      await refreshUser();
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  const handleAddComment = async () => {
    if (!commentInput.trim()) return;
    const newComment = { id: Date.now(), text: commentInput };
    const updatedComments = [newComment, ...comments];

    setSaving(true);
    try {
      await updateGame(game.id, {
        ...game,
        comments: updatedComments.map((c) => c.text),
      });
      setComments(updatedComments);
      setCommentInput("");
    } catch (err) {
      console.error("Failed to add comment:", err);
    }
    setSaving(false);
  };

  const handleDeleteComment = async (commentId) => {
    const updatedComments = comments.filter((c) => c.id !== commentId);
    setSaving(true);
    try {
      await updateGame(game.id, {
        ...game,
        comments: updatedComments.map((c) => c.text),
      });
      setComments(updatedComments);
    } catch (err) {
      console.error("Failed to delete comment:", err);
    }
    setSaving(false);
  };

  return (
    <section className={`${styles.detailsPage} page-container`}>
      <AutoDismissAlert
        message={alert.message}
        variant={alert.variant}
        duration={3000}
        onClose={() => setAlert({ message: "", variant: "success" })}
      />

      <div className="container mt-5">
        <div className="row g-4">
          {/* Game Image / Video */}
          <div className="col-lg-7 position-relative">
            <div className={styles.gameFrame}>
              <img src={game.img} alt={game.title} className={styles.gameImg} />
              <div
                className={`${styles.video} ${
                  videoActive ? styles.active : ""
                }`}
              >
                <iframe
                  src={game.trailer}
                  title={game.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              <button className={styles.playBtn} onClick={handleVideoBtn}>
                {!videoActive ? (
                  <i className="bi bi-play-fill"></i>
                ) : (
                  <i className="bi bi-pause-fill"></i>
                )}
              </button>
            </div>
          </div>

          {/* Game Info */}
          <div className="col-lg-5 d-flex flex-column justify-content-center">
            <h1 className={styles.title}>
              {game.title} <GameRating rating={game.rating} />
            </h1>
            <p className={styles.category}>
              <Badge bg="info">{game.category}</Badge> • Level: {game.level}
            </p>
            <p className={styles.description}>{game.description}</p>

            <div className={styles.priceBox}>
              {game.discount !== 0 && (
                <>
                  <span className={styles.discountBadge}>
                    {game.discount * 100}%
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

            <div className="mt-4 d-flex gap-2 align-items-center">
              {userOwnsGame ? (
                <>
                  <span className={`${styles.ownedBadge} text-success`}>
                    <i className="bi bi-check-circle-fill"></i> You own this
                    game
                  </span>
                  <button
                    className={`${styles.deleteOwnedBtn} btn btn-outline-danger`}
                    onClick={handleDeleteOwnedGame}
                  >
                    <i className="bi bi-trash-fill"></i> Remove
                  </button>
                </>
              ) : (
                <button className={styles.buyBtn} onClick={handleAddToCart}>
                  <i className="bi bi-bag-plus-fill"></i> Add to Cart
                </button>
              )}

              <button className={styles.favoriteBtn} onClick={handleFavorite}>
                {user?.likes?.map(String).includes(String(game.id)) ? (
                  <i className="bi bi-heart-fill text-danger"></i>
                ) : (
                  <i className="bi bi-heart"></i>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="row mt-5">
          <div className="col-12">
            <div className={styles.commentsSection}>
              <h4 className={styles.commentsTitle}>Comments</h4>

              <div className={styles.commentInputBox}>
                <textarea
                  className={styles.commentTextarea}
                  placeholder="Write your comment..."
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                />
                <button
                  className={styles.commentBtn}
                  onClick={handleAddComment}
                >
                  Add Comment
                </button>
              </div>

              <div>
                {comments.length === 0 ? (
                  <p className={styles.noComments}>No comments yet.</p>
                ) : (
                  comments.map((c) => (
                    <div key={c.id} className={styles.commentItem}>
                      <div className={styles.commentAvatar}>user</div>
                      <div className={styles.commentText}>{c.text}</div>
                      <button
                        className={styles.deleteCommentBtn}
                        onClick={() => handleDeleteComment(c.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GameDetails;
