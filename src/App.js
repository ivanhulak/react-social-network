import React from "react";
import styles from './App.module.css';
import Dialogs from "./components/Dialogs/Dialogs";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {

  const ProfilePageData = {
    posts: [
      { id: 1, postText: 'Hello! It is Ivan Hulak!', likes: 20, comments: 2, photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
      { id: 2, postText: 'New Post', likes: 12, comments: 1, photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
      { id: 3, postText: 'React app', likes: 1, comments: 5, photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
    ]
  }

  const DialogsPageData = {
    dialogs: [
      { id: 1, name: 'Kristina', photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
      { id: 2, name: 'Kevin', photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
      { id: 3, name: 'Travis', photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
      { id: 4, name: 'Andrew', photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
      { id: 5, name: 'Sveta', photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
    ],
    messages: [
      { id: 1, message: 'Hello!' },
      { id: 2, message: 'How are you doing?' },
      { id: 3, message: 'magic?' },
      { id: 4, message: 'Hello!' },
      { id: 5, message: 'Yo' },
    ],
  }



  return (
    <BrowserRouter>
      <div className={styles.Container}>
        <div className={styles.wrapper}>
          <Header />
          <Navbar />
          <div className={styles.wrapperContent}>
            <Routes>
              <Route path="/profile" element={<Profile posts={ProfilePageData}/>} />
              <Route path="/dialogs" element={<Dialogs dialogs={DialogsPageData} />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;