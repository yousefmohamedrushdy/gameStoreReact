import React, { useState, useEffect } from "react";
import styles from "../css/gameRating.module.css";

function GameRating({ rating }) {
  const [stars, setStars] = useState([]);

  const generateStars = () => {
    let starsArray = [];
    let validRating = Math.min(Math.max(rating, 0), 5);
    for (let i = 0; i < validRating; i++) {
      starsArray.push(i);
    }
    return starsArray;
  };

  useEffect(() => {
    setStars(generateStars());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.rating}>
      {stars.map((star, index) => (
        <i key={index} className="bi bi-star-fill"></i>
      ))}
    </div>
  );
}

export default GameRating;
