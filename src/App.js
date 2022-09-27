import React from "react";
import styles from './App.module.css';
import Dialogs from "./components/Dialogs/Dialogs";
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
            <Route path="/profile" element={<Profile profilePage={props.state.profilePage} dispatch={props.dispatch} />} />
            <Route path="/dialogs" element={<Dialogs dialogsPageData={props.state.dialogsPageData} dispatch={props.dispatch}/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;