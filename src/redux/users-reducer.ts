import { usersAPI } from "../DAL/api.js";
import { updateObjectInArray } from "../common/object-helpers";
import { UsersType } from "../types/types";
// import { Dispatch } from "redux";
import { AppStateType } from "./redux-store.js";
import { ThunkAction } from "redux-thunk";


const FOLLOW = 'my-social-network/users/FOLLOW';
const UNFOLLOW = 'my-social-network/users/UNFOLLOW';
const SET_USERS = 'my-social-network/users/SET_USERS';
const SET_CURRENT_PAGE = 'my-social-network/users/SET_CURRENT_PAGE';
const SET_TOTAL_USER_COUNT = 'my-social-network/users/SET_TOTAL_USER_COUNT';
const SET_IS_FETCHING = 'my-social-network/users/SET_IS_FETCHING';
const SET_FOLLOWING_IN_PROGRESS = 'my-social-network/users/SET_FOLLOWING_IN_PROGRESS';

let initialState = {
    users: [] as Array<UsersType>,
    totalItemsCount: 0,
    pageSize: 9,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number> // Array of users id-s
}
type InitialStateType = typeof initialState

const userReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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
// Types for Action Creators
type FollowSuccessActionType = { type: typeof FOLLOW, userId: number }
type UnfollowSuccessActionType = { type: typeof UNFOLLOW, userId: number }
type SetUsersActionType = { type: typeof SET_USERS, users: Array<UsersType> }
type SetCurrentPageActionType = { type: typeof SET_CURRENT_PAGE, pageNumber: number }
type SetTotalUserCountActionType = { type: typeof SET_TOTAL_USER_COUNT, totalCount: number }
type SetIsFetchingActionType = { type: typeof SET_IS_FETCHING, isFetching: boolean }
type SetFollowingInProgressActionType = { type: typeof SET_FOLLOWING_IN_PROGRESS, isFetching: boolean, userId: number }
// General Type for Actions Creators
type ActionsTypes = FollowSuccessActionType | UnfollowSuccessActionType | SetUsersActionType |
    SetCurrentPageActionType | SetTotalUserCountActionType | SetIsFetchingActionType |
    SetFollowingInProgressActionType;
// Action Creators
export const followSuccess = (userId: number): FollowSuccessActionType => ({ type: FOLLOW, userId });
export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({ type: UNFOLLOW, userId });
export const setUsers = (users: Array<UsersType>): SetUsersActionType => ({ type: SET_USERS, users });
export const setCurrentPage = (pageNumber: number): SetCurrentPageActionType => ({ type: SET_CURRENT_PAGE, pageNumber });
export const setTotalUserCount = (totalCount: number): SetTotalUserCountActionType => ({ type: SET_TOTAL_USER_COUNT, totalCount });
export const setIsFetching = (isFetching: boolean): SetIsFetchingActionType => ({ type: SET_IS_FETCHING, isFetching });
export const setFollowingInProgress = (isFetching: boolean, userId: number): SetFollowingInProgressActionType => ({
    type: SET_FOLLOWING_IN_PROGRESS, isFetching, userId
});

// Thunk types 2 variants

// 1 variant
// type DispatchType = Dispatch<ActionsTypes>
// type GetStateType = () => AppStateType
// export const requestUsers = (page: number, pageSize: number) => {
//     return async (dispatch: DispatchType, getState: GetStateType) => {
//         dispatch(setIsFetching(true));
//         dispatch(setCurrentPage(page));
//         let data = await usersAPI.getUsers(page, pageSize)
//         dispatch(setUsers(data.items));
//         dispatch(setTotalUserCount(data.totalCount));
//         dispatch(setIsFetching(false));
//     }
// }
// 2 variant
// Thunk types with ThunkAction
export const requestUsers = (page: number, pageSize: number): ThunkAction< Promise<void>, AppStateType, unknown, ActionsTypes> => {
    return async (dispatch) => {
        dispatch(setIsFetching(true));
        dispatch(setCurrentPage(page));
        let data = await usersAPI.getUsers(page, pageSize)
        dispatch(setUsers(data.items));
        dispatch(setTotalUserCount(data.totalCount));
        dispatch(setIsFetching(false));
    }
}

export default userReducer;

