<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { Button } from '$lib/components/ui/button';
	import { order } from '$lib/order.svelte';
	import { formatBDT } from '$lib/format';
	import { Package } from '@lucide/svelte';

	const fmtDate = (iso: string) =>
		new Date(iso).toLocaleDateString('en-GB', {
			day: 'numeric',
			month: 'short',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
</script>

<svelte:head><title>My Orders · Kormi Shop</title></svelte:head>

<div class="mx-auto max-w-3xl">
	<PageHeader title="My Orders" subtitle="Your recent orders on this device" icon={Package} />

	{#if order.orders.length === 0}
		<section
			class="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-10 text-center shadow-sm"
		>
			<Package class="size-9 text-muted-foreground/50" />
			<p class="text-sm text-muted-foreground">No orders yet. Place one to see it here.</p>
			<Button href="/" class="mt-1">Go to shop</Button>
		</section>
	{:else}
		<div class="space-y-4">
			{#each order.orders as o (o.id + o.placedAt)}
				<section class="rounded-2xl border border-border bg-card p-5 shadow-sm">
					<div class="mb-3 flex flex-wrap items-center justify-between gap-2">
						<span class="tnum rounded bg-muted px-2 py-1 font-mono text-[13px]">{o.id}</span>
						<span class="text-xs text-muted-foreground">{fmtDate(o.placedAt)}</span>
					</div>
					<div class="divide-y divide-dashed divide-border">
						{#each o.items as it (it.name)}
							<div class="flex items-center justify-between py-1.5 text-sm">
								<span class="truncate text-foreground">
									{it.name} <span class="text-muted-foreground">× {it.qty}</span>
								</span>
								<span class="tnum font-medium text-foreground">{formatBDT(it.price * it.qty)}</span>
							</div>
						{/each}
					</div>
					<div class="mt-3 flex items-center justify-between border-t border-border pt-3">
						<span class="text-sm text-muted-foreground">{o.items.length} item{o.items.length > 1 ? 's' : ''}</span>
						<span class="font-display tnum text-lg font-bold text-foreground">{formatBDT(o.total)}</span>
					</div>
				</section>
			{/each}
		</div>
	{/if}
</div>
