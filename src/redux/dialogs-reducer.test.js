import dialogsReducer, { sendMessage, deleteMessage } from "./dialogs-reducer";

let state = {
   messages: [
       { id: 1, message: 'Hello!' },
       { id: 2, message: 'How are you doing?' },
       { id: 3, message: 'magic?' },
       { id: 4, message: 'Hello!' },
       { id: 5, message: 'Yo' },
   ]
}

test('New message should be added in messages array', () => {
   const action = sendMessage('hello!')
   let newState = dialogsReducer(state, action);
   expect(newState.messages.length).toBe(6)
 });
test('Added message should be correct', () => {
   const action = sendMessage('hello!')
   let newState = dialogsReducer(state, action);
   expect(newState.messages[5].message).toBe('hello!')
 });
test('The last id of element of an array should be equal to array`s length', () => {
   const action = sendMessage('hello!')
   let newState = dialogsReducer(state, action);
   expect(newState.messages[newState.messages.length - 1].id).toBe(newState.messages.length)
 });
test('Message should be deleted by id', () => {
   const action = deleteMessage(5)
   let newState = dialogsReducer(state, action);
   expect(newState.messages.length).toBe(4)
 });