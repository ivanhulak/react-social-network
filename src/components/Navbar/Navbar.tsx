import React from "react";
import { NavLink } from 'react-router-dom';
import { Friends } from "./FriendsBlock/Friends";
import { AppStateType } from '../../redux/redux-store'
import { useSelector } from "react-redux";
import styled from "styled-components";

const StyledNavbar = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 22px;
  padding: 20px 10px;
  background-color: rgb(227, 227, 227);
  grid-area: nav;
`;
const FriendsTitle = styled.div`
  
  font-weight: 700;
  color: #886DF5;
`;
const navLinkStyles = ({ isActive }: any) => {
  return {
    color: isActive ? '#886DF5' : `#000`,
    fontWeight: isActive ? '700' : "400",
  }
}

const Navbar: React.FC = () => {
  const isAuth: boolean = useSelector((state: AppStateType) => state.auth.isAuth)
  return (
    <StyledNavbar>
      {isAuth && <>
        <NavLink to='/profile' style={navLinkStyles}>Profile</NavLink>
        <NavLink to='/dialogs' style={navLinkStyles}>Messages</NavLink>
        <NavLink to='/chat' style={navLinkStyles}>Chat</NavLink>
      </>}
      <NavLink to='/users' style={navLinkStyles}>Users</NavLink>
      <NavLink to='/settings' style={navLinkStyles}>Settings</NavLink>
      <NavLink to='/shop' style={navLinkStyles}>Shop</NavLink>
      {isAuth && <>
        <FriendsTitle>Friends</FriendsTitle>
        <Friends />
      </>}
    </StyledNavbar>
  );
}

export default Navbar;