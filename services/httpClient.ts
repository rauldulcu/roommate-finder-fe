import axios, { AxiosInstance } from "axios";
import { API_BASE_URL } from "../common/constants";

type Api = {
  base: AxiosInstance;
};

const HTTP_CLIENT_TIMEOUT = 3000;

const HttpClient: Api = {
  base: axios.create({
    baseURL: API_BASE_URL,
    timeout: HTTP_CLIENT_TIMEOUT,
  }),
};

export default HttpClient;
