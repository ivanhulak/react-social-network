import React from "react";
import MyPosts from './MyPosts';
import {addPostAC, updatePostTextAC} from './../../../redux/profile-reducer';
import StoreContext from "../../../StoreContext";

const MyPostsContainer = (props) => {

    return <StoreContext.Consumer>
        { store => {
            let state = store.getState().profilePage;

            const addPost = () => {
                store.dispatch(addPostAC());
            }
            const postChanged = (text) => {
                store.dispatch(updatePostTextAC(text));
            }
            return (
                <MyPosts newPostText={state.newPostText}
                         addPost={addPost}
                         updatePostText={postChanged}
                         posts={state.posts}/>
                );
            }
        }
    </StoreContext.Consumer>
}

export default MyPostsContainer;