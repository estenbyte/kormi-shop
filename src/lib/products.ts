export type Product = {
	id: string;
	name: string;
	price: number;
};

export const PRODUCTS: Product[] = [
	{ id: 'p1', name: 'Cotton T-Shirt', price: 550 },
	{ id: 'p2', name: 'Denim Jeans', price: 1850 },
	{ id: 'p3', name: 'Sneakers', price: 2400 }
];

export function findProduct(id: string): Product | undefined {
	return PRODUCTS.find((p) => p.id === id);
}
