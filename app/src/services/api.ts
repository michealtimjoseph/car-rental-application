import axios from 'axios';

const api = axios.create({
  // Pointing to your local machine's IP address on the Wi-Fi network
  baseURL: 'http://192.168.254.101:8000/api',
  timeout: 15000,
  headers: {
    Accept: 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const authHeader = api.defaults.headers.common.Authorization;

  if (typeof authHeader === 'string') {
    if (config.headers) {
      config.headers.set('Authorization', authHeader);
    } else {
      config.headers = { Authorization: authHeader } as typeof config.headers;
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      delete api.defaults.headers.common.Authorization;
    }

    return Promise.reject(error);
  },
);

export default api;