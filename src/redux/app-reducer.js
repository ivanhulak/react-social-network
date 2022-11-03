import { AuthMe } from './auth-reducer';

const INITIALIZED_SUCCESS = 'my-social-network/app/INITIALIZED_SUCCESS';
const GLOBAL_ERROR = 'my-social-network/app/GLOBAL_ERROR';

let initialState = {
    initialized: false,
    globalError: null,
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return { ...state, initialized: true }
        case GLOBAL_ERROR:
            return { ...state, globalError: action.message }
        default:
            return state;
    }
}

export const initializedSuccess = () => ({ type: INITIALIZED_SUCCESS })
export const handleErrorSuccess = (message) => ({ type: GLOBAL_ERROR, message })


export const initializeApp = () => (dispatch) => {
    let promise = dispatch(AuthMe());
    Promise.all([promise]).then(() => { dispatch(initializedSuccess()) })
}
export const handleError = (errorMessage) => (dispatch) => {
    dispatch(handleErrorSuccess(errorMessage));
}


export default appReducer;