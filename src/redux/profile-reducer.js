import {ProfileAPI} from '../DAL/api';

export const ADD_POST = 'ADD_POST';
export const UPDATE_POST_TEXT = 'UPDATE_POST_TEXT';
export const SET_USER_PROFILE = 'SET_USER_PROFILE';

let initialState = {
    posts: [
        { id: 1, postText: 'Hello! It is Ivan Hulak!', likes: 20, comments: 2, photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
        { id: 2, postText: 'New Post', likes: 12, comments: 1, photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
        { id: 3, postText: 'React app', likes: 1, comments: 5, photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
    ],
    newPostText: '',
    profile: null,
}

const profileReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_POST:
            let newPost = {
                id: 5,
                postText: state.newPostText,
                likes: 20,
                comments: 2,
                photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png'
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: '',
            }
        case UPDATE_POST_TEXT:
            return {...state, newPostText: action.postText}
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
        default: 
            return state;
    }
}

export const addPost = () => ({type: ADD_POST});
export const updatePostText = (postText) => ({type: UPDATE_POST_TEXT, postText});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});

export const SetProfileThunkCreator = (userId) => (dispatch) => {
    ProfileAPI.getProfile(userId).then(data => {
        dispatch(setUserProfile(data));
      })
}

export default profileReducer;