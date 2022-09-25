import React from "react";
import styles from './MyPosts.module.css'
import Post from './Post/Post';

const MyPosts = (props) => {

    const postsElements = props.posts
        .map(p => <Post postText={p.postText} 
                        likesCount={p.likes} 
                        comments={p.comments} 
                        photo={p.photo} 
                        key={p.id}/>)

    let postMessage = React.createRef();

    const onAddPost = () => {
        let text = postMessage.current.value;
        props.addPost(text);
        props.updatePostText('')
    }

    const onPostChange = () => {
        let text = postMessage.current.value;
        props.updatePostText(text);
    }

    return (
        <div className={styles.myPosts}>
            <h1>My Posts</h1>
            <textarea ref={postMessage} 
                      onChange={onPostChange}
                      value={props.newPostText}/>
            <div>
                <button onClick={onAddPost}>Add post</button>
            </div>
            {postsElements}
        </div>
    );
}

export default MyPosts;