export const SEND_MESSAGE = 'my-social-network/dialogs/SEND_MESSAGE';
export const DELETE_MESSAGE = 'my-social-network/dialogs/DELETE_MESSAGE';

type DialogsType = { id: number, name: string, photo: string}
type MesaggesType = { id: number, message: string }

let initialState = {
    dialogs: [
        { id: 1, name: 'Kristina', photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
        { id: 2, name: 'Kevin', photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
        { id: 3, name: 'Travis', photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
        { id: 4, name: 'Andrew', photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
        { id: 5, name: 'Sveta', photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
    ] as Array<DialogsType>,
    messages: [
        { id: 1, message: 'Hello!' },
        { id: 2, message: 'How are you doing?' },
        { id: 3, message: 'magic?' },
        { id: 4, message: 'Hello!' },
        { id: 5, message: 'Yo' },
    ] as Array<MesaggesType>,
}
type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: any):InitialStateType => {
    switch (action.type) {
        case SEND_MESSAGE:
            let newMessage = { id: state.messages.length + 1, message: action.newMessageText };
            return {
                ...state,
                messages: [...state.messages, newMessage],
            };
        case DELETE_MESSAGE:
            return { ...state, messages: state.messages.filter(m => m.id !== action.messageId) }
        default:
            return state;
    }
}

type sendMessageActionType = { type: typeof SEND_MESSAGE, newMessageText: string }
type deleteMessageActionType = { type: typeof DELETE_MESSAGE, messageId: number }

export const sendMessage = (newMessageText: string): sendMessageActionType => ({ type: SEND_MESSAGE, newMessageText });
export const deleteMessage = (messageId: number): deleteMessageActionType => ({ type: DELETE_MESSAGE, messageId });

export default dialogsReducer;