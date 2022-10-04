import React from "react";
import styles from './App.module.css';
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import ProfileContainer from "./components/Profile/ProfileContainer";
import UsersContainer from "./components/Users/UsersContainer";
import { Routes, Route } from 'react-router-dom';


const App = (props) => {
  return (
    <div className={styles.Container}>
      <div className={styles.wrapper}>
        <Header />
        <Navbar />
        <div className={styles.wrapperContent}>
          <Routes>
            <Route path="/profile" element={<ProfileContainer />} />
            <Route path="/profile/:userId" element={<ProfileContainer />} />
            <Route path="/dialogs" element={<DialogsContainer />} />
            <Route path="/users" element={<UsersContainer />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;