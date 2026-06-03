<script lang="ts">
	import { goto } from '$app/navigation';
	import { cart } from '$lib/cart.svelte';
	import { order } from '$lib/order.svelte';
	import { sendEvent } from '$lib/api';
	import { Button } from '$lib/components/ui/button';
	import { formatBDT } from '$lib/format';
	import { toast } from 'svelte-sonner';
	import { Check, Loader2 } from '@lucide/svelte';

	let cancelling = $state(false);

	// Survives reload — read the persisted last order.
	const last = $derived(order.lastOrder);
	const orderId = $derived(order.orderId || last?.id || '—');

	async function cancelOrder() {
		cancelling = true;
		try {
			const { kormi_event_id } = await sendEvent('order_cancelled', order.customer, order.orderId || last?.id || '');
			toast.message('order_cancelled sent', { description: 'kormi_event_id: ' + kormi_event_id });
			cart.clear();
			order.orderId = '';
			await goto('/');
		} catch (e) {
			toast.error('Cancel failed', { description: e instanceof Error ? e.message : String(e) });
		} finally {
			cancelling = false;
		}
	}

	function backToShop() {
		cart.clear();
		order.orderId = '';
		goto('/');
	}
</script>

<svelte:head><title>Order placed · Kormi Shop</title></svelte:head>

<div class="mx-auto max-w-3xl">
	<section
		class="rounded-2xl border border-border bg-card p-10 text-center shadow-sm"
	>
		<div
			class="mx-auto mb-4 grid size-18 place-items-center rounded-2xl bg-primary text-primary-foreground"
		>
			<Check class="size-9" />
		</div>
		<h2 class="font-display text-2xl font-bold text-foreground">Order placed!</h2>
		<p class="mt-2 text-muted-foreground">
			Order ID:
			<span class="tnum rounded bg-muted px-2 py-1 font-mono text-[13px]">{orderId}</span>
		</p>
		<p class="mt-1 mb-6 text-muted-foreground">
			Event <code class="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">order_confirmation</code>
			sent to Kormi. Worker will trigger the agent call shortly.
		</p>

		{#if last}
			<div class="mx-auto mb-6 max-w-md rounded-xl border border-border bg-muted/40 p-4 text-left">
				{#each last.items as it (it.name)}
					<div class="flex items-center justify-between py-1 text-sm">
						<span class="truncate text-foreground">{it.name} <span class="text-muted-foreground">× {it.qty}</span></span>
						<span class="tnum font-medium text-foreground">{formatBDT(it.price * it.qty)}</span>
					</div>
				{/each}
				<div class="mt-2 flex items-center justify-between border-t border-dashed border-border pt-2 text-sm font-semibold">
					<span>Total</span>
					<span class="tnum">{formatBDT(last.total)}</span>
				</div>
			</div>
		{/if}

		<div class="flex justify-center gap-3">
			<Button variant="destructive" class="gap-2" onclick={cancelOrder} disabled={cancelling}>
				{#if cancelling}<Loader2 class="size-4 animate-spin" />{/if} Cancel order
			</Button>
			<Button onclick={backToShop}>Back to shop</Button>
		</div>
	</section>
</div>
