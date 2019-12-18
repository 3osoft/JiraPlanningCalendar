import Axios from "axios";
import { getToken } from "./token";

export const axiosInstance = Axios.create({
  baseURL: "http://localhost:3001"
});

axiosInstance.interceptors.request.use(config => {
  config.url = config.url + "?jwt=" + getToken();
  return config;
});
