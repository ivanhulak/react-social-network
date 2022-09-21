import React from "react";
import styles from './Header.module.css';
import logo from './../../images/logo_SN.jpg'

const Header = () => {
  return (
    <header className={styles.header}>
        <img src={logo} alt="Logotype" />
    </header>
  );
}

export default Header;