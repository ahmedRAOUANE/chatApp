import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import {setIsOpen, setType} from "../store/modalSlice";
import { setAllNotifications, setNewNotifications } from "../store/notificationSlice";

const UserMenu = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(setUser(null));
        dispatch(setIsOpen(false));
        dispatch(setType(""));
        dispatch(setAllNotifications(null));
        dispatch(setNewNotifications(null));
        signOut(auth);
    }

    const openNotificationWindow = () => {
        dispatch(setIsOpen(true));
        dispatch(setType("notification"));
    }
  return (
              <ul>
                  <li><button onClick={openNotificationWindow}>notifications</button></li>
                  <li><button onClick={handleLogout}>Logout</button></li>
              </ul>
  )
}

export default UserMenu