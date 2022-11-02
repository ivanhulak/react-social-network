import { profileAPI } from '../DAL/api';

export const ADD_POST = 'my-social-network/profile/ADD_POST';
export const DELETE_POST = 'my-social-network/profile/DELETE_POST';
export const SET_USER_PROFILE = 'my-social-network/profile/SET_USER_PROFILE';
export const SET_STATUS = 'my-social-network/profile/SET_STATUS';
export const UPLOAD_PHOTO_SUCCESS = 'my-social-network/profile/UPLOAD_PHOTO_SUCCESS';
export const UPGRADE_PROFILE_SUCCESS = 'my-social-network/profile/UPGRADE_PROFILE_SUCCESS';
export const LOAD = 'my-social-network/profile/LOAD';

let initialState = {
    posts: [
        { id: 1, postText: 'Hello! It is Ivan Hulak!', likes: 20, comments: 2, photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
        { id: 2, postText: 'New Post', likes: 12, comments: 1, photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
        { id: 3, postText: 'React app', likes: 1, comments: 5, photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
    ],
    profile: null,
    status: ''
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                postText: action.newPostText,
                likes: 20,
                comments: 2,
                photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png'
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
            }
        case DELETE_POST:
            return {
                ...state, posts: state.posts.filter(post => post.id !== action.postId)
            }
        case SET_USER_PROFILE:
            return { ...state, profile: action.profile }
        case SET_STATUS:
            return { ...state, status: action.status }
        case UPLOAD_PHOTO_SUCCESS:
            return { ...state, profile: { ...state.profile, photos: action.photos } }
        case LOAD:
            return { ...state, profile: { ...state.profile, profile: action.data } }
        default:
            return state;
    }
}
// Action creators
export const addPost = (newPostText) => ({ type: ADD_POST, newPostText });
export const deletePost = (postId) => ({ type: DELETE_POST, postId }); // for testing
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setStatus = (status) => ({ type: SET_STATUS, status });
export const uploadPhotoSuccess = (photos) => ({ type: UPLOAD_PHOTO_SUCCESS, photos });
export const loadDataToProfileDataForm = (data) => ({ type: LOAD, data });

// Thunk Creators
export const setProfile = (userId) => async (dispatch) => {
    let data = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(data));
}
export const getStatus = (userId) => async (dispatch) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(setStatus(data));
}
export const updateStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}
export const uploadPhoto = (file) => async (dispatch) => {
    let response = await profileAPI.uploadPhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(uploadPhotoSuccess(response.data.data.photos));
    }
}
export const upgradeProfile = (profileData) => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    let response = await profileAPI.upgradeProfile(profileData)
    if (response.data.resultCode === 0) {
        dispatch(setProfile(userId));
    }
}

export default profileReducer;