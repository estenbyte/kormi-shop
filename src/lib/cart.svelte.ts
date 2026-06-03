import type { Product } from './products';

export type CartLine = { product: Product; qty: number };

class CartStore {
	lines = $state<CartLine[]>([]);

	total = $derived(this.lines.reduce((s, l) => s + l.product.price * l.qty, 0));

	count = $derived(this.lines.reduce((s, l) => s + l.qty, 0));

	add(product: Product) {
		const ex = this.lines.find((l) => l.product.id === product.id);
		if (ex) ex.qty += 1;
		else this.lines.push({ product, qty: 1 });
	}

	setQty(id: string, qty: number) {
		const q = Math.max(0, qty | 0);
		if (q === 0) {
			this.remove(id);
			return;
		}
		const line = this.lines.find((l) => l.product.id === id);
		if (line) line.qty = q;
	}

	remove(id: string) {
		this.lines = this.lines.filter((l) => l.product.id !== id);
	}

	clear() {
		this.lines = [];
	}
}

export const cart = new CartStore();
