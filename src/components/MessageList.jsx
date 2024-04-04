/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";

const MessageList = () => {
    const chats = useSelector(state => state.chatsSlice.chats);
    const currentUser = useSelector(state => state.userSlice.user);

  return (
    <>
    {chats && chats.map(message => (
        <>
            <div key={message.senderId} className={`box column ${message.senderId === currentUser.uid ? "sent" : "received"}`}>
                <p>{message.content.text}</p>
            </div>
        </>
        ))}
    </>
  )
}

export default MessageList