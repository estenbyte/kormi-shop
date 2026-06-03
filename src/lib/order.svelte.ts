import type { Customer } from './api';

const uuid = () => crypto.randomUUID();

export const DEMO_CUSTOMER: Customer = {
	name: 'Ebn Sina',
	phone: '01841252123',
	email: 'ebnsina@example.com',
	address: 'Dhaka, Dhaka, Bangladesh'
};

const EMPTY: Customer = { name: '', phone: '', email: '', address: '' };

class OrderStore {
	customer = $state<Customer>({ ...DEMO_CUSTOMER });
	orderId = $state('');

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
}

export const order = new OrderStore();
