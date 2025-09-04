import React from "react";
import { Link } from "react-router-dom";
import styles from "../css/footer.module.css"; // CSS Module

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container text-center">
        <h3 className={`mb-3 ${styles.logo}`}>LOOTBOX</h3>

        {/* Internal Links using React Router */}
        <div className="mb-3">
          <Link to="/contact" className={`text-decoration-none ${styles.link}`}>
            Contact Us
          </Link>
          <Link to="/about" className={`text-decoration-none ${styles.link}`}>
            About
          </Link>
          <Link to="/terms" className={`text-decoration-none ${styles.link}`}>
            Terms
          </Link>
        </div>

        {/* External Social Media Links */}
        <div className="mb-3">
          <a
            href="https://www.facebook.com"
            className={styles.social}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-facebook"></i>
          </a>
          <a
            href="https://twitter.com"
            className={styles.social}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-twitter"></i>
          </a>
          <a
            href="https://www.instagram.com"
            className={styles.social}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-instagram"></i>
          </a>
        </div>

        <p className={styles.bottomText}>
          © 2025 LOOTBOX. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
