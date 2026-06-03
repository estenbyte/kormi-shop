import { browser } from '$app/environment';
import type { Customer } from './api';
import type { CartLine } from './cart.svelte';

const uuid = () => crypto.randomUUID();
const LAST_ORDER_KEY = 'kormi-shop-last-order';
const ORDERS_KEY = 'kormi-shop-orders';
const MAX_ORDERS = 20;

export const DEMO_CUSTOMER: Customer = {
	name: 'Ebn Sina',
	phone: '01841252123',
	email: 'ebnsina@example.com',
	address: 'Dhaka, Dhaka, Bangladesh'
};

const EMPTY: Customer = { name: '', phone: '', email: '', address: '' };

export type OrderItem = { name: string; qty: number; price: number };

export type LastOrder = {
	id: string;
	total: number;
	currency: string;
	items: OrderItem[];
	customer: Customer;
	placedAt: string;
};

function loadLast(): LastOrder | null {
	if (!browser) return null;
	try {
		const raw = localStorage.getItem(LAST_ORDER_KEY);
		return raw ? (JSON.parse(raw) as LastOrder) : null;
	} catch {
		return null;
	}
}

function loadOrders(): LastOrder[] {
	if (!browser) return [];
	try {
		const raw = localStorage.getItem(ORDERS_KEY);
		return raw ? (JSON.parse(raw) as LastOrder[]) : [];
	} catch {
		return [];
	}
}

class OrderStore {
	customer = $state<Customer>({ ...DEMO_CUSTOMER });
	orderId = $state('');
	lastOrder = $state<LastOrder | null>(loadLast());
	orders = $state<LastOrder[]>(loadOrders());

	reset() {
		this.customer = { ...EMPTY };
	}

	prefill() {
		this.customer = { ...DEMO_CUSTOMER };
	}

	newOrderId() {
		this.orderId = 'order-' + uuid().slice(0, 8);
		return this.orderId;
	}

	saveLast(lines: CartLine[]) {
		const last: LastOrder = {
			id: this.orderId,
			total: lines.reduce((s, l) => s + l.product.price * l.qty, 0),
			currency: 'BDT',
			items: lines.map((l) => ({ name: l.product.name, qty: l.qty, price: l.product.price })),
			customer: { ...this.customer },
			placedAt: new Date().toISOString()
		};
		this.lastOrder = last;
		this.orders = [last, ...this.orders].slice(0, MAX_ORDERS);
		if (browser) {
			localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(last));
			localStorage.setItem(ORDERS_KEY, JSON.stringify(this.orders));
		}
	}
}

export const order = new OrderStore();
