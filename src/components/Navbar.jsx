import { useDispatch, useSelector } from "react-redux";
import { setIsOpen, setType } from "../store/modalSlice";

const Navbar = () => {
    const user = useSelector(state => state.userSlice.user)

    const dispatch = useDispatch();

    const handleUserOpts = () => {
        dispatch(setIsOpen(true));
        dispatch(setType("userMenu"));
    }

    const openSearchWindow = () => {
        dispatch(setIsOpen(true))
        dispatch(setType("search"))
    }

    return (
        <div className="navbar box">
            <h2 className="title">Chat App</h2>
            <div className="search-container" onClick={openSearchWindow}>
                <input onFocus={openSearchWindow} placeholder="search freinds..." type="search" />
                <button type="submit">Search</button>
            </div>
            <div onClick={handleUserOpts} className="user-info box">
                <div className="user-img">
                    <span className="alternate-img">A</span>
                </div>
                <h2 className="username">{user.displayName}</h2>
            </div>
        </div>
    )
}

export default Navbar;