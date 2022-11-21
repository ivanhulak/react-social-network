import React from "react";
import Post from './Post/Post';
import MyPostsForm from "./MyPostsForm";
import styles from './MyPosts.module.css'
import { PostsType } from '../../../types/types';

type PropsType = {
    posts: Array<PostsType>
    addPost: (postText: string) => void
}
export type MyPostsFormDataValuesType = {
    postText: string
}
const MyPosts: React.FC<PropsType> = React.memo(({posts, addPost}) => {

    const postsElements = posts
        .map(p => <Post postText={p.postText} likesCount={p.likes}
            comments={p.comments} photo={p.photo} key={p.id} />)

    const onAddPost = (formData: MyPostsFormDataValuesType) => {
        addPost(formData.postText);
        formData.postText = '';
    }
    return (
        <div className={styles.myPosts}>
            <h1>My Posts</h1>
            <MyPostsForm onSubmit={onAddPost} />
            {postsElements}
        </div>
    );
})

export default MyPosts;