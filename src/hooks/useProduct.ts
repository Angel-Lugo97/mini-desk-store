import { useQuery } from '@tanstack/react-query';

import { getProductById } from '../services/productsApi';

export function useProduct(
  productId: number | undefined,
) {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => {
      if (productId === undefined) {
        throw new Error('Product id is required.');
      }

      return getProductById(productId);
    },
    enabled: productId !== undefined,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
}
