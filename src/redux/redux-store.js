import {createStore, combineReducers} from 'redux';
import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import usersReducer from './users-reducer';

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
})

let store = createStore(reducers);
export default store;

window.store = store;


// 1) createStore() from redux
// 2) combineReducers({reducers})
// 3) we need to give state to rerenderEntireTree 
// cause redux library don't call subscribe method after render new state