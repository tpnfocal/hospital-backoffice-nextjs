import axios from "axios";
import getConfig from "next/config";

const Axios = axios.create();

// Request interceptor for API calls
Axios.interceptors.request.use(
  async (config) => {
    const nextConfig = getConfig();
    config.baseURL =
      nextConfig?.serverRuntimeConfig?.apiUrl ||
      process.env.NEXT_PUBLIC_API_URL;
    try {
      const accessToken = localStorage.getItem("accessToken") ?? "";
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
        config.headers["Interceptor-Header"] = "InterceptorValue";
      }
      return config;
    } catch (error) {
      console.log('request error: ', error)
      return config;
    }
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
Axios.interceptors.response.use(
  (response) => {
    const contentType = response.headers["content-type"];
    const isContentTypeJson = contentType.includes("application/json");
    if (isContentTypeJson) return { success: true, ...response.data };
    else return response.data;
  },
  async function (error) {
    if (error?.response?.status === 401) {
      if (typeof window !== undefined) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    }
    return Promise.reject({
      success: false,
      error: error.response?.data,
    });
  }
);

export default Axios;
