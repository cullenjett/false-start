import { createClient } from '../utils/http';
import { sessionsApi } from './sessions-api';

export const createApi = (http) => {
  return {
    sessions: sessionsApi(http),
  };
};

const apiHttpClient = createClient({
  baseUrl: 'https://api.example.com',
  fetch: window.fetch,
  getAuthToken: () => {},
});

export const api = createApi(apiHttpClient);

if (process.env.NODE_ENV !== 'production') {
  window.api = api;
}
