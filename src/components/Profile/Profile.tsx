import React from "react";
import { ProfileType } from "../../types/types";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import styles from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";

export type ProfileInfoPropsType = {
  profile: ProfileType | null
  status: string
  isOwner: boolean
  updateStatus: (status: string) => void
  uploadPhoto: (photo: File) => void
  upgradeProfile: (formData: ProfileType) => void
  loadDataToProfileDataForm: (profile: ProfileType) => void
}

const Profile: React.FC<ProfileInfoPropsType> = (props) => {
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