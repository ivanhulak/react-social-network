import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ChatMessageAPIType } from '../../DAL/chat-api';
import { sendMessage, startMessagesListening, stopMessagesListening } from '../../redux/chat-reducer';
import { AppStateType } from '../../redux/redux-store';

const ChatPage: React.FC = () => {
   return (
      <div>
         <h1>ChatPage</h1>
         <Chat />
      </div>
   );
}
export default ChatPage;


const Chat: React.FC = () => {
   const dispatch: any = useDispatch()
   const status = useSelector((state: AppStateType) => state.chat.status)
   useEffect(() => {
      dispatch(startMessagesListening())
      return () => {
         dispatch(stopMessagesListening())
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])
   return (
      <div>
         {status === 'error' && <div>Some errror occured. Please, refresh the page</div>}
         <Messages />
         <AddMessageForm />
      </div>
   );
}


const Messages: React.FC = () => {
   const messages = useSelector((state: AppStateType) => state.chat.messages)
   const messagesAnchorRef = useRef<HTMLDivElement>(null)
   const [isAutoScroll, setIsAutoScroll] = useState(true)

   const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
      const element = e.currentTarget
      if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
         !isAutoScroll && setIsAutoScroll(true)
      } else {
         isAutoScroll && setIsAutoScroll(false)
      }
   }

   useEffect(() => {
      if (isAutoScroll) {
         messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' })
      }
   }, [messages])

   return <div style={{ height: '400px', overflowY: 'auto' }} onScroll={scrollHandler}>
      {messages.map((m, index) => <Message key={index} message={m} />)}
      <div ref={messagesAnchorRef}></div>
   </div>
}


const Message: React.FC<{ message: ChatMessageAPIType }> = ({ message }) => {
   // console.log('<<<<<Message')
   return (
      <div>
         <img src={message.photo} alt="" style={{ width: '50px', borderRadius: '50%' }} /> <b>{message.userName}</b>
         <br />
         {message.message}
         <hr />
      </div>
   );
}
const AddMessageForm: React.FC = () => {
   const [message, setMessage] = useState('')
   const dispatch: any = useDispatch()
   const status = useSelector((state: AppStateType) => state.chat.status)

   const sendMessageHandler = () => {
      if (!message) {
         return
      }
      dispatch(sendMessage(message))
      setMessage('')
   }
   return (
      <div>
         <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
         </div>
         <button disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</button>
      </div>
   );
}