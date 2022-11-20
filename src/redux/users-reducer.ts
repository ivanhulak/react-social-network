import { usersAPI } from "../DAL/users-api";
import { updateObjectInArray } from "../common/object-helpers";
import { UsersType } from "../types/types";
import { AppStateType, InferActionsTypes } from "./redux-store.js";
import { ThunkAction } from "redux-thunk";

let initialState = {
    users: [] as Array<UsersType>,
    totalItemsCount: 0,
    pageSize: 9,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, // Array of users id-s
    friends: [] as Array<UsersType>
}
export type InitialStateType = typeof initialState

const userReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'my-social-network/users/FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, "id", action.userId, { followed: true })
            }
        case 'my-social-network/users/UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, "id", action.userId, { followed: false })
            }
        case 'my-social-network/users/SET_USERS':
            return { ...state, users: action.users }
        case 'my-social-network/users/SET_CURRENT_PAGE':
            return { ...state, currentPage: action.pageNumber }
        case 'my-social-network/users/SET_TOTAL_USER_COUNT':
            return { ...state, totalItemsCount: action.totalCount }
        case 'my-social-network/users/SET_IS_FETCHING':
            return { ...state, isFetching: action.isFetching }
        case 'my-social-network/users/SET_FOLLOWING_IN_PROGRESS':
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        case 'my-social-network/users/SET_FRIENDS':
            return {...state, friends: action.friends}
        default:
            return state;
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>
// Action Creators
export const actions = {
    followSuccess: (userId: number) => ({ type: 'my-social-network/users/FOLLOW', userId } as const),
    unfollowSuccess: (userId: number) => ({ type: 'my-social-network/users/UNFOLLOW', userId } as const),
    setUsers: (users: Array<UsersType>) => ({ type: 'my-social-network/users/SET_USERS', users } as const),
    setCurrentPage: (pageNumber: number) => ({ type: 'my-social-network/users/SET_CURRENT_PAGE', pageNumber } as const),
    setTotalUserCount: (totalCount: number) => ({ type: 'my-social-network/users/SET_TOTAL_USER_COUNT', totalCount } as const),
    setIsFetching: (isFetching: boolean) => ({ type: 'my-social-network/users/SET_IS_FETCHING', isFetching } as const),
    setFollowingInProgress: (isFetching: boolean, userId: number) => ({
        type: 'my-social-network/users/SET_FOLLOWING_IN_PROGRESS', isFetching, userId
    } as const),
    setFriends: (friends: Array<UsersType>) => ({type: 'my-social-network/users/SET_FRIENDS', friends} as const),
}

// Thunk types with ThunkAction
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>
export const requestUsers = (page: number, pageSize: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(page));
        let data = await usersAPI.getUsers(page, pageSize);
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUserCount(data.totalCount));
        dispatch(actions.setIsFetching(false));
    }
}

export const getFriends = (): ThunkType => {
    return async (dispatch) => {
        let data = await usersAPI.getFriends();
        dispatch(actions.setFriends(data.items));

    }
}

export default userReducer;

