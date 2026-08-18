import { useQuery } from '@tanstack/react-query';

import { getProducts } from '../services/productsApi';

export function useProducts() {
    return useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
        staleTime: 5 * 60 * 1000,
        retry: 2,
    });
}