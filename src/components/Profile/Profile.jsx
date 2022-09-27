import React from "react";
import MyPosts from "./MyPosts/MyPosts";
import styles from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";


const Profile = (props) => {
  debugger
  return (
    <div className={styles.profile}>
        <ProfileInfo/>
        <MyPosts posts={props.profilePage.posts}
                 newPostText={props.profilePage.newPostText}
                 dispatch={props.dispatch}/>
    </div>
  );
}

export default Profile;