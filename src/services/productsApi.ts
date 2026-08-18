import type { Product } from '../types/product';

const PRODUCTS_URL = 'https://fakestoreapi.com/products';

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(PRODUCTS_URL);

  if (!response.ok) {
    throw new ApiError(
      `Failed to fetch products. Status: ${response.status}`,
      response.status,
    );
  }

  const products = (await response.json()) as Product[];

  return products;
}

export async function getProductById(
  productId: number,
): Promise<Product> {
  const response = await fetch(
    `${PRODUCTS_URL}/${productId}`,
  );

  if (!response.ok) {
    throw new ApiError(
      `Failed to fetch product. Status: ${response.status}`,
      response.status,
    );
  }

  const product = (await response.json()) as Product | null;

  if (!product || typeof product.id !== 'number') {
    throw new ApiError(
      'Product not found.',
      404,
    );
  }

  return product;
}
