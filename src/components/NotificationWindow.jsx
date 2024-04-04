import { useSelector } from "react-redux"
import Chat from "./Chat";

const NotificationWindow = () => {
  const allNotifications = useSelector(state => state.notificationSlice.allNotifications);
  return (
    <div>
      <h2>NotificationWindow</h2>

      <div className="freind-requests">
        <h3>freind requests</h3>
        <ul>
          {allNotifications.freindRequest ? allNotifications.freindRequest.map(req => (
            <Chat key={req.senderUID} data={req} />
          )) : (<p>you have no freind requests yet..</p>)}
        </ul>
      </div>
    </div>
  )
}

export default NotificationWindow