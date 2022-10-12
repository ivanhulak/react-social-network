import React from "react";
import Post from './Post/Post';
import styles from './MyPosts.module.css'

const MyPosts = (props) => {
    const postsElements = props.posts
                .map(p => <Post postText={p.postText} likesCount={p.likes} 
                    comments={p.comments} photo={p.photo} key={p.id}/>)

    const onAddPost = () => {
        props.addPost();
    }

    const onPostChange = (e) => {
        let text = e.target.value;
        props.updatePostText(text);
    }

    return (
        <div className={styles.myPosts}>
            <h1>My Posts</h1>
            <textarea onChange={onPostChange}
                      value={props.newPostText}/>
            <div>
                <button onClick={onAddPost}>Add post</button>
            </div>
            {postsElements}
        </div>
    );
}

export default MyPosts;