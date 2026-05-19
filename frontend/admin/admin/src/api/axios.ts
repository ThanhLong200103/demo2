import axios, {
  type AxiosInstance,
  AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

import { logout } from "../redux/features/auth";
import store from "../redux/store";

// 1. Định nghĩa kiểu dữ liệu cho hàng đợi các request bị hoãn
interface FailedRequest {
  resolve: (token: string) => void;
  reject: (error: any) => void;
}

// 2. Mở rộng kiểu cấu hình của Axios để hỗ trợ thuộc tính tùy biến _retry
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// 3. Định nghĩa cấu trúc dữ liệu trả về từ API refresh token
interface RefreshResponse {
  accessToken: string;
}

let isRefreshing = false;
let failedQueue: FailedRequest[] = []; // Xác định rõ kiểu mảng đối tượng

const processQueue = (error: any, token: string | null = null): void => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      if (token) prom.resolve(token);
    }
  });
  failedQueue = [];
};

const axiosClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 1. Request Interceptor
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Đảm bảo header nhận giá trị ngôn ngữ hợp lệ hoặc chuỗi rỗng
    config.headers["Accept-Language"] =
      localStorage.getItem("i18nextLng") || "";
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// 2. Response Interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    // Không có request
    if (!originalRequest) {
      return Promise.reject(error);
    }

    // Nếu refresh endpoint fail thì logout luôn
    if (originalRequest.url?.includes("/refresh")) {
      localStorage.removeItem("accessToken");
      store.dispatch(logout());
      return Promise.reject(error);
    }

    // Không phải 401 hoặc đã retry
    if (
      error.response?.status !== 401 ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    // Nếu đang refresh
    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
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

    try {
      const res = await axios.post<RefreshResponse>(
        "http://localhost:3000/api/refresh",
        {},
        { withCredentials: true }
      );

      const { accessToken } = res.data;
      console.log(accessToken);
      
      localStorage.setItem("accessToken", accessToken);

      processQueue(null, accessToken);

      originalRequest.headers.Authorization = `Bearer ${accessToken}`;

      return axiosClient(originalRequest);
    } catch (refreshError: any) {
      processQueue(refreshError, null);

      localStorage.removeItem("accessToken");

      store.dispatch(logout());

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default axiosClient;
