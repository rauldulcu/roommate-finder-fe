import axios, { AxiosInstance } from "axios";

type Api = {
  base: AxiosInstance;
};

const HTTP_CLIENT_TIMEOUT = 3000;

const HttpClient: Api = {
  base: axios.create({
    baseURL: "http://192.168.0.201:8080/api",
    timeout: HTTP_CLIENT_TIMEOUT,
  }),
};

export default HttpClient;
