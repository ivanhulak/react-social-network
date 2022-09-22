import React from "react";
import styles from './Navbar.module.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {

  const navLinkStyles = ({isActive}) => {
    return {
      color: isActive ? 'rgb(136, 109, 245)' : `#000`,
      fontWeight: isActive ? '700' : "400",
    }
  }

  return (
    <nav>
      <div className={styles.item}>
        <NavLink to='/profile' style={navLinkStyles}>Profile</NavLink>
      </div>
      <div className={styles.item}>
        <NavLink to='/dialogs' style={navLinkStyles}>Messages</NavLink>
      </div>
      <div className={styles.item}>
        <NavLink to='/users' style={navLinkStyles}>Users</NavLink>
      </div>
      <div className={styles.item}>
        <NavLink to='/settings' style={navLinkStyles}>Settings</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;