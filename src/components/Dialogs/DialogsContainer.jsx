import React from "react";
import Dialogs from './Dialogs';
import {sendMessageAC, updateTextSendMessageAC} from '../../redux/dialogs-reducer';
import StoreContext from "../../StoreContext";

const DialogsContainer = (props) => {

    return <StoreContext.Consumer>
        { store => {
            let state = store.getState().dialogsPage;
        
            const onSendMessageClick = () => {
                store.dispatch(sendMessageAC());
                store.dispatch(updateTextSendMessageAC(''));
            }

            const onSendMessageChange = (text) => {
                store.dispatch(updateTextSendMessageAC(text));
            }
            return (
                <Dialogs newMessageText={state.newMessageText}
                        dialogsPage={state}
                        sendMessage={onSendMessageClick} 
                        updateTextSendMessage={onSendMessageChange}/>
            );}
        }
        </StoreContext.Consumer> 
}

export default DialogsContainer;