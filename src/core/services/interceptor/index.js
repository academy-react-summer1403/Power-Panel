import axios from "axios";

import { getItem, removeItem } from "../common/storage.services";

const baseURL = import.meta.env.VITE_BASE_URL;
const instance = axios.create({
  baseURL,
});

const onSuccess = (response) => {
  return response.data;
};


if (!getItem("token") && window.location.pathname !== "/login") {
  window.location.pathname = "/login";
}

const onError = (err) => {
  console.log(err);

  if (err.response?.status === 401) {
    removeItem("token");

    window.location.pathname = "/login";
  }

  Promise.reject(err);
};

instance.interceptors.request.use((opt) => {
  const token = getItem("token");

  if (token && token !== null) opt.headers.Authorization = `Bearer ${token}`;
  return opt;
});
instance.interceptors.response.use(onSuccess, onError);

export default instance;