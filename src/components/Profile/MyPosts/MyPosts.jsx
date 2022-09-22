import React from "react";
import styles from './MyPosts.module.css'

const MyPosts = () => {
    return (
        <div className={styles.myPosts}>
            <h1>My Posts</h1>
            <textarea></textarea>
            <div>
                <button>Post</button>
            </div>
        </div>
    );
}

export default MyPosts;