import { authAPI } from '../DAL/api';
import { stopSubmit } from 'redux-form';

const AUTH_USER_PROFILE = 'my-social-network/auth/AUTH_USER_PROFILE';
const SET_CAPTCHA_URL = 'my-social-network/auth/SET_CAPTCHA_URL';

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaURL: null as string | null,
}
type initialStateType = typeof initialState;

const authReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case AUTH_USER_PROFILE:
            return {
                ...state,
                ...action.payload,
            }
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

// Action Creators
export const authUserProfile = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): AuthUserProfileActionType => ({ type: AUTH_USER_PROFILE, payload: { userId, email, login, isAuth } })
export const setCaptchaURL = (url: string): SetCaptchaURLActionType => ({ type: SET_CAPTCHA_URL, url })


// Thunk Creators
export const AuthMe = () => async (dispatch: any) => {
    const data = await authAPI.authMe()
    if (data.resultCode === 0) {
        let { id, email, login } = data.data;
        dispatch(authUserProfile(id, email, login, true));
    }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: null) => async (dispatch: any) => {
    const response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        dispatch(AuthMe());
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl());
        }
        let errorMessage = response.data.messages.length > 0 ? response.data.messages[0] : 'Common error';
        dispatch(stopSubmit('login', { _error: errorMessage }));
    }
}
export const logout = () => async (dispatch: any) => {
    const response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(authUserProfile(null, null, null, false));
    }
}
export const getCaptchaUrl = () => async (dispatch: any) => {
    const response = await authAPI.getCaptchaUrl();
    dispatch(setCaptchaURL(response.data.url))
}

export default authReducer;