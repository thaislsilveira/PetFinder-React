import axios from 'axios';

export default function isSessionExpiredError(error: unknown): boolean {
  return Boolean(
    axios.isAxiosError(error) && error.response?.data?.tokenExpired,
  );
}
