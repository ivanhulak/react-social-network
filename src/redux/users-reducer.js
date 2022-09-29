const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';

let initialState = {
    users: [
        {
            id: 1,
            photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png',
            followed: false,
            name: 'Ivan',
            surname: 'Hulak',
            age: 20,
            lookingForJob: true
        },
        {
            id: 2,
            photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png',
            followed: true,
            name: 'Kristina',
            surname: 'Hulak',
            age: 18,
            lookingForJob: false
        },
        {
            id: 3,
            photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png',
            followed: false,
            name: 'Irina',
            surname: 'Aristova',
            age: 66,
            lookingForJob: false
        },
        {
            id: 4,
            photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png',
            followed: false,
            name: 'Sveta',
            surname: 'Hulak',
            age: 42,
            lookingForJob: false
        },
    ],
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true }
                    }
                    return u;
                }),
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    }
                    return u;
                }),
            }
        case SET_USERS:
            return {
                ...state,
                users: [...state.users, ...action.users]
            }
        default:
            return state;
    }
}

export default userReducer;

export const followAC = (userId) => ({ type: FOLLOW, userId });
export const unfollowAC = (userId) => ({ type: UNFOLLOW, userId });
export const setUsersAC = (users) => ({ type: FOLLOW, users });