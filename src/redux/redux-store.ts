import { createStore, combineReducers, applyMiddleware, compose, Action } from 'redux';
import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import usersReducer from './users-reducer';
import authReducer from './auth-reducer';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'
import appReducer from './app-reducer';

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
})
type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

export type InferActionsTypes<T> = T extends {[key: string]: (...args: any[]) => infer U } ? U : never

export type BaseThunkType<A extends Action, R = Promise<void> > = ThunkAction<R, AppStateType, unknown, A>
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

// @ts-ignore
export default store;
// window.store = store;

// 1) createStore() from redux
// 2) combineReducers({reducers})
// 3) we need to give state to rerenderEntireTree 
// cause redux library don't call subscribe method after render new state