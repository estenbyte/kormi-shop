import { browser } from '$app/environment';

const CFG_KEY = 'kormi-shop-config';
const CUST_KEY = 'kormi-shop-customers';
const DEFAULT_URL = 'http://localhost:8080';

export type Config = {
	url: string;
	key: string;
	store: string;
};

function load(): Config {
	if (!browser) return { url: DEFAULT_URL, key: '', store: '' };
	try {
		const c = JSON.parse(localStorage.getItem(CFG_KEY) || '{}');
		return { url: c.url || DEFAULT_URL, key: c.key || '', store: c.store || '' };
	} catch {
		return { url: DEFAULT_URL, key: '', store: '' };
	}
}

class ConfigStore {
	url = $state(DEFAULT_URL);
	key = $state('');
	store = $state('');

	constructor() {
		const c = load();
		this.url = c.url;
		this.key = c.key;
		this.store = c.store;
	}

	save() {
		if (!browser) return;
		const cfg: Config = {
			url: this.url.trim() || DEFAULT_URL,
			key: this.key.trim(),
			store: this.store.trim()
		};
		localStorage.setItem(CFG_KEY, JSON.stringify(cfg));
		return cfg;
	}
}

export const config = new ConfigStore();

const uuid = () => crypto.randomUUID();

// stable customer external_id per phone (localStorage)
export function resolveCustomerId(phone: string): string {
	const key = (phone || '').trim();
	if (!key || !browser) return 'cust-' + uuid().slice(0, 8);
	const map = JSON.parse(localStorage.getItem(CUST_KEY) || '{}');
	if (map[key]) return map[key];
	const id = 'cust-' + uuid().slice(0, 8);
	map[key] = id;
	localStorage.setItem(CUST_KEY, JSON.stringify(map));
	return id;
}
