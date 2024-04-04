import { db } from "../firebase";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { arrayUnion, doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";

// components
import Chat from "../components/Chat";
import Modal from "../components/Modal";
import Navbar from "../components/Navbar";
import MessageList from "../components/MessageList";

// style
import "../style/chatWindow.css";
import { setChatId, setChats } from "../store/chatsSlice";

const Home = () => {
  const chatId = useSelector(state => state.chatsSlice.chatId);
  const currentUser = useSelector(state => state.userSlice.user);
  const freinds = useSelector(state => state.userFreindsSlice.freinds);

  const [currentChat, setCurrentChat] = useState(null);

  const messageRef = useRef();
  const messageEndRef = useRef();

  const dispatch = useDispatch();

  const handleSelect = async (user) => {
    setCurrentChat(user);
    const chatId = generateChatId(currentUser.uid, user.uid);
    dispatch(setChatId(chatId))

    // create a chat if not exists
    const chatRef = doc(db, "usersChats", chatId);
    const chat = await getDoc(chatRef);

    // get messages
    if (chat.exists()) {
      onSnapshot(chatRef, (doc) => {
        // dispatch(setChats(doc.data().msgs))
        const data = doc.data();
        if (data) {
          dispatch(setChats(data.msgs));
        } else {
          dispatch(setChats([])); // Set an empty array if there are no messages
        }
      })
    }
  }

  const handleSendMessage = async (e) => {
    e.preventDefault();

    const message = {
      content: {
        text: messageRef.current.value,
        // add more features in future..
      },
      senderId: currentUser.uid,
    }

    const chatRef = doc(db, "usersChats", chatId);
    const chat = await getDoc(chatRef);

    if (chat.exists()) {
      await updateDoc(chatRef, {
        msgs: arrayUnion(message)
      })
    } else {
      await setDoc(chatRef, {
        msgs: arrayUnion(message)
      })
    }

    messageRef.current.value = "";
    scrollToBottom();
  }

  const generateChatId = (uid1, uid2) => {
    return uid1 < uid2 ? `${uid1}_${uid2}` : `${uid2}_${uid1}`;
  }

  const scrollToBottom = () => {
    messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="collumn shadow white box container">
      <Navbar />
      <div className="main box">
        <div className="sidebar">
          <h3>Chat List</h3>
          <div className="chat-list">
            <ul>
              {freinds ? freinds.map(freind => (
                <Chat key={freind.uid} data={freind} onClick={() => handleSelect(freind)} />
              )) : (
                <div>you have no freinds yet</div>
              )}
            </ul>
          </div>
        </div>
        <div className="chat collumn box">
          {currentChat !== null ? (
          <>
              <Chat data={currentChat} />
              <div className="chat-content">
                <MessageList />
                <div ref={messageEndRef} />
              </div>
          </>
          ) : (
            <p>select a chat to start messaging</p>
          )}
          <form className="chat-input box" onSubmit={handleSendMessage}>
            <input name="message" autoComplete="off" ref={messageRef} placeholder="type something..." type="text" />
            <button type="submit">send</button>
          </form>
        </div>
      </div>
      <Modal />
    </div>
  );
};

export default Home;
