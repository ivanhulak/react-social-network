import { ProfileAPI } from '../DAL/api';

const AUTH_USER_PROFILE = 'AUTH_USER_PROFILE';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_USER_PROFILE:
            return {
                ...state,
                ...action.data,
                isAuth: true,
            }
        default:
            return state;
    }
}

export const authUserProfile = (userId, email, login) => ({ type: AUTH_USER_PROFILE, data: { userId, email, login } })

export const AuthMeThunkCreator = () => (dispatch) => {
    ProfileAPI.authMe().then(data => {
        if (data.resultCode === 0) {
            let { id, email, login } = data.data;
            dispatch(authUserProfile(id, email, login));
        }
    })
}


export default authReducer;