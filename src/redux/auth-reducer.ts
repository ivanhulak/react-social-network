import { authAPI, GetCaptchaResultCode, ResponseResultCodes } from '../DAL/api';
import { stopSubmit } from 'redux-form';
import { ThunkAction } from 'redux-thunk';
import { AppStateType } from './redux-store';

const AUTH_USER_PROFILE = 'my-social-network/auth/AUTH_USER_PROFILE';
const SET_CAPTCHA_URL = 'my-social-network/auth/SET_CAPTCHA_URL';

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaURL: null as string | null,
}
type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case AUTH_USER_PROFILE:
            return { ...state, ...action.payload }
        case SET_CAPTCHA_URL:
            return { ...state, captchaURL: action.url }
        default:
            return state;
    }
}

type AuthUserProfilePayloadType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}

type AuthUserProfileActionType = { type: typeof AUTH_USER_PROFILE, payload: AuthUserProfilePayloadType }
type SetCaptchaURLActionType = { type: typeof SET_CAPTCHA_URL, url: string }
// Actions Types
type ActionsTypes = AuthUserProfileActionType | SetCaptchaURLActionType
// Action Creators
export const authUserProfile = (userId: number | null, email: string | null, login: string | null, 
        isAuth: boolean): AuthUserProfileActionType => ({ type: AUTH_USER_PROFILE, payload: { userId, email, login, isAuth } })
export const setCaptchaURL = (url: string): SetCaptchaURLActionType => ({ type: SET_CAPTCHA_URL, url })

// Thunk Creators
type ThunkType = ThunkAction< Promise<void>, AppStateType, unknown, ActionsTypes>
export const AuthMe = (): ThunkType => async (dispatch) => {
    const data = await authAPI.authMe()
    if (data.resultCode === ResponseResultCodes.Success) {
        let { id, email, login } = data.data;
        dispatch(authUserProfile(id, email, login, true));
    }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: null) => async (dispatch: any) => {
    const data = await authAPI.login(email, password, rememberMe, captcha)
    if (data.resultCode === ResponseResultCodes.Success) {
        dispatch(AuthMe());
    } else {
        if (data.resultCode === GetCaptchaResultCode.GetCaptchaUrl) {
            dispatch(getCaptchaUrl());
        }
        let errorMessage = data.messages.length > 0 ? data.messages[0] : 'Common error';
        dispatch(stopSubmit('login', { _error: errorMessage }));
    }
}
export const logout = (): ThunkType => async (dispatch) => {
    const data = await authAPI.logout()
    if (data.resultCode === 0) {
        dispatch(authUserProfile(null, null, null, false));
    }
}
export const getCaptchaUrl = ():ThunkType => async (dispatch) => {
    const data = await authAPI.getCaptchaUrl();
    dispatch(setCaptchaURL(data.url))
}

export default authReducer;