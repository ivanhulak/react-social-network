import { FormAction } from 'redux-form';
import { ResultCodesEnum } from '../DAL/api';
import { profileAPI } from '../DAL/profile-api';
import { PhotosType, PostsType, ProfileType } from '../types/types';
import { BaseThunkType, InferActionsTypes } from './redux-store';
import heart from '../assets/posts-icons/heart.jpg';

let initialState = {
    posts: [
        { id: 1, postText: 'Love saves the world', likes: 107, comments: 27, sendings: 8, photo: {heart} },
        { id: 2, postText: 'I am learning React', likes: 1227, comments: 227, sendings: 19, photo: {heart} },
        { id: 3, postText: 'Live is a journey, not a race', likes: 189, comments: 17, sendings: 4, photo: {heart} },
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
                sendings: 8,
                photo: {heart}
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
export const uploadPhoto = (file: any): ThunkType => async (dispatch) => {
    let data = await profileAPI.uploadPhoto(file)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.uploadPhotoSuccess(data.data.photos));
    } else if (data.resultCode === ResultCodesEnum.Error){
        alert(`Error! ${data.messages[0]}`)
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