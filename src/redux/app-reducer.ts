import { AuthMe } from "./auth-reducer";

const INITIALIZED_SUCCESS = 'my-social-network/app/INITIALIZED_SUCCESS';
const GLOBAL_ERROR = 'my-social-network/app/GLOBAL_ERROR';

let initialState = {
    initialized: false,
    globalError: '',
}
type InitialStateType = typeof initialState;

const appReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return { ...state, initialized: true }
        case GLOBAL_ERROR:
            return { ...state, globalError: action.message }
        default:
            return state;
    }
}
type initializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}
type handleErrorSuccessActionType = {
    type: typeof GLOBAL_ERROR,
    message: string
}
export const initializedSuccess = (): initializedSuccessActionType => ({ type: INITIALIZED_SUCCESS })
export const handleErrorSuccess = (message: string): handleErrorSuccessActionType => ({ type: GLOBAL_ERROR, message })


export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(AuthMe());
    Promise.all([promise]).then(() => { dispatch(initializedSuccess()) })
}
export const handleError = (errorMessage: string) => (dispatch: any) => {
    dispatch(handleErrorSuccess(errorMessage));
}


export default appReducer;