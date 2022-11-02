import React from "react";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import styles from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
  return (
    <div className={styles.profile}>
        <ProfileInfo profile={props.profile} status={props.status} isOwner={props.isOwner}
              updateStatus={props.updateStatus} uploadPhoto={props.uploadPhoto} upgradeProfile={props.upgradeProfile}
              loadDataToProfileDataForm={props.loadDataToProfileDataForm}/>
        <MyPostsContainer />
    </div>
  );
}

export default Profile;