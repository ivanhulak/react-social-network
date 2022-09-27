export const SEND_MESSAGE = 'SEND_MESSAGE';
export const UPDATE_TEXT_SEND_MESSAGE = 'UPDATE_TEXT_SEND_MESSAGE';

let initialState = {
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

const dialogsReducer = (state = initialState, action) => {
    switch(action.type){
        case SEND_MESSAGE:
            let newMessage = {id: 7, message: state.newMessageText};
            state.messages.push(newMessage);
            return state;
        case UPDATE_TEXT_SEND_MESSAGE:
            state.newMessageText = action.messageText;
            return state;
        default:
            return state;
    }
}

export default dialogsReducer;

export const sendMessageAC = () => ({type: SEND_MESSAGE});
export const updateTextSendMessageAC = (messageText) => ({type: UPDATE_TEXT_SEND_MESSAGE, messageText});