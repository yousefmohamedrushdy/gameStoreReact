import React, { useContext, useState } from "react";
import { GamesContext } from "../context/GamesContext";
import Loader from "../components/loader";
import Alert from "react-bootstrap/Alert";
import GameCard from "../components/GameCard";
import styles from "../css/Categories.module.css";

function Categories() {
  const { Games, loading, error } = useContext(GamesContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  if (loading) return <Loader />;
  if (error) return <Alert variant="danger">Error: {error}</Alert>;
  if (!Games || Games.length === 0)
    return <Alert variant="warning">No games available</Alert>;

  // Unique categories
  const categories = [
    ...new Set(Games.map((game) => game.category || "Uncategorized")),
  ];

  // Filtering logic
  const filteredGames = Games.filter((game) => {
    const matchesSearch = game?.title
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory
      ? game?.category === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mt-5 page-container">
      <h2 className="mb-4 text-white">Game Categories</h2>

      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder=" "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.input}
            />
            <label className={styles.label}>Search by game name...</label>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className={styles.inputGroup}>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={styles.input}
            >
              <option value="">All Categories</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <label className={styles.label}>Filter by category</label>
          </div>
        </div>
      </div>

      {/* Games Grid */}
      <div className="row">
        {filteredGames.length > 0 ? (
          filteredGames.map((game) => <GameCard key={game.id} game={game} />)
        ) : (
          <p className="text-white">No games found.</p>
        )}
      </div>
    </div>
  );
}

export default Categories;
