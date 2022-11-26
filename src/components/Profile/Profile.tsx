import React from "react";
import { useSelector } from "react-redux";
import { AppStateType } from "../../redux/redux-store";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import styles from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";

export type PropsType = {
  isOwner: boolean
}
const Profile: React.FC<PropsType> = (props) => {

  const profile = useSelector((state: AppStateType) => state.profilePage.profile)

  return (
    <div className={styles.profile}>
        <ProfileInfo profile={profile} isOwner={props.isOwner}/>
        <MyPostsContainer />
    </div>
  );
}

export default Profile;