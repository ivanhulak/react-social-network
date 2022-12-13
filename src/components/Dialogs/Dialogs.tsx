import React from "react";
import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./MessageItem/MessageItem";
import DialogsForm from "./DialogsForm";
import {DialogsType, MessagesType} from '../../redux/dialogs-reducer';
import styled from "styled-components";

const StyledDialogs = styled.div`
    padding: 0px 30px;
    .dialogsRow{
        display: flex;
        justify-content: flex-start;
        gap: 50px;
        font-size: 22px;
        margin-bottom: 30px;
    }
    .dialogsBlock{
        a{
            text-decoration: none;
            color: ${({ theme }) => theme.headersColor};
        }
    }
`;
type PropsType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    sendMessage: (message: string) => void
}
export type DialogsFormDataValuesType = {
    sentMessage: string
}
const Dialogs: React.FC<PropsType> = ({dialogs, messages, sendMessage}) => {

    const onSendMessage = (formData: DialogsFormDataValuesType) => {
        sendMessage(formData.sentMessage);
    }
    return (
        <StyledDialogs>
            <div className='dialogsRow'>
                <div className='dialogsBlock'>
                    {dialogs.map(d => <DialogItem id={d.id} name={d.name} photo={d.photo} key={d.id}/>)}
                </div>
                <div className='messagesBlock'>
                    {messages.map(m => <MessageItem message={m.message} key={m.id}/>)}
                </div>
            </div>
            <DialogsForm onSubmit={onSendMessage}/>
        </StyledDialogs>
    );
}

export default Dialogs;