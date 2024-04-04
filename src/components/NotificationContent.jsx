/* eslint-disable react/prop-types */

import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useDispatch, useSelector } from "react-redux";

const NotificationContent = ({data}) => {
    const user = useSelector(state => state.userSlice.user);

    const dispatch = useDispatch();

    const handleRequest = async (status) => {
        // update notifications based on notificatiosList collection changes
        const notificationDocRef = doc(db, "notifications", user.uid);
        const notifications = await getDoc(notificationDocRef);

        if (notifications.exists()) {
            console.log("freind request list: ", notifications.data());
            // dispatch(setAllNotifications(notifications.data()));
            // onSnapshot(notificationDocRef, (doc) => {
            //   dispatch(setNewNotifications(doc.data().notifications));
            // })
        }
    };

  return (
    <div>
          <p>{data.content}</p>
          <div className="actions-container">
              <button className="accept" onClick={() => handleRequest("accept")}>accept</button>
              <button className="reject" onClick={() => handleRequest("reject")}>reject</button>
          </div>
    </div>
  )
}

export default NotificationContent