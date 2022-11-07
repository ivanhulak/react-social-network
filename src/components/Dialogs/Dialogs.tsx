import React from "react";
import styles from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./MessageItem/MessageItem";
import DialogsForm from "./DialogsForm";
import {DialogsType, MessagesType} from '../../redux/dialogs-reducer';

type PropsType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    sendMessage: (message: string) => void
}
const Dialogs: React.FC<PropsType> = ({dialogs, messages, sendMessage}) => {

    const dialogsElements = dialogs.map(d => <DialogItem id={d.id} name={d.name} photo={d.photo} key={d.id}/>)
    const messagesElements = messages.map(m => <MessageItem message={m.message} key={m.id}/>)

    const onSendMessage = (formData: any) => {
        sendMessage(formData.sentMessage);
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