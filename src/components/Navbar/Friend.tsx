import React from 'react';
import { Link } from 'react-router-dom';
import { FriendType } from './Friends';
import styles from './Friends.module.css';

export const Friend: React.FC<FriendType> = ({ id, name, photos }) => {
   return (
      <Link to={`/profile/${id}`} className={styles.friendsBlock}>
         <div className={styles.friendImage}>
            <img src={photos.small || photos.large || 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png'} alt="User Avatar" />
         </div>
         <div className={styles.friendName}>{name}</div>
      </Link>
   )
}