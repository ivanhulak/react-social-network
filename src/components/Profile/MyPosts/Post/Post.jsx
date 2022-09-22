import React from "react";
import styles from './Post.module.css';

const Post = (props) => {
    return (
        <div className={styles.post}>
            <div className={styles.postRow}>
                <img src={props.photo} alt="ava"/>
                <div className={styles.postText}>{props.postText}</div>
            </div>
            <div>
                <p>like {props.likesCount}</p>
                <p>comment {props.comments}</p>
            </div>
        </div>
    );
}

export default Post;