import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://aouissianass.pythonanywhere.com/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export default apiClient;
