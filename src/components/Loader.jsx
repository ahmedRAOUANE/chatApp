import "../style/loader.css";

import { useSelector } from "react-redux";

const Loader = () => {
    const isLoading = useSelector(state => state.loaderSlice.isLoading);

    return isLoading && (
        <div className="loader-container">
            {console.log("is loading!")}
            <div className="loader-spinner"></div>
        </div>
    )
}

export default Loader;