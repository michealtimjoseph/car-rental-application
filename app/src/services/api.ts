import axios from 'axios';

const apiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL;

if (!apiBaseUrl) {
  throw new Error(
    'EXPO_PUBLIC_API_BASE_URL is not set. Add it to your local Expo environment before starting the app.'
  );
}

const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
