export function titleCase(s: string) {
	return s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

const bdt = new Intl.NumberFormat('en-BD', {
	style: 'currency',
	currency: 'BDT',
	currencyDisplay: 'narrowSymbol',
	maximumFractionDigits: 0
});

export function formatBDT(n: number) {
	return bdt.format(n);
}
