import React from "react";
import Post from './Post/Post';
import MyPostsForm from "./MyPostsForm";
import styles from './MyPosts.module.css'

const MyPosts = React.memo((props) => {

    const postsElements = props.posts
        .map(p => <Post postText={p.postText} likesCount={p.likes}
            comments={p.comments} photo={p.photo} key={p.id} />)

    const onAddPost = (formData) => {
        console.log(formData);
        props.addPost(formData.postText);
    }
    console.log('Render')
    return (
        <div className={styles.myPosts}>
            <h1>My Posts</h1>
            <MyPostsForm onSubmit={onAddPost} />
            {postsElements}
        </div>
    );
})

export default MyPosts;