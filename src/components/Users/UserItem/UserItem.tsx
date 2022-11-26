import React from "react";
import styles from './UserItem.module.css';
import userPhoto from './../../../assets/images/userPhoto.png'
import { Link } from "react-router-dom";

type PropsType = {
  userId: number
  userPhoto: string | null
  userName: string
  followed: boolean
  followingInProgress: Array<number>
  follow: (userId: number) => void
  unfollow: (userId: number) => void
}
export const UserItem: React.FC<PropsType> = (props) => {
  return (
    <div className={styles.userItem}>
      <div className={styles.itemImage}>
        <Link to={'/profile/' + props.userId}>
          <img src={props.userPhoto ? props.userPhoto : userPhoto} alt="User Avatar" />
        </Link>
      </div>
      <div className={styles.itemInfo}>
        <div>{props.userName}</div>
      </div>
      <div>
        {props.followed
          ? <button disabled={props.followingInProgress.some(id => id === props.userId)} className={styles.followBtn}
            onClick={() => { props.unfollow(props.userId) }}>Unfollow</button>
          : <button disabled={props.followingInProgress.some(id => id === props.userId)} className={styles.followBtn}
            onClick={() => { props.follow(props.userId) }}>Follow</button>
        }
      </div>
    </div>
  );
}
