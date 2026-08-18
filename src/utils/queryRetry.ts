import { ApiError } from '../services/productsApi';

const MAX_RETRIES = 2;

export function shouldRetryQuery(
  failureCount: number,
  error: Error,
): boolean {
  if (
    error instanceof ApiError &&
    error.status >= 400 &&
    error.status < 500
  ) {
    return false;
  }

  return failureCount < MAX_RETRIES;
}
