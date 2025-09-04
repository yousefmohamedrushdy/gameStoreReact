import React from "react";
import styles from "../css/Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </span>
      <div className={styles.base}>
        <span></span>
        <div className={styles.face}></div>
      </div>
      <div className={styles.longfazers}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Loader;
