import React from "react";
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
        <a className={styles.item} href="#">Profile</a>
        <a className={styles.item} href="#">Messages</a>
        <a className={styles.item} href="#">Users</a>
        <a className={styles.item} href="#">Settings</a>
    </nav>
  );
}

export default Navbar;