import MyPosts from './MyPosts';
import {addPost, updatePostText} from './../../../redux/profile-reducer';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {
        newPostText: state.profilePage.newPostText,
        posts: state.profilePage.posts,
    }
}

const MyPostsContainer = connect(mapStateToProps, {addPost, updatePostText})(MyPosts);

export default MyPostsContainer;