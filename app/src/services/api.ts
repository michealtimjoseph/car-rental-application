import axios from 'axios';
import { Platform } from 'react-native';

const getApiBaseUrl = () => {
  const configuredUrl = process.env.EXPO_PUBLIC_API_URL;

  if (configuredUrl) {
    return configuredUrl.replace(/\/?$/, '');
  }

  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:8000/api';
  }

  return 'http://localhost:8000/api';
};

const api = axios.create({
  baseURL: getApiBaseUrl(),
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