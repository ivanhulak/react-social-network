import React from "react";
import MyPosts from "./MyPosts/MyPosts";
import Post from "./MyPosts/Posts/Post";
import styles from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";


const Profile = () => {
  return (
    <div className={styles.profile}>
        <img src="https://thumbs.dreamstime.com/b/sunny-beach-beautiful-tropical-island-paradise-middle-sea-39398691.jpg" alt="Sunny Beach" />
        <ProfileInfo/>
        <MyPosts/>
        <Post/>
    </div>
  );
}

export default Profile;