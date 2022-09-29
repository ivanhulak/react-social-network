import React from "react";
import styles from './UserItem.module.css';

const UserItem = (props) => {
  return (
    <div className={styles.userItem}>
      <div className={styles.userItemInner}>
        <div className={styles.itemImage}><img src={props.userPhoto} alt="User Avatar" /></div>
        <div className={styles.itemInfo}>
          <div>Name: {props.userName}</div>
          <div>Surname: {props.userSurname}</div>
          <div>Age: {props.userAge}</div>
          <div>Looking for a job: {props.lookingForJob ? <span>yes</span> : <span>no</span>}</div>
        </div>
        <div className={styles.ItemStatus}>status</div>
        <div>
          { props.followed
          ? <button onClick={ () => {props.unfollow(props.userId)} }>Unfollow</button>
          : <button onClick={ () => {props.follow(props.userId)} }>Follow</button>
          }
        </div>
      </div>
    </div>
  );
}

export default UserItem;