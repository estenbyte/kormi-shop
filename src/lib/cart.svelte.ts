import { findProduct, PRODUCTS } from './products';

class CartStore {
	// id -> qty
	items = $state<Record<string, number>>({});

	lines = $derived(
		Object.entries(this.items)
			.filter(([, q]) => q > 0)
			.map(([id, q]) => ({ product: findProduct(id)!, qty: q }))
	);

	total = $derived(this.lines.reduce((s, l) => s + l.product.price * l.qty, 0));

	count = $derived(this.lines.reduce((s, l) => s + l.qty, 0));

	add(id: string) {
		this.items[id] = (this.items[id] || 0) + 1;
	}

	setQty(id: string, qty: number) {
		this.items[id] = Math.max(0, qty | 0);
	}

	clear() {
		this.items = {};
	}
}

export const cart = new CartStore();
export { PRODUCTS };
