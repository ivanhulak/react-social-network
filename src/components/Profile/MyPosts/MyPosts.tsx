import React from "react";
import Post from './Post/Post';
import MyPostsForm from "./MyPostsForm";
import styles from './MyPosts.module.css'
import { useSelector } from "react-redux";
import { AppStateType } from "../../../redux/redux-store";
import { useDispatch } from "react-redux";
import { actions } from "../../../redux/profile-reducer";

export type MyPostsFormDataValuesType = {
    postText: string
}
const MyPosts: React.FC = React.memo(() => {
    const posts = useSelector((state: AppStateType) => state.profilePage.posts)
    const dispatch: any = useDispatch()

    const postsElements = posts
        .map(p => <Post postText={p.postText} likesCount={p.likes}
            comments={p.comments} photo={p.photo} key={p.id} />)

    const onAddPost = (formData: MyPostsFormDataValuesType) => {
        dispatch(actions.addPost(formData.postText));
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