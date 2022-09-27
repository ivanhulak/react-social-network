import React from "react";
import styles from './MyPosts.module.css'
import Post from './Post/Post';
import {addPostAC, updatePostTextAC} from './../../../redux/profile-reducer';

const MyPosts = (props) => {
    
    const postsElements = props.posts
        .map(p => <Post postText={p.postText} 
                        likesCount={p.likes} 
                        comments={p.comments} 
                        photo={p.photo} 
                        key={p.id}/>)

    const onAddPost = () => {
        props.dispatch(addPostAC());
        props.dispatch(updatePostTextAC(''));
    }

    const onPostChange = (e) => {
        let text = e.target.value;
        props.dispatch(updatePostTextAC(text));
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