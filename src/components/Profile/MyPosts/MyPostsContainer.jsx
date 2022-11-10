import MyPosts from './MyPosts';
import {actions} from './../../../redux/profile-reducer';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
    }
}

const MyPostsContainer = connect(mapStateToProps, {addPost: actions.addPost})(MyPosts);

export default MyPostsContainer;