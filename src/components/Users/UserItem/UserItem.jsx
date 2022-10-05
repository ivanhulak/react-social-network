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
          {/* <div>Looking for a job: {props.lookingForJob ? <span>yes</span> : <span>no</span>}</div> */}
        </div>
        <div className={styles.ItemStatus}>{props.status}</div>
        <div>
          {props.followed
            ? <button onClick={() => {
              axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${props.userId}`, {
                withCredentials: true,
                headers: { 'API-KEY': '9c002004-137b-4963-a140-b7463730abeb' }
              }).then(response => {
                if (response.data.resultCode === 0) {
                  props.unfollow(props.userId)
                } else {
                  alert(response.data.messages[0])
                }
              })
            }}>Unfollow</button>

            : <button onClick={() => {
              axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${props.userId}`, {}, {
                withCredentials: true,
                headers: { 'API-KEY': '9c002004-137b-4963-a140-b7463730abeb' }
              }).then(response => {
                if (response.data.resultCode === 0) {
                  props.follow(props.userId)
                } else {
                  alert(response.data.messages[0])
                }
              })
            }}>Follow</button>
          }
        </div>
      </div>
    </div>
  );
}

export default UserItem;