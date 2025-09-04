import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  getUsers,
  deleteUser,
  updateUser,
  registerUser,
} from "../API/usersApi";
import { getGames, addGame, updateGame, deleteGame } from "../API/API.JSX";
import styles from "../css/Admin.module.css";
import Loader from "../components/loader";

const defaultUserData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  role: "user",
  likes: [],
  cart: [],
  order: [],
  userImg: "/user/default.png",
};

const defaultGameData = {
  title: "",
  description: "",
  level: "",
  category: "",
  rating: 0,
  discount: 0,
  price: 0,
  img: "/games/default.jpg",
  trailer: "",
  comments: [],
};

function Admin() {
  const { user, isLoggedIn, loading } = useContext(AuthContext);
  const [authorized, setAuthorized] = useState(false);
  const [users, setUsers] = useState([]);
  const [games, setGames] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  const [userModal, setUserModal] = useState(false);
  const [gameModal, setGameModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editingGame, setEditingGame] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (!loading) {
      const isAdmin = isLoggedIn && user?.role === "admin";
      setAuthorized(isAdmin);
      if (isAdmin) fetchData();
    }
  }, [user, isLoggedIn, loading]);

  const fetchData = async () => {
    setLoadingData(true);
    try {
      const usersData = await getUsers();
      const gamesData = await getGames();
      setUsers(usersData);
      setGames(gamesData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure to delete this user?")) {
      await deleteUser(id);
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  const handleDeleteGame = async (id) => {
    if (window.confirm("Are you sure to delete this game?")) {
      await deleteGame(id);
      setGames(games.filter((g) => g.id !== id));
    }
  };

  const openUserModal = (user = null) => {
    setEditingUser(user);
    setFormData(user || { ...defaultUserData });
    setUserModal(true);
  };

  const openGameModal = (game = null) => {
    setEditingGame(game);
    setFormData(game || { ...defaultGameData });
    setGameModal(true);
  };

  const handleUserSubmit = async () => {
    try {
      const payload = {
        ...formData,
        name: `${formData.firstName} ${formData.lastName}`,
      };

      if (editingUser) {
        const updated = await updateUser(editingUser.id, payload);
        setUsers(users.map((u) => (u.id === updated.id ? updated : u)));
      } else {
        const newUser = await registerUser(payload);
        setUsers([...users, newUser]);
      }
      setUserModal(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGameSubmit = async () => {
    try {
      if (editingGame) {
        const updated = await updateGame(editingGame.id, formData);
        setGames(games.map((g) => (g.id === updated.id ? updated : g)));
      } else {
        const newGame = await addGame(formData);
        setGames([...games, newGame]);
      }
      setGameModal(false);
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading || loadingData)
    return (
      <div className={styles.loading}>
        <Loader />
      </div>
    );

  if (!authorized)
    return (
      <div className={styles.unauthorized}>
        <h2>Unauthorized</h2>
        <p>You do not have permission to access this page.</p>
      </div>
    );

  return (
    <div className={`${styles.container} page-container`}>
      <h1 className={styles.title}>Admin panel</h1>
      <p className={styles.welcome}>
        Welcome ! {user.firstName} {user.lastName}
      </p>

      {/* Users Section */}
      <section className={styles.section}>
        <h2>Users</h2>
        <div className={styles.cardGrid}>
          {users.map((u) => (
            <div key={u.id} className={styles.card}>
              <img src={u.userImg || "/user/default.png"} alt={u.name} />
              <h3>
                {u.firstName} {u.lastName}
              </h3>
              <p>Email: {u.email}</p>
              <p>Role: {u.role}</p>
              <div className={styles.cardActions}>
                <button
                  className={`${styles.btn} ${styles.btnEdit}`}
                  onClick={() => openUserModal(u)}
                >
                  Edit
                </button>
                <button
                  className={`${styles.btn} ${styles.btnDelete}`}
                  onClick={() => handleDeleteUser(u.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          <div className={styles.cardAdd} onClick={() => openUserModal()}>
            + Add User
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section className={styles.section}>
        <h2>Games</h2>
        <div className={styles.cardGrid}>
          {games.map((g) => (
            <div key={g.id} className={styles.card}>
              <img src={g.img || "/games/default.jpg"} alt={g.title} />
              <h3>{g.title}</h3>
              <p>{g.description}</p>
              <p>Level: {g.level}</p>
              <p>Category: {g.category}</p>
              <p>Rating: {g.rating}/5</p>
              <p>
                Price: ${g.price}{" "}
                {g.discount > 0 && `(Discount: ${g.discount * 100}%)`}
              </p>
              <div className={styles.cardActions}>
                <button
                  className={`${styles.btn} ${styles.btnEdit}`}
                  onClick={() => openGameModal(g)}
                >
                  Edit
                </button>
                <button
                  className={`${styles.btn} ${styles.btnDelete}`}
                  onClick={() => handleDeleteGame(g.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          <div className={styles.cardAdd} onClick={() => openGameModal()}>
            + Add Game
          </div>
        </div>
      </section>

      {/* Modal */}
      {(userModal || gameModal) && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>{editingUser || editingGame ? "Edit" : "Add"}</h3>

            <div className={styles.modalForm}>
              {userModal && (
                <>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className={styles.input}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className={styles.input}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={styles.input}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className={styles.input}
                  />
                  <select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    className={styles.input}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  <input
                    type="text"
                    placeholder="User Image URL"
                    value={formData.userImg}
                    onChange={(e) =>
                      setFormData({ ...formData, userImg: e.target.value })
                    }
                    className={styles.input}
                  />
                </>
              )}

              {gameModal && (
                <>
                  <input
                    type="text"
                    placeholder="Title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className={styles.input}
                  />
                  <textarea
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className={styles.input}
                  />
                  <input
                    type="text"
                    placeholder="Level"
                    value={formData.level}
                    onChange={(e) =>
                      setFormData({ ...formData, level: e.target.value })
                    }
                    className={styles.input}
                  />
                  <input
                    type="text"
                    placeholder="Category"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className={styles.input}
                  />
                  <input
                    type="number"
                    placeholder="Rating"
                    min="0"
                    max="5"
                    value={formData.rating}
                    onChange={(e) =>
                      setFormData({ ...formData, rating: e.target.value })
                    }
                    className={styles.input}
                  />
                  <input
                    type="number"
                    placeholder="Discount"
                    min="0"
                    max="1"
                    step="0.01"
                    value={formData.discount}
                    onChange={(e) =>
                      setFormData({ ...formData, discount: e.target.value })
                    }
                    className={styles.input}
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className={styles.input}
                  />
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={formData.img}
                    onChange={(e) =>
                      setFormData({ ...formData, img: e.target.value })
                    }
                    className={styles.input}
                  />
                  <input
                    type="text"
                    placeholder="Trailer URL"
                    value={formData.trailer}
                    onChange={(e) =>
                      setFormData({ ...formData, trailer: e.target.value })
                    }
                    className={styles.input}
                  />
                </>
              )}
            </div>

            <div className={styles.modalActions}>
              <button
                className={`${styles.btn} ${styles.btnEdit}`}
                onClick={userModal ? handleUserSubmit : handleGameSubmit}
              >
                Save
              </button>
              <button
                className={`${styles.btn} ${styles.btnDelete}`}
                onClick={() => {
                  setUserModal(false);
                  setGameModal(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
