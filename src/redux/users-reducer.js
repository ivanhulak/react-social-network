import { usersAPI } from "../DAL/api.js";
import { updateObjectInArray } from "../common/object-helpers";

const FOLLOW = 'my-social-network/users/FOLLOW';
const UNFOLLOW = 'my-social-network/users/UNFOLLOW';
const SET_USERS = 'my-social-network/users/SET_USERS';
const SET_CURRENT_PAGE = 'my-social-network/users/SET_CURRENT_PAGE';
const SET_TOTAL_USER_COUNT = 'my-social-network/users/SET_TOTAL_USER_COUNT';
const SET_IS_FETCHING = 'my-social-network/users/SET_IS_FETCHING';
const SET_FOLLOWING_IN_PROGRESS = 'my-social-network/users/SET_FOLLOWING_IN_PROGRESS';

let initialState = {
    users: [],
    totalItemsCount: 0,
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
                users: updateObjectInArray(state.users, "id", action.userId, { followed: true })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, "id", action.userId, { followed: false })
            }
        case SET_USERS:
            return { ...state, users: action.users }
        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.pageNumber }
        case SET_TOTAL_USER_COUNT:
            return { ...state, totalItemsCount: action.totalCount }
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

export default userReducer;

