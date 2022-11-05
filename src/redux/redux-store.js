import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import profileReducer from './profile-reducer.ts';
import dialogsReducer from './dialogs-reducer.ts';
import usersReducer from './users-reducer.ts';
import authReducer from './auth-reducer.ts';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'
import appReducer from './app-reducer.ts';

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;
window.store = store;

// 1) createStore() from redux
// 2) combineReducers({reducers})
// 3) we need to give state to rerenderEntireTree 
// cause redux library don't call subscribe method after render new state