import axios from 'axios';

export const SESSION_EXPIRED_EVENT = 'petfinder:sessionExpired';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export function handleResponseError(error: unknown): Promise<never> {
  if (axios.isAxiosError(error) && error.response?.data?.tokenExpired) {
    localStorage.removeItem('@PetFinder:token');
    localStorage.removeItem('@PetFinder:user');
    delete api.defaults.headers.authorization;
    window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT));
  }

  return Promise.reject(error);
}

api.interceptors.response.use(response => response, handleResponseError);

export default api;
