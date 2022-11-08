import { ThunkAction } from "redux-thunk";
import { AuthMe } from "./auth-reducer";
import { AppStateType } from "./redux-store";

const INITIALIZED_SUCCESS = 'my-social-network/app/INITIALIZED_SUCCESS';
const GLOBAL_ERROR = 'my-social-network/app/GLOBAL_ERROR';

let initialState = {
    initialized: false,
    globalError: '',
}
type InitialStateType = typeof initialState;

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return { ...state, initialized: true }
        case GLOBAL_ERROR:
            return { ...state, globalError: action.message }
        default:
            return state;
    }
}
type InitializedSuccessActionType = { type: typeof INITIALIZED_SUCCESS }
type HandleErrorSuccessActionType = { type: typeof GLOBAL_ERROR, message: string }
// Actions Types
type ActionsTypes = InitializedSuccessActionType | HandleErrorSuccessActionType
export const initializedSuccess = (): InitializedSuccessActionType => ({ type: INITIALIZED_SUCCESS })
export const handleErrorSuccess = (message: string): HandleErrorSuccessActionType => ({ type: GLOBAL_ERROR, message })

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>
// Thunk Creators
export const initializeApp = (): ThunkType => (dispatch) => {
    let promise = dispatch(AuthMe());
    Promise.all([promise]).then(() => { dispatch(initializedSuccess()) })
}
export const handleError = (errorMessage: string): ThunkType => (dispatch) => {
    dispatch(handleErrorSuccess(errorMessage));
}


export default appReducer;