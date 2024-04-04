import { useState } from "react"
import { db } from "../firebase";
import { setResults } from "../store/searchSlice";
import { useDispatch } from "react-redux";
import { collection, getDocs, query, where } from "firebase/firestore";

// style
import "../style/chatWindow.css";

const Search = () => {
    const [temp, setTemp] = useState("");
    const dispatch = useDispatch();

    const handleSearch = async (e) => {
        e.preventDefault();

        const q = query(collection(db, "usersProfile"), where("displayName", "==", temp));
        const querySnapShot = await getDocs(q);

        try {
            if (querySnapShot.size > 0) {
                const results = [];
                querySnapShot.forEach((doc) => {
                    results.push(doc.data());
                });
                dispatch(setResults(results));
            } else {
                dispatch(setResults(null));
            }
        } catch (error) {
            console.error("Error searching users:", error);
        }
    }

    return (
        <form className="search-container" onSubmit={handleSearch}>
            <input autoFocus onChange={(e) => setTemp(e.target.value)} placeholder="search freinds..." type="search" />
            <button type="submit">Search</button>
        </form>
    )
}

export default Search;