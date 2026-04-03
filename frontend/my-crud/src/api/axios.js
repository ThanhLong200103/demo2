import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:3000/api",
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache"
  }
});

// xử lý response chung
axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.log("API ERROR:", error);
    return Promise.reject(error);
  }
);

export default axiosClient;