import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../css/sideMenu.module.css";
import { SiRedcandlegames } from "react-icons/si";
import { IoClose } from "react-icons/io5";

function SideMenu({ active, onClose }) {
  const menuItems = [
    { path: "/", icon: "bi-house-door", label: "Home" },
    { path: "/categories", icon: "bi-window-stack", label: "Categories" },
    { path: "/library", icon: "bi-heart", label: "My Library" },
    { path: "/bag", icon: "bi-bag", label: "My Bag" },
    { path: "/contact", icon: "bi-people", label: "Contact us" },
    { path: "/owned", icon: "bi-archive", label: "My Owned" },
  ];

  return (
    <div className={`${styles.sideMenu} ${active ? styles.active : ""}`}>
      <button className={styles.closeBtn} onClick={onClose}>
        <IoClose />
      </button>

      <a onClick={onClose} href="/" className={styles.logo}>
        <i>
          <SiRedcandlegames />
        </i>
        <span className={styles.brand}>LootBox</span>
      </a>

      <ul className={styles.nav}>
        {menuItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.activeLink}` : styles.link
              }
            >
              <i className={`bi ${item.icon}`}></i>
              <span className={styles.label}>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <ul className={styles.contact}>
        <li>
          <a href="https://www.facebook.com">
            <i className="bi bi-meta"></i>
          </a>
        </li>
        <li>
          <a href="https://www.twitter.com">
            <i className="bi bi-twitter-x"></i>
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com">
            <i className="bi bi-instagram"></i>
          </a>
        </li>
        <li>
          <a className={styles.email} href="mailto:info@LootBox.com">
            <i className="bi bi-envelope-at"></i>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default SideMenu;
