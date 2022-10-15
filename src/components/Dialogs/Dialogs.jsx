import React from "react";
import styles from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./MessageItem/MessageItem";
import DialogsForm from "./DialogsForm";

const Dialogs = (props) => {

    const dialogsElements = props.dialogs
            .map(d => <DialogItem id={d.id} name={d.name} photo={d.photo} key={d.id}/>)
    const messagesElements = props.messages
            .map(m => <MessageItem message={m.message} key={m.id}/>)

    const onSendMessage = (formData) => {
        console.log(formData);
        props.sendMessage(formData.sentMessage);
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
            <DialogsForm onSubmit={onSendMessage}/>
        </div>
    );
}

export default Dialogs;