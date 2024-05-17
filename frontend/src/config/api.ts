import { getAccessTokenFromLocalStorage } from "@/App";
import axios from "axios";

const privateClient = axios.create({
    baseURL:"http://localhost:5000"
})

const client = axios.create({
    baseURL:"http://localhost:5000"
})

privateClient.interceptors.request.use(config=>{
    const token = getAccessTokenFromLocalStorage();
    if(!token) {
        return config
    }
    config.headers.Authorization = `Bearer ${token}`

    return config
})


const refreshAccessToken = async () => {
    try {
      const response = await axios.post('/refresh-token', { refreshToken: localStorage.getItem('refreshToken') });
      localStorage.setItem('accessToken', response.data.accessToken);
      return response.data.accessToken;
    } catch (error) {
      console.error('Error refreshing access token:', error);
      // Handle refresh token errors (e.g., logout user)
      return Promise.reject(error);
    }
  };

// Response interceptor
privateClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const newAccessToken = await refreshAccessToken();
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return privateClient(originalRequest);
        } catch (error) {
          console.error('Error obtaining new access token:', error);
          // Handle access token refresh errors (e.g., logout user)
          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    }
  );

export default privateClient;
export {client};