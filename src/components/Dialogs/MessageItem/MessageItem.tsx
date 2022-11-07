import React from "react";

type PropsType = { message: string }
const MessageItem: React.FC<PropsType> = ({message}) => {
    return (
        <div>
            <div>{message}</div>
        </div>
    );
}

export default MessageItem;