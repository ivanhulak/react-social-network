import React from "react";
import styles from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import { Friends } from "./Friends";
import { AppStateType } from '../../redux/redux-store'
import { useSelector } from "react-redux";

const Navbar: React.FC = () => {
  const isAuth: boolean = useSelector((state: AppStateType) => state.auth.isAuth)
  const navLinkStyles = ({ isActive }: any) => {
    return {
      color: isActive ? '#886DF5' : `#000`,
      fontWeight: isActive ? '700' : "400",
    }
  }
  return (
    <nav className={styles.navBar}>
      {isAuth && <>
        <NavLink to='/profile' style={navLinkStyles}>Profile</NavLink>
        <NavLink to='/dialogs' style={navLinkStyles}>Messages</NavLink></>
      }
      <NavLink to='/users' style={navLinkStyles}>Users</NavLink>
      <NavLink to='/chat' style={navLinkStyles}>Chat</NavLink>
      <NavLink to='/settings' style={navLinkStyles}>Settings</NavLink>
      <NavLink to='/shop' style={navLinkStyles}>Shop</NavLink>
      <div className={styles.friendsTitle}>Friends</div>
      <Friends />
    </nav>
  );
}

export default Navbar;