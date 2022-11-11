import React from "react";
import styles from './Post.module.css';

type PropsType = {
    photo: string
    postText: string
    likesCount: number
    comments: number
}
const Post: React.FC<PropsType> = ({photo, likesCount, postText, comments}) => {
    return (
        <div className={styles.post}>
            <div className={styles.postRow}>
                <img src={photo} alt="ava"/>
                <div className={styles.postText}>{postText}</div>
            </div>
            <div>
                <p>like {likesCount}</p>
                <p>comment {comments}</p>
            </div>
        </div>
    );
}

export default Post;