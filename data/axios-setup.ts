import axios from "axios";
import config from "./config";

const baseURL = config.server;

const instance = axios.create({
  baseURL: baseURL,
});

instance.interceptors.request.use((config) => {
  const configInstance = { ...config };
  return configInstance;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    /**
     * Do something in case the response returns an error code [3**, 4**, 5**] etc
     * For example, on token expiration retrieve a new access token, retry a failed request etc
     */
    const { response } = error;

    if (response && response.status === 401) {
      return (window.location.href = "/");
    }
    return Promise.reject(error);
  }
);

export default instance;
