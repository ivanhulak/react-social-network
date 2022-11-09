import { ThunkAction } from 'redux-thunk';
import { profileAPI, ResultCodesEnum } from '../DAL/api';
import { PhotosType, PostsType, ProfileType } from '../types/types';
import { AppStateType } from './redux-store';

export const ADD_POST = 'my-social-network/profile/ADD_POST';
export const DELETE_POST = 'my-social-network/profile/DELETE_POST';
export const SET_USER_PROFILE = 'my-social-network/profile/SET_USER_PROFILE';
export const SET_STATUS = 'my-social-network/profile/SET_STATUS';
export const UPLOAD_PHOTO_SUCCESS = 'my-social-network/profile/UPLOAD_PHOTO_SUCCESS';
export const UPGRADE_PROFILE_SUCCESS = 'my-social-network/profile/UPGRADE_PROFILE_SUCCESS';
export const LOAD = 'my-social-network/profile/LOAD';
export const CATCH_ERRORS_SUCCESS = 'my-social-network/profile/CATCH_ERRORS_SUCCESS';

let initialState = {
    posts: [
        { id: 1, postText: 'Hello! It is Ivan Hulak!', likes: 20, comments: 2, photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
        { id: 2, postText: 'New Post', likes: 12, comments: 1, photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
        { id: 3, postText: 'React app', likes: 1, comments: 5, photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
    ] as Array<PostsType>,
    profile: null as ProfileType | null,
    status: '',
    errorsData: {},
}
type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                postText: action.newPostText,
                likes: 20,
                comments: 2,
                photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png'
            }
            return { ...state, posts: [...state.posts, newPost] }
        case DELETE_POST:
            return { ...state, posts: state.posts.filter(post => post.id !== action.postId) }
        case SET_USER_PROFILE:
            return { ...state, profile: action.profile }
        case SET_STATUS:
            return { ...state, status: action.status }
        case UPLOAD_PHOTO_SUCCESS:
            return { ...state, profile: { ...state.profile, photos: action.photos } as ProfileType }
        case LOAD:
            return { ...state, profile: { ...state.profile, profile: action.profile } as ProfileType }
        case CATCH_ERRORS_SUCCESS:
            return { ...state, errorsData: action.data }
        default:
            return state;
    }
}
// Types for Action creators
type AddPostActionType = { type: typeof ADD_POST, newPostText: string }
type DeletePostActionType = { type: typeof DELETE_POST, postId: number }
type SetUserProfileActionType = { type: typeof SET_USER_PROFILE, profile: ProfileType }
type SetStatusActionType = { type: typeof SET_STATUS, status: string }
type UploadPhotoSuccessActionType = { type: typeof UPLOAD_PHOTO_SUCCESS, photos: PhotosType }
type LoadDataToProfileDataFormActionType = { type: typeof LOAD, profile: ProfileType }
type CatchErrorSuccessActionType = { type: typeof CATCH_ERRORS_SUCCESS, data: any }
// Actions Types
type ActionTypes = AddPostActionType | DeletePostActionType | SetUserProfileActionType | SetStatusActionType | 
                   UploadPhotoSuccessActionType | LoadDataToProfileDataFormActionType | CatchErrorSuccessActionType
// Action creators
export const addPost = (newPostText: string): AddPostActionType => ({ type: ADD_POST, newPostText });
export const deletePost = (postId: number): DeletePostActionType => ({ type: DELETE_POST, postId }); // for testing
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({ type: SET_USER_PROFILE, profile });
export const setStatus = (status: string): SetStatusActionType => ({ type: SET_STATUS, status });
export const uploadPhotoSuccess = (photos: PhotosType): UploadPhotoSuccessActionType => ({ type: UPLOAD_PHOTO_SUCCESS, photos });
export const loadDataToProfileDataForm = (profile: ProfileType): LoadDataToProfileDataFormActionType => ({ type: LOAD, profile });
export const catchErrorSuccess = (data: any): CatchErrorSuccessActionType => ({ type: CATCH_ERRORS_SUCCESS, data });

// Thunk Creators
type ThunkType = ThunkAction< Promise<void>, AppStateType, unknown, ActionTypes>
export const setProfile = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(data));
}
export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(setStatus(data));
}
export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        let data = await profileAPI.updateStatus(status)
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(setStatus(status));
        }
    } catch (error: any) {
        dispatch(catchErrors(error.response.status, error.response.data.message, error.code))
    }
}
export const uploadPhoto = (file: any): ThunkType => async (dispatch) => {
    let data = await profileAPI.uploadPhoto(file)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(uploadPhotoSuccess(data.data.photos));
    }
}
export const upgradeProfile = (profileData: ProfileType): ThunkType => async (dispatch, getState: any) => {
    const userId = getState().auth.userId
    let data = await profileAPI.upgradeProfile(profileData)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(setProfile(userId))
    }
}
export const catchErrors = (status: string, message: string, statusCode: number): ThunkAction<void, AppStateType, unknown, ActionTypes> => (dispatch) => {
    const data = { status, message, statusCode }
    dispatch(catchErrorSuccess(data))
}

export default profileReducer