import axios, {
  type AxiosInstance,
  type AxiosResponse,
  AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

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
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    // Ép kiểu config về dạng tùy biến có chứa thuộc tính _retry
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (
      !originalRequest ||
      error.response?.status !== 401 ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return axiosClient(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    return new Promise(async (resolve, reject) => {
      try {
        // Khai báo kiểu RefreshResponse cho dữ liệu trả về của axios gốc
        const res = await axios.post<RefreshResponse>(
          "http://localhost:3000/api/refresh",
          {},
          { withCredentials: true },
        );

        // TypeScript giờ đã hiểu rõ cấu trúc và gợi ý thuộc tính accessToken
        const { accessToken } = res.data;
        localStorage.setItem("accessToken", accessToken);

        processQueue(null, accessToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }
        resolve(axiosClient(originalRequest));
      } catch (refreshError: any) {
        processQueue(refreshError, null);

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
