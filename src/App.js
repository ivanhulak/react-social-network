import React from "react";
import styles from './App.module.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";

const App = () => {
  return (
    <div className={styles.Container}>
      <div className={styles.wrapper}>
        <Header />
        <Navbar />
        <Profile />
      </div>
    </div>
  );
}

export default App;