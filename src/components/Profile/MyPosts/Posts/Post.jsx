import React from "react";
import styles from './Post.module.css';

const Post = () => {
    return (
        <div className={styles.post}>
            <div className={styles.postRow}>
                <img src="https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png" />
                <div className={styles.postText}>post</div>
            </div>
            <div>
                like
                comment
            </div>

        </div>
    );
}

export default Post;