import React from "react";
import MyPosts from "./MyPosts/MyPosts";
import Post from "./MyPosts/Posts/Post";
import styles from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";


const Profile = () => {
  return (
    <div className={styles.profile}>
        <ProfileInfo/>
        <MyPosts/>
        <Post/>
    </div>
  );
}

export default Profile;