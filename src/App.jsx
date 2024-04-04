import { useEffect } from "react";
import { auth, db } from "./firebase";
import { setUser } from "./store/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { setIsLoading } from "./store/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import { setUserFreinds } from "./store/userFreindsSlice";
import { Route, Routes, useNavigate } from "react-router-dom";
import { setAllNotifications } from "./store/notificationSlice";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";

// components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Loader from "./components/Loader";
import UserLayout from "./layout/UserLayout";
import GuestLayout from "./layout/GuestLayout";

// style
import "./style/layout.css";

function App() {
  const user = useSelector(state => state.userSlice.user);

  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    const unsub = () => {
      try {
        dispatch(setIsLoading(true));
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            dispatch(setUser({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
            }))
            navigate("/");

            // get userProfiles or create new
            const userProfileRef = doc(db, "usersProfile", user.uid)
            const userProfile = await getDoc(userProfileRef);

            if (!userProfile.exists()) {
              setDoc(userProfileRef, { displayName: user.displayName, email: user.email, uid: user.uid });
            }

            // get freindList or create new
            const userFreindsRef = doc(db, "userFreinds", user.uid)
            const userFreinds = await getDoc(userFreindsRef);

            if (!userFreinds.exists()) {
              setDoc(userFreindsRef, {freindList: []});
            } else {
              dispatch(setUserFreinds(userFreinds.data().freindList))
            }
            
            // update notifications based on notificatiosList collection changes
            const notificationDocRef = doc(db, "notifications", user.uid);
            const notifications = await getDoc(notificationDocRef);

            if (notifications.exists()) {
              dispatch(setAllNotifications(notifications.data()));
              onSnapshot(notificationDocRef, (doc) => {
                dispatch(setAllNotifications(doc.data()));
                // dispatch(setNewNotifications(doc.data().notifications));
              })
            }
          } else {
            dispatch(setUser(null))
          }
        })
      } catch (err) {
        console.log('Error from ...: ', err);
      } finally {
        dispatch(setIsLoading(false));
      }
    }

    return () => unsub();
  }, [dispatch, navigate])

  return (
    <>
      <Loader />
      <Routes>
        {user
          ? (
            <Route path="/" element={<UserLayout />}>
              <Route index element={<Home />} />
            </Route>
          )
          : (
            <Route path="/" element={<GuestLayout />}>
              <Route index element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
          )
        }
      </Routes>
    </>
  )
}

export default App;
