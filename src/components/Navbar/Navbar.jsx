import React from "react";
import styles from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import { Friends } from "./Friends";

const Navbar = () => {
  const navLinkStyles = ({isActive}) => {
        return {
          color: isActive ? 'rgb(136, 109, 245)' : `#000`,
          fontWeight: isActive ? '700' : "400",
        }
      }
  return (
    <nav className={styles.navBar}>
      <NavLink to='/profile' style={navLinkStyles}>Profile</NavLink>
      <NavLink to='/dialogs' style={navLinkStyles}>Messages</NavLink>
      <NavLink to='/users' style={navLinkStyles}>Users</NavLink>
      <NavLink to='/settings' style={navLinkStyles}>Settings</NavLink>
      <div className={styles.friendsTitle}>Friends</div>
      <Friends/>
    </nav>
  );
}

export default Navbar;