import MyPosts from './MyPosts';
import {actions} from './../../../redux/profile-reducer';
import {connect} from 'react-redux';
import { AppStateType } from '../../../redux/redux-store';
import { PostsType } from '../../../types/types';


type MapStateToPropsType = {
    posts: Array<PostsType>
}
type MapDispatchToPropsType = {
    addPost: (postText: string) => void
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        posts: state.profilePage.posts,
    }
}

const MyPostsContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, 
    {addPost: actions.addPost})(MyPosts);

export default MyPostsContainer;