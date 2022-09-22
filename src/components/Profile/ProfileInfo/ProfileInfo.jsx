import React from "react";
import styles from './ProfileInfo.module.css';


const ProfileInfo = () => {
  return (
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
  );
}

export default ProfileInfo;