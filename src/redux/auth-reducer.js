const AUTH_USER_PROFILE = 'AUTH_USER_PROFILE';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch(action.type){
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

export const authUserProfileAC = (userId, email, login) => ({type: AUTH_USER_PROFILE, data: {userId, email, login}})

export default authReducer;