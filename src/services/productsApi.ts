import type { Product } from '../types/product';

const PRODUCTS_URL = 'https://fakestoreapi.com/products';

export async function getProducts(): Promise<Product[]> {
    const response = await fetch(PRODUCTS_URL);

    if (!response.ok) {
        throw new Error(
            `Failed to fetch products. Status: ${response.status}`,
        );
    }

    const products = (await response.json()) as Product[];

    return products;
}