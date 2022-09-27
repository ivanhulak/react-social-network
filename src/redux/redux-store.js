import {createStore, combineReducers} from 'redux';
import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
})

let store = createStore(reducers);
export default store;


// 1) createStore() from redux
// 2) combineReducers({reducers})
// 3) we need to give state to rerenderEntireTree 
// cause redux library don't call subscribe method after render new state