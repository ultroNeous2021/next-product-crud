import axios, { AxiosResponse } from "axios";

import { apiUrl } from "@/utils/constant";

const instance = axios.create({
  baseURL: apiUrl,
  timeout: 15000,
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => instance.get(url).then(responseBody),
  post: (url: string, body: {}, isFormData?: boolean) =>
    instance
      .post(url, body, {
        headers: {
          "Content-Type": isFormData
            ? "multipart/form-data"
            : "application/json",
        },
      })
      .then(responseBody),
  put: (url: string, body: {}, isFormData?: boolean) =>
    instance
      .put(url, body, {
        headers: {
          "Content-Type": isFormData
            ? "multipart/form-data"
            : "application/json",
        },
      })
      .then(responseBody),
  delete: (url: string) => instance.delete(url).then(responseBody),
};

export { requests };
