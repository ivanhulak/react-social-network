import { usersAPI } from "../DAL/api.js";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USER_COUNT = 'SET_TOTAL_USER_COUNT';
const SET_IS_FETCHING = 'SET_IS_FETCHING';
const SET_FOLLOWING_IN_PROGRESS = 'SET_FOLLOWING_IN_PROGRESS';

let initialState = {
    users: [],
    totalUsersCount: 0,
    pageSize: 9,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
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
            return { ...state, users: action.users }
        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.pageNumber }
        case SET_TOTAL_USER_COUNT:
            return { ...state, totalUsersCount: action.totalCount }
        case SET_IS_FETCHING:
            return { ...state, isFetching: action.isFetching }
        case SET_FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state;
    }
}

export const followSuccess = (userId) => ({ type: FOLLOW, userId });
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setCurrentPage = (pageNumber) => ({ type: SET_CURRENT_PAGE, pageNumber });
export const setTotalUserCount = (totalCount) => ({ type: SET_TOTAL_USER_COUNT, totalCount });
export const setIsFetching = (isFetching) => ({ type: SET_IS_FETCHING, isFetching });
export const setFollowingInProgress = (isFetching, userId) => ({
    type: SET_FOLLOWING_IN_PROGRESS, isFetching, userId
});

export const requestUsers = (page, pageSize) => (dispatch) => {
    dispatch(setIsFetching(true));
    dispatch(setCurrentPage(page));
    usersAPI.getUsers(page, pageSize).then(data => {
        dispatch(setUsers(data.items));
        dispatch(setTotalUserCount(data.totalCount));
        dispatch(setIsFetching(false));
    })
}

// Have some problems with that
// Uncaught in promise (403) forbidden
// I think it is problems on backend side
// export const follow = (userId) => {
//     return (dispatch) => {
//         dispatch(setIsFetching(true));
//         dispatch(setFollowingInProgress(true, userId));
//         UsersAPI.follow(userId).then(data => {
//             if (data.resultCode === 0) {
//                 dispatch(followSuccess(userId));
//             }
//             dispatch(setIsFetching(false));
//             dispatch(setFollowingInProgress(false, userId));
//         })
//     }
// }
// export const unfollow = (userId) => {
//     return (dispatch) => {
//         dispatch(setIsFetching(true));
//         dispatch(setFollowingInProgress(true, userId));
//         UsersAPI.unfollow(userId).then(data => {
//             if (data.resultCode === 0) {
//                 dispatch(unfollowSuccess(userId));
//             }
//             dispatch(setIsFetching(false));
//             dispatch(setFollowingInProgress(false, userId));
//         })
//     }
// }

export default userReducer;

