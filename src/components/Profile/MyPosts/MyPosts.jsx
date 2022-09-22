import React from "react";
import styles from './MyPosts.module.css'
import Post from './Post/Post';

const MyPosts = (props) => {

    const postsElements = props.posts.posts
        .map(p => <Post postText={p.postText} 
                        likesCount={p.likes} 
                        comments={p.comments} 
                        photo={p.photo} 
                        key={p.id}/>)

    return (
        <div className={styles.myPosts}>
            <h1>My Posts</h1>
            <textarea></textarea>
            <div>
                <button>Add post</button>
            </div>
            {postsElements}
        </div>
    );
}

export default MyPosts;