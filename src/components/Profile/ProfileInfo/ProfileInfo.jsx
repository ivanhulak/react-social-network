import React from "react";
import Preloader from "../../../common/Preloader";
import styles from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = (props) => {

  if (!props.profile) {
    return <Preloader />
  }

  return (
    <div className={styles.profileInfo}>
      <img src="https://thumbs.dreamstime.com/b/sunny-beach-beautiful-tropical-island-paradise-middle-sea-39398691.jpg" alt="Sunny Beach" />
      <div className={styles.profileInfoRow}>
        <div className={styles.avatar}>
          <img src={props.profile.photos ? "https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png" : props.profile.photos.small} alt="Avatar" />
        </div>
        <div className={styles.info}>
          <p>{props.profile.fullName}</p>
          <p>Surname</p>
          <p>Age</p>
          <p>Hobby</p>
          <p>{props.profile.aboutMe}</p>
        </div>
      </div>
      <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
    </div>
  );
}

export default ProfileInfo;