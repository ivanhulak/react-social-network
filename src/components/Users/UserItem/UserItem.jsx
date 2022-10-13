import React from "react";
import styles from './UserItem.module.css';
import userPhoto from './../../../assets/images/userPhoto.png'
import { Link } from "react-router-dom";
import * as axios from 'axios';

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
        </div>
        <div className={styles.ItemStatus}>{props.status}</div>
        <div>
          {props.followed
            ? <button disabled={props.followingInProgress.some(id => id === props.userId)}
              onClick={() => {
                props.setIsFetching(true);
                props.setFollowingInProgress(true, props.userId);
                axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${props.userId}`, {
                  withCredentials: true,
                  headers: {
                    'API-KEY': '0f7ca0a1-1142-4ef6-a871-38727982b107'
                  }
                }).then(response => {
                    if (response.data.resultCode === 0) {
                      props.unfollowSuccess(props.userId)
                    }
                    props.setIsFetching(false);
                    props.setFollowingInProgress(false, props.userId);
                  })
              }}>Unfollow</button>
            : <button disabled={props.followingInProgress.some(id => id === props.userId)}
              onClick={() => {
                props.setIsFetching(true);
                props.setFollowingInProgress(true, props.userId);
                axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${props.userId}`, {}, {
                  withCredentials: true,
                  headers: {
                    'API-KEY': '0f7ca0a1-1142-4ef6-a871-38727982b107'
                  }
                }).then(response => {
                    if (response.data.resultCode === 0) {
                      props.followSuccess(props.userId)
                    }
                    props.setIsFetching(false);
                    props.setFollowingInProgress(false, props.userId);
                  })
              }}>Follow</button>
          }
        </div>
      </div>
    </div>
  );
}

export default UserItem;