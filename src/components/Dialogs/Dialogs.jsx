import React from "react";
import styles from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./MessageItem/MessageItem";
import {sendMessageAC, updateTextSendMessageAC} from './../../redux/dialogs-reducer';

const Dialogs = (props) => {

    const dialogsElements = props.dialogsPage.dialogs
            .map(d => <DialogItem id={d.id} name={d.name} photo={d.photo} key={d.id}/>)
    const messagesElements = props.dialogsPage.messages
            .map(m => <MessageItem message={m.message} key={m.id}/>)
    
    const onSendMessageClick = () => {
        props.dispatch(sendMessageAC());
        props.dispatch(updateTextSendMessageAC(''));
    }

    const onSendMessageChange = (e) => {
        let text = e.target.value;
        props.dispatch(updateTextSendMessageAC(text));
    }

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsRow}>
                <div className={styles.dialogsBlock}>
                    {dialogsElements}
                </div>
                <div className={styles.messagesBlock}>
                    {messagesElements}
                </div>
            </div>
            <textarea placeholder="Отправить сообщение"
                      onChange={onSendMessageChange} 
                      value={props.dialogsPage.newMessageText}/>
            <div><button onClick={onSendMessageClick}>Send Message</button></div>
        </div>
    );
}

export default Dialogs;