import { authAPI } from '../DAL/api';
import { stopSubmit } from 'redux-form';

const AUTH_USER_PROFILE = 'my-social-network/auth/AUTH_USER_PROFILE';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_USER_PROFILE:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}

export const authUserProfile = (userId, email, login, isAuth) => ({ type: AUTH_USER_PROFILE, payload: { userId, email, login, isAuth } })

export const AuthMe = () => async (dispatch) => {
    let data = await authAPI.authMe()
    if (data.resultCode === 0) {
        let { id, email, login } = data.data;
        dispatch(authUserProfile(id, email, login, true));
    }
}
export const login = (email, password, rememberMe) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe)
    if (response.data.resultCode === 0) {
        dispatch(AuthMe());
    } else {
        let errorMessage = response.data.messages.length > 0 ? response.data.messages[0] : 'Common error';
        dispatch(stopSubmit('login', { _error: errorMessage }));
    }
}
export const logout = () => async (dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(AuthMe(null, null, null, false));
    }
}


export default authReducer;