import React from "react";
import Preloader from "../../../common/Preloader";
import styles from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = (props) => {

  if (!props.profile) {
    return <Preloader />
  }
  const onAvatarPhotoSelected = (e) => {
    if(e.target.files.length){
      props.uploadPhoto(e.target.files[0]); 
    }
  }
  return (
    <div className={styles.profileInfo}>
      <img src="https://thumbs.dreamstime.com/b/sunny-beach-beautiful-tropical-island-paradise-middle-sea-39398691.jpg" alt="" />
      <div className={styles.profileInfoRow}>
        <div>
          <div className={styles.avatar}>
            <img src={props.profile.photos.small || "https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png"} alt="" />
          </div>
          {props.isOwner && <input type="file" onChange={onAvatarPhotoSelected} />}
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