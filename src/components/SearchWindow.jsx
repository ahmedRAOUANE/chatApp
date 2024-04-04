import { useSelector } from "react-redux";
import { db } from "../firebase";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

// components
import Chat from "./Chat";
import Search from "./Search";

const SearchWindow = () => {
    const user = useSelector(state => state.userSlice.user);
    const results = useSelector(state => state.searchSlice.results);

    const createFreindRequest = async (result) => {
        try {
            const freindRequestRef = doc(db, "notifications", result.uid)
            const freindRequest = await getDoc(freindRequestRef);

            const freindRequestData = {
                senderUID: user.uid,
                receiverUID: result.uid,
                type: "freind_request",
                state: "",
                content: `${user.displayName} send's you a freind request`,
            }

            if (!freindRequest.exists()) {
                await setDoc(freindRequestRef, {
                    freindRequest: arrayUnion(freindRequestData)
                })
            } else {
                const req = freindRequest.data().freindRequest.find(req => req.senderUID === user.uid);

                if (!req) {
                    await updateDoc(freindRequestRef, {
                        freindRequest: arrayUnion(freindRequestData)
                    })
                } else {
                    console.log("freind request is allready exists");
                }
            }

        } catch (err) {
            console.log("Error sending freind request: ", err);
        }
    }

    return (
        <div className="search-window">
            <Search />
            <ul className="results-container">
                {results && results.map(result => (
                    <Chat key={result.uid} data={result} onClick={() => createFreindRequest(result)} />
                ))}
            </ul>
        </div>
    )
}

export default SearchWindow;