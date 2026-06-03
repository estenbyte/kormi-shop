import { config, resolveCustomerId, type Config } from './config.svelte';
import { cart } from './cart.svelte';

const uuid = () => crypto.randomUUID();

export type Customer = {
	name: string;
	phone: string;
	email: string;
	address: string;
};

export type OrderResult = { kormi_event_id: string };

export async function placeOrder(customer: Customer): Promise<OrderResult> {
	const cfg = config.save() as Config;
	if (!cfg.key) throw new Error('Set API Key first.');

	const items = cart.lines.map((l) => ({
		name: l.product.name,
		qty: l.qty,
		price: l.product.price
	}));

	const payload = {
		event_type: 'order_confirmation',
		external_event_id: 'evt-' + uuid(),
		occurred_at: new Date().toISOString(),
		customer: {
			external_id: resolveCustomerId(customer.phone),
			name: customer.name,
			phone: customer.phone,
			email: customer.email,
			address: customer.address
		},
		order: {
			external_id: 'order-' + uuid().slice(0, 8),
			total: cart.total,
			currency: 'BDT',
			items
		}
	};

	const headers: Record<string, string> = {
		'Content-Type': 'application/json',
		'X-API-Key': cfg.key
	};
	if (cfg.store) headers['X-Store-Id'] = cfg.store;

	const res = await fetch(`${cfg.url}/v1/events`, {
		method: 'POST',
		headers,
		body: JSON.stringify(payload)
	});
	const body = await res.json().catch(() => ({}));
	if (!res.ok) throw new Error(`${res.status} ${JSON.stringify(body)}`);
	const data = body.data || body;
	return { kormi_event_id: data.kormi_event_id || '?' };
}
