import React, { useEffect, useState } from 'react';

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
   const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)

   useEffect(() => {
      let ws: WebSocket;
      const closeHandler = () => {
         console.log('WS CLOSE')
         setTimeout(createChannel, 3000)
      }
      function createChannel() {
         ws?.removeEventListener('close', closeHandler)
         ws?.close()
         ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
         ws.addEventListener('close', closeHandler)
         setWsChannel(ws)
      }
      createChannel()

      return () => {
         ws.removeEventListener('close', closeHandler)
         ws.close()
      }
   }, [])

   return (
      <div>
         <Messages wsChannel={wsChannel}/>
         <AddMessageForm wsChannel={wsChannel}/>
      </div>
   );
}


type ChatMessagesType = {
   message: string
   photo: string
   userId: number
   userName: string
}
const Messages: React.FC<{wsChannel: WebSocket | null}> = ({ wsChannel}) => {
   const [messages, setMessages] = useState<Array<ChatMessagesType>>([])

   const messageHandler = (e: MessageEvent) => {
      let newMessages = JSON.parse(e.data)
      setMessages((prevMessages) => [...prevMessages, ...newMessages])
   }

   useEffect(() => {
      wsChannel?.addEventListener('message', messageHandler)
      return () => {
         wsChannel?.removeEventListener('message', messageHandler)
      }
   }, [wsChannel])

   return <div style={{ height: '400px', overflowY: 'auto' }}>
      {messages.map((m, index) => <Message key={index} message={m} />)}
   </div>
}


const Message: React.FC<{ message: ChatMessagesType }> = ({ message }) => {
   return (
      <div>
         <div>
            <img src={message.photo} alt="" /> <b>{message.userName}</b>
         </div>
         <span>{message.message}</span>
         <hr />
      </div>
   );
}
const AddMessageForm: React.FC<{wsChannel: WebSocket | null}> = ({ wsChannel}) => {
   const [message, setMessage] = useState('');
   const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending');

   const openHandler = () => {
      setReadyStatus('ready')
   }

   useEffect(() => {
      wsChannel?.addEventListener('open', openHandler)
      return () => {
         wsChannel?.removeEventListener('open', openHandler)
      } 
   }, [wsChannel])

   const sendMessage = () => {
      if (!message) {
         return
      } 
      wsChannel?.send(message)
      setMessage('')
   }
   return (
      <div>
         <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
         </div>
         <button disabled={wsChannel === null || readyStatus !== 'ready'} onClick={sendMessage}>Send</button>
      </div>
   );
}