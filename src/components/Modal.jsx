import { setIsOpen, setType } from "../store/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { setResults } from "../store/searchSlice";

// style
import "../style/modal.css";

// components
import UserMenu from "./UserMenu";
import SearchWindow from "./SearchWindow";
import NotificationWindow from "./NotificationWindow";

const Modal = () => {
  const isOpen = useSelector(state => state.modalSlice.isOpen);
  const type = useSelector(state => state.modalSlice.type);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setIsOpen(false));
    dispatch(setType(""));
    dispatch(setResults(null));
  }

  const handleModalClick = (e) => {
    e.stopPropagation();
  }

  return isOpen && (
    <>
      {
        type === "userMenu"
          ? (
            <div className="trnsparent overlay" onClick={handleClose}>
              <div className="user-menu" onClick={handleModalClick}>
              <UserMenu />
              </div>
            </div>
          )
          : (
            <div className="overlay" onClick={handleClose}>
              <div className="modal wite box" onClick={handleModalClick}>
                {type === "search" && (
                  <SearchWindow />
                )}
                {type === "notification" && (
                  <NotificationWindow />
                )}
              </div>
            </div>
          )
      }
    </>
  )
  
}

export default Modal