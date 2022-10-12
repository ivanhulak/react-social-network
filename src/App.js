import React from "react";
import styles from './App.module.css';
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Navbar from "./components/Navbar/Navbar";
import ProfileContainer from "./components/Profile/ProfileContainer";
import UsersContainer from "./components/Users/UsersContainer";
import LoginPage from "./components/Login/LoginPage.jsx";
import { Routes, Route } from 'react-router-dom';


const App = (props) => {
  return (
    <div className={styles.Container}>
      <div className={styles.wrapper}>
        <HeaderContainer />
        <Navbar />
        <div className={styles.wrapperContent}>
          <Routes>
            <Route path="/profile" element={<ProfileContainer />} />
            <Route path="/profile/:userId" element={<ProfileContainer />} />
            <Route path="/dialogs" element={<DialogsContainer />} />
            <Route path="/users" element={<UsersContainer />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;