import React from "react";
import styles from './App.module.css';
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import { Routes, Route } from 'react-router-dom';


const App = (props) => {
  return (
    <div className={styles.Container}>
      <div className={styles.wrapper}>
        <Header />
        <Navbar />
        <div className={styles.wrapperContent}>
          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/dialogs" element={<DialogsContainer />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;