import React from "react";
import styles from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./MessageItem/MessageItem";

const Dialogs = () => {
    
    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsRow}>
                <div className={styles.dialogsBlock}>
                    <DialogItem id='1' name='Andrew'/>
                    <DialogItem id='2' name='Kevin'/>
                    <DialogItem id='3' name='Travis'/>
                    <DialogItem id='4' name='Kristina'/>
                    <DialogItem id='5' name='Sveta'/>
                </div>
                <div className={styles.messagesBlock}>
                    <MessageItem message='Hello!'/>
                    <MessageItem message='How are you doing?'/>
                    <MessageItem message='magic?'/>
                    <MessageItem message='It is react app'/>
                    <MessageItem message='Hello!'/>
                </div>
            </div>
        </div>
    );
}

export default Dialogs;