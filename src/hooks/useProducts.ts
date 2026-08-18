import { useQuery } from '@tanstack/react-query';

import { getProducts } from '../services/productsApi';
import { shouldRetryQuery } from '../utils/queryRetry';

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    staleTime: 5 * 60 * 1000,
    retry: shouldRetryQuery,
  });
}
