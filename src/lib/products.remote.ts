import { query } from '$app/server';
import { fetchProducts, fetchCategories, type Product } from './products';

export type ProductQuery = { category?: string; query?: string; limit?: number };

// Catalog fetches run on the server (no CORS, cached + deduped by SvelteKit).
export const getProducts = query('unchecked', (opts: ProductQuery): Promise<Product[]> =>
	fetchProducts(opts ?? {})
);

export const getCategories = query((): Promise<string[]> => fetchCategories());
