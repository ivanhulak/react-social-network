import MyPosts from './MyPosts';
import {addPostAC, updatePostTextAC} from './../../../redux/profile-reducer';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {
        newPostText: state.profilePage.newPostText,
        posts: state.profilePage.posts,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addPost: () => {
            dispatch(addPostAC());
        },
        updatePostText: (text) => {
            dispatch(updatePostTextAC(text));
        },
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);
export default MyPostsContainer;