import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://fakestoreapi.com",
});

axiosClient.interceptors.request.use((config) => {
    
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (errors) => {
        console.log(errors);
        if (errors.response.status === 401) {
            localStorage.removeItem("token");
        }

        throw errors;
    }
);

export default axiosClient;


