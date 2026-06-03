export type Product = {
	id: string;
	name: string;
	price: number;
	image: string;
	category: string;
	brand?: string;
	rating: number;
	reviews: number;
	discountPercentage: number;
	stock: number;
	description: string;
};

type DummyProduct = {
	id: number;
	title: string;
	description: string;
	category: string;
	price: number;
	discountPercentage: number;
	rating: number;
	stock: number;
	brand?: string;
	thumbnail: string;
	reviews?: { rating: number }[];
};

type DummyListResponse = {
	products: DummyProduct[];
	total: number;
	skip: number;
	limit: number;
};

const API = 'https://dummyjson.com';
const USD_TO_BDT = 110;

function mapProduct(p: DummyProduct): Product {
	return {
		id: `prod-${p.id}`,
		name: p.title,
		price: Math.round(p.price * USD_TO_BDT),
		image: p.thumbnail,
		category: p.category,
		brand: p.brand,
		rating: p.rating,
		reviews: p.reviews?.length ?? Math.floor(50 + p.rating * 40),
		discountPercentage: p.discountPercentage,
		stock: p.stock,
		description: p.description
	};
}

export async function fetchProducts(
	opts: { category?: string; query?: string; limit?: number } = {}
): Promise<Product[]> {
	const { category, query, limit = 30 } = opts;
	let url: string;
	if (query && query.trim()) {
		url = `${API}/products/search?q=${encodeURIComponent(query.trim())}&limit=${limit}`;
	} else if (category && category !== 'All') {
		url = `${API}/products/category/${encodeURIComponent(category)}?limit=${limit}`;
	} else {
		url = `${API}/products?limit=${limit}`;
	}
	const res = await fetch(url);
	if (!res.ok) throw new Error(`Failed to load products: ${res.status}`);
	const data = (await res.json()) as DummyListResponse;
	return data.products.map(mapProduct);
}

export async function fetchCategories(): Promise<string[]> {
	const res = await fetch(`${API}/products/category-list`);
	if (!res.ok) return [];
	return (await res.json()) as string[];
}
