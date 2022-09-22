import React from "react";
import styles from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./MessageItem/MessageItem";

const Dialogs = (props) => {

    const dialogsElements = props.dialogs.dialogs.map(d => <DialogItem id={d.id} name={d.name} photo={d.photo} key={d.id}/>)
    const messagesElements = props.dialogs.messages.map(m => <MessageItem message={m.message} key={m.id}/>)

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
        </div>
    );
}

export default Dialogs;