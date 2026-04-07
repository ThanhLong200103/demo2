import axios from "axios";

// Tạo một biến để quản lý việc refresh token (tránh gọi nhiều lần cùng lúc)
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const axiosClient = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 1. Request Interceptor
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 2. Response Interceptor
axiosClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;

    // Nếu không phải lỗi 401 hoặc request này đã từng retry rồi thì dừng
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // Nếu đang trong quá trình refresh token
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosClient(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    return new Promise(async (resolve, reject) => {
      try {
        // GỌI REFRESH TOKEN (Sử dụng instance axios gốc để tránh interceptor đè lên)
        const res = await axios.post(
          "http://localhost:3000/api/refresh",
          {},
          { withCredentials: true },
        );

        const { accessToken } = res.data;
        localStorage.setItem("accessToken", accessToken);

        // Chạy các request đang đợi trong hàng chờ
        processQueue(null, accessToken);

        // Chạy lại request hiện tại
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        resolve(axiosClient(originalRequest));
      } catch (refreshError) {
        processQueue(refreshError, null);

        // Chỉ xóa token khi server xác nhận refresh không thành công (token hết hạn)
        if (
          window.location.pathname !== "/login" &&
          refreshError.response?.status === 401
        ) {
          localStorage.removeItem("accessToken");
          window.location.href = "/login";
        }
        reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    });
  },
);

export default axiosClient;
