import React from "react";
import styles from './ProfileInfo.module.css';


const ProfileInfo = () => {
  return (
    <div className={styles.profileInfo}>
      <img src="https://thumbs.dreamstime.com/b/sunny-beach-beautiful-tropical-island-paradise-middle-sea-39398691.jpg" alt="Sunny Beach" />
      <div className={styles.profileInfoRow}>
        <div className={styles.avatar}></div>
        <div className={styles.info}>
          <p>Name</p>
          <p>Surname</p>
          <p>Age</p>
          <p>Hobby</p>
          <p>Status</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;