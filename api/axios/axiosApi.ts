import axios from "axios";
import { deleteTokens, getTokensSync, saveTokens } from "../secureStore";
import { useUserStore } from "../../src/entities/ZustandStores/store";

export const axiosApi = axios.create({
  baseURL: "https://rpgbackend-1.onrender.com",
});

// Интерцептор ЗАПРОСА: добавляем accessToken в заголовок
axiosApi.interceptors.request.use(
  (config) => {
    const tokens = getTokensSync();
    if (tokens?.access) {
      config.headers.Authorization = `Bearer ${tokens.access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Очередь запросов пришедших пока идёт refresh
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(token!);
  });
  failedQueue = [];
};

const logout = async () => {
  await deleteTokens();
  useUserStore.getState().setAuthenticated(false);
};

// Интерцептор ОТВЕТА: при 401 обновляем токен
axiosApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosApi(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const tokens = getTokensSync();

      if (!tokens?.refresh) {
        await logout();
        isRefreshing = false;
        return Promise.reject(error);
      }

      try {
        const { data } = await axios.post(
          "https://rpgbackend-1.onrender.com/auth/refresh",
          { refreshToken: tokens.refresh }
        );

        await saveTokens(data.accessToken, data.refreshToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        processQueue(null, data.accessToken);

        return axiosApi(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        await logout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);