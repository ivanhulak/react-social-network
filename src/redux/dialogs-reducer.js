export const SEND_MESSAGE = 'SEND_MESSAGE';
export const UPDATE_TEXT_SEND_MESSAGE = 'UPDATE_TEXT_SEND_MESSAGE';

const dialogsReducer = (state, action) => {
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