import axios from 'axios';

export default function getApiErrorMessage(error: unknown): string | undefined {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.error;
  }

  return undefined;
}
