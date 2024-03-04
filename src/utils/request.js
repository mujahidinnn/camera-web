import axios from "axios";
import { getAuthToken } from "./auth";
import { notifications } from "@mantine/notifications";

export const request = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  timeout: 1_000_000_000,
});

export const requestVanilla = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  timeout: 1_000_000_000,
});

request.interceptors.request.use((config) => {
  if (!config.headers) {
    config.headers = {};
  }

  const token = getAuthToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token?.access_token}`;
  }

  return config;
});

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (err.response == null) {
      return Promise.reject(err);
    }
    const errorResponse = err.response.data.errors || err.response.data.message;
    const errorStatusCode = err.response.status;

    const forbiddenResponse = err.response.status === 403;
    if (forbiddenResponse) {
      notifications.show({
        color: "red",
        title: "403",
        message: "Anda tidak memiliki izin untuk mengakses!",
      });
    }

    const isInternalError = [400, 422, 409, 401, 404];
    const isServerError = [500, 502];

    if (isInternalError.includes(errorStatusCode)) {
      notifications.show({
        color: "red",
        title: errorStatusCode,
        message: errorResponse,
      });
    }

    if (isServerError.includes(errorStatusCode)) {
      notifications.show({
        color: "red",
        title: errorStatusCode,
        message: "Terjadi kesalahan dari internal, silakan coba lagi nanti !",
      });
    }

    return Promise.reject(err);
  }
);
