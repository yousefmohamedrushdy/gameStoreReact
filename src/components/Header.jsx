import React, { useState, useContext } from "react";
import Menu from "../custom/menu";
import { FaHeart } from "react-icons/fa";
import { RiShoppingBag4Fill } from "react-icons/ri";
import DefaultImg from "../assets/logo.png";
import styles from "../css/Header.module.css";
import Title from "../custom/title";
import Profile from "./Profile";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Loader from "../components/loader";

function Header({ toggle }) {
  const [showProfile, setShowProfile] = useState(false);
  const { user, isLoggedIn, loading } = useContext(AuthContext);

  const handleCloseProfile = () => setShowProfile(false);
  const handleShowProfile = () => setShowProfile(true);

  if (loading) return <Loader />;

  return (
    <>
      <header
        className={`d-flex justify-content-between align-items-center ${styles.header}`}
      >
        <div className={styles.menu} onClick={toggle}>
          <Menu />
        </div>

        <Link className={styles.title} to="/">
          <Title />
        </Link>

        <div className={`d-flex align-items-center gap-3 ${styles.userItems}`}>
          <Link to="/library" className={styles.icon}>
            <FaHeart />
            <span className={`${styles.badge} ${styles.like}`}>
              {user?.likes?.length || 0}
            </span>
          </Link>

          <Link className={styles.icon} to="/bag">
            <RiShoppingBag4Fill />
            <span className={`${styles.badge} ${styles.bag}`}>
              {user?.cart?.length || 0}
            </span>
          </Link>

          <div className={styles.profile}>
            {isLoggedIn && user ? (
              <button
                className={styles.profileButton}
                onClick={handleShowProfile}
              >
                <img
                  src={user.userImg || DefaultImg}
                  alt={user.firstName}
                  className={styles.avatar}
                />
                <div
                  className={`d-none d-md-flex flex-column ${styles.userText}`}
                >
                  <span className={styles.userName}>
                    {user.firstName} {user.lastName}
                  </span>
                  <span className={styles.viewProfile}>View Profile</span>
                </div>
              </button>
            ) : (
              <Link to="/signin" className={styles.signInLink}>
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>

      {isLoggedIn && user && (
        <Profile show={showProfile} handleClose={handleCloseProfile} />
      )}
    </>
  );
}

export default Header;
