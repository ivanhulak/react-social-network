import React from "react";
import styles from './UserItem.module.css';
import userPhoto from './../../../assets/images/userPhoto.png'
import { Link } from "react-router-dom";

const UserItem = (props) => {
  return (
    <div className={styles.userItem}>
      <div className={styles.userItemInner}>
        <div className={styles.itemImage}>
          <Link to={'/profile/' + props.userId}>
            <img src={props.userPhoto ? props.userPhoto : userPhoto} alt="User Avatar" />
          </Link>
        </div>
        <div className={styles.itemInfo}>
          <div>Name: {props.userName}</div>
          {/* <div>Looking for a job: {props.lookingForJob ? <span>yes</span> : <span>no</span>}</div> */}
        </div>
        <div className={styles.ItemStatus}>{props.status}</div>
        <div>
          {props.followed
            ? <button onClick={() => { props.unfollow(props.userId) }}>Unfollow</button>
            : <button onClick={() => { props.follow(props.userId) }}>Follow</button>
          }
        </div>
      </div>
    </div>
  );
}

export default UserItem;