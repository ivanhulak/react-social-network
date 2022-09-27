import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
let store = {
    _state: {
        profilePage: {
            posts: [
                { id: 1, postText: 'Hello! It is Ivan Hulak!', likes: 20, comments: 2, photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
                { id: 2, postText: 'New Post', likes: 12, comments: 1, photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
                { id: 3, postText: 'React app', likes: 1, comments: 5, photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
            ],
            newPostText: 'Ivan',
        },
        dialogsPage: {
            dialogs: [
                { id: 1, name: 'Kristina', photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
                { id: 2, name: 'Kevin', photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
                { id: 3, name: 'Travis', photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
                { id: 4, name: 'Andrew', photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
                { id: 5, name: 'Sveta', photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
            ],
            messages: [
                { id: 1, message: 'Hello!' },
                { id: 2, message: 'How are you doing?' },
                { id: 3, message: 'magic?' },
                { id: 4, message: 'Hello!' },
                { id: 5, message: 'Yo' },
            ],
            newMessageText: 'Message',
        }
    },
    _rerenderEntireTree(){
        console.log('State changed');
    },
    getState(){
        return this._state;
    },
    subscribe(observer){
        this._rerenderEntireTree = observer;
    },
    dispatch(action){
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._rerenderEntireTree(this._state);
    }
}

export default store;
window.store = store;