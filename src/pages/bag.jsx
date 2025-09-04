import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { GamesContext } from "../context/GamesContext";
import { updateUser } from "../API/usersApi";
import Loader from "../components/loader";
import NotFound from "../custom/notFound";
import Eye from "../custom/eye";
import AutoDismissAlert from "../custom/alert";
import styles from "../css/bag.module.css";
import Button from "react-bootstrap/Button";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";

function Bag() {
  const navigate = useNavigate();
  const {
    user,
    isLoggedIn,
    loading: authLoading,
    setUser,
  } = useContext(AuthContext);
  const { Games, loading: gamesLoading, error } = useContext(GamesContext);
  const [removingId, setRemovingId] = useState(null);
  const [alertMsg, setAlertMsg] = useState("");

  if (authLoading || gamesLoading) return <Loader />;

  if (!isLoggedIn) {
    return (
      <div className="page-container text-center" style={{ marginTop: "50px" }}>
        <Alert variant="danger">
          You must be logged in to view your library.
        </Alert>
        <Button variant="primary" onClick={() => navigate("/signin")}>
          Go to Sign In
        </Button>
        <NotFound />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <NotFound />
        <div className="text-danger">{error}</div>
      </div>
    );
  }

  const CartGames = Games.filter((game) => user.cart?.includes(game.id));
  const totalPrice = CartGames.reduce(
    (acc, game) => acc + game.price * (1 - (game.discount || 0)),
    0
  );

  const handleRemove = async (gameId) => {
    setRemovingId(gameId);
    try {
      const updatedCart = user.cart.filter((id) => id !== gameId);
      await updateUser(user.id, { ...user, cart: updatedCart });
      setUser({ ...user, cart: updatedCart });
    } catch (err) {
      console.error(err);
    } finally {
      setRemovingId(null);
    }
  };

  const handleCheckout = async () => {
    if (!CartGames.length) return;

    const newOrder = CartGames.map((game) => game.id);

    try {
      const updatedUser = {
        ...user,
        cart: [],
        order: [...(user.order || []), ...newOrder],
      };
      await updateUser(user.id, updatedUser);
      setUser(updatedUser);
      setAlertMsg("Checkout successful!");
    } catch (err) {
      console.error(err);
      setAlertMsg("Checkout failed. Try again.");
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.title}>
        <h2>My Cart</h2>
      </div>

      {CartGames.length === 0 ? (
        <div className={styles.emptyCart}>
          <div className={styles.eyeScale}>
            <Eye />
          </div>

          <h2>Cart is empty</h2>
        </div>
      ) : (
        <>
          {/* Table */}
          <div className={`${styles.cartCard} ${styles.tableResponsive}`}>
            <table className={styles.cartTable}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Price ($)</th>
                  <th>Discount (%)</th>
                  <th>Total ($)</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {CartGames.map((game, idx) => {
                  const discount = game.discount || 0;
                  const total = (game.price * (1 - discount)).toFixed(2);
                  return (
                    <tr key={game.id}>
                      <td>{idx + 1}</td>
                      <td>{game.title}</td>
                      <td>{game.price.toFixed(2)}</td>
                      <td>{discount * 100}%</td>
                      <td>{total}</td>
                      <td>
                        <button
                          className={styles.removeBtn}
                          onClick={() => handleRemove(game.id)}
                          disabled={removingId === game.id}
                          style={{ zIndex: 10, position: "relative" }}
                        >
                          <i className="bi bi-trash3-fill"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Checkout card */}
          <div className={styles.checkoutCard}>
            <div>Total Items: {CartGames.length}</div>
            <div>Total Price: ${totalPrice.toFixed(2)}</div>
            <Button className={styles.checkoutButton} onClick={handleCheckout}>
              Check Out <MdOutlineShoppingCartCheckout />
            </Button>
          </div>
        </>
      )}

      {alertMsg && (
        <AutoDismissAlert message={alertMsg} onClose={() => setAlertMsg("")} />
      )}
    </div>
  );
}

export default Bag;
