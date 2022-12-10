import { FormAction, stopSubmit } from 'redux-form';
import { ResultCodesEnum } from '../DAL/api';
import { profileAPI } from '../DAL/profile-api';
import { PhotosType, PostsType, ProfileType } from '../types/types';
import { BaseThunkType, InferActionsTypes } from './redux-store';

let initialState = {
    posts: [
        { id: 1, postText: 'Hello! It is Ivan Hulak!', likes: 20, comments: 2, photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
        { id: 2, postText: 'New Post', likes: 12, comments: 1, photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
        { id: 3, postText: 'React app', likes: 1, comments: 5, photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
    ] as Array<PostsType>,
    profile: null as ProfileType | null,
    status: '',
    errorsData: {} as any,
}
type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/profile/ADD_POST':
            let newPost = {
                id: 5,
                postText: action.newPostText,
                likes: 20,
                comments: 2,
                photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png'
            }
            return { ...state, posts: [...state.posts, newPost] }
        case 'SN/profile/DELETE_POST':
            return { ...state, posts: state.posts.filter(post => post.id !== action.postId) }
        case 'SN/profile/SET_USER_PROFILE':
            return { ...state, profile: action.profile }
        case 'SN/profile/SET_STATUS':
            return { ...state, status: action.status }
        case 'SN/profile/UPLOAD_PHOTO_SUCCESS':
            return { ...state, profile: { ...state.profile, photos: action.photos } as ProfileType }
        case 'SN/profile/CATCH_ERRORS_SUCCESS':
            return { ...state, errorsData: action.data }
        default:
            return state;
    }
}
// Action creators
type ActionTypes = InferActionsTypes<typeof actions>
export const actions = {
    addPost: (newPostText: string) => ({ type: 'SN/profile/ADD_POST', newPostText } as const),
    deletePost: (postId: number) => ({ type: 'SN/profile/DELETE_POST', postId } as const), // for testing
    setUserProfile: (profile: ProfileType) => ({ type: 'SN/profile/SET_USER_PROFILE', profile } as const),
    setStatus: (status: string) => ({ type: 'SN/profile/SET_STATUS', status } as const),
    uploadPhotoSuccess: (photos: PhotosType) => ({ type: 'SN/profile/UPLOAD_PHOTO_SUCCESS', photos } as const),
    catchErrorSuccess: (data: any) => ({ type: 'SN/profile/CATCH_ERRORS_SUCCESS', data } as const)
}

// Thunk Creators
type ThunkType = BaseThunkType<ActionTypes>
export const setProfile = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(data));
}
export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(data));
}
export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        let data = await profileAPI.updateStatus(status)
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(actions.setStatus(status));
        }
    } catch (error: any) {
        dispatch(catchErrors(error.response.status, error.response.data.message, error.code))
    }
}
export const uploadPhoto = (file: File): ThunkType => async (dispatch) => {
    let data = await profileAPI.uploadPhoto(file)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.uploadPhotoSuccess(data.data.photos));
    }
}
export const upgradeProfile = (profileData: ProfileType): BaseThunkType<FormAction> => async (dispatch, getState) => {
    const userId = getState().auth.userId
    let data = await profileAPI.upgradeProfile(profileData)
    if (data.resultCode === ResultCodesEnum.Success) {
        if (userId !== null){
            dispatch(setProfile(userId))
        } else {
            throw new Error('UserId cannot be null')
        }
    }
}
export const catchErrors = (status: string, message: string, statusCode: number): BaseThunkType<ActionTypes, void> => (dispatch) => {
    const data = { status, message, statusCode }
    dispatch(actions.catchErrorSuccess(data))
}

export default profileReducer