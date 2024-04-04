/* eslint-disable react/prop-types */

import { db } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { setIsOpen, setType } from "../store/modalSlice";
import { setChatId } from "../store/chatsSlice";

const Chat = ({data, onClick}) => {
    const user = useSelector(state => state.userSlice.user);

    const dispatch = useDispatch();

    const handleRequest = async (status) => {
        // update notifications based on notificatiosList collection changes
        const notificationDocRef = doc(db, "notifications", user.uid);
        const notifications = await getDoc(notificationDocRef);

        if (notifications.exists()) {
            // Get the friend request from the notifications
            const friendRequests = notifications.data().freindRequest || [];

            // Find the target friend request
            const targetRequestIndex = friendRequests.findIndex(req => req.senderUID === data.senderUID);

            if (targetRequestIndex !== -1) {
                if (status === "rejected") {
                    // remove the rejected request from friendRequests
                    const filteredArray = friendRequests.filter(rejected => rejected.state !== "rejected")

                    await updateDoc(notificationDocRef, { freindRequest: filteredArray});
                } else {
                    // ====== add the sender to receiver freinds ====== //
                    // add accepted user to userFreinds if exists
                    const senderProfileRef = doc(db, "usersProfile", data.senderUID);
                    const senderProfile = await getDoc(senderProfileRef);
                    
                    if (senderProfile.exists()) {
                        const userFreindsRef = doc(db, "userFreinds", user.uid);

                        await updateDoc(userFreindsRef, {
                            freindList: arrayUnion(senderProfile.data())
                        })
                    } 

                    // ====== add the receiver to sender freinds ====== //
                    const userProfileRef = doc(db, "usersProfile", user.uid);
                    const userProfile = await getDoc(userProfileRef);
                    
                    if (userProfile.exists()) {
                        const userFreindsRef = doc(db, "userFreinds", data.senderUID);
                        
                        await updateDoc(userFreindsRef, {
                            freindList: arrayUnion(userProfile.data())
                        })
                    } 

                    // ====== create chat doc for the new freinds ====== //
                    const newId = generateChatId(user.uid, data.senderUID);
                    dispatch(setChatId(newId));
                    // create a chat if not exists
                    const chatRef = doc(db, "usersChats", newId);
                    const chat = await getDoc(chatRef);
                    
                    if (!chat.exists()) {
                        await setDoc(chatRef, {
                            msgs: []
                        })
                    }

                    // ====== remove the notification ====== //
                    const filteredArray = friendRequests.filter(rejected => rejected.state !== "accepted")

                    await updateDoc(notificationDocRef, { freindRequest: filteredArray });
                }
            }
        }

        dispatch(setIsOpen(false));
        dispatch(setType(""));
    };

    const generateChatId = (uid1, uid2) => {
        return uid1 < uid2 ? `${uid1}_${uid2}` : `${uid2}_${uid1}`;
    }

    return (
        <li onClick={onClick} className="user-info chat-selector box">
            <div className="user-img">
                <span className="alternate-img">{data.displayName && data.displayName.charAt(0).toUpperCase()}</span>
                {data.photoURL && (
                    <img src={data.photoURL} alt="user image" />
                )}
            </div>

            {data.displayName && (
                <h4 className="username">{data.displayName}</h4>
            )}

            {data.content && (
                <>
                    <p>{data.content}</p>
                    <div className="actions-container">
                        <button className="accept" onClick={() => handleRequest("accepted")}>accept</button>
                        <button className="reject" onClick={() => handleRequest("rejected")}>reject</button>
                    </div>
                </>
            )}
        </li>
    )
}

export default Chat;