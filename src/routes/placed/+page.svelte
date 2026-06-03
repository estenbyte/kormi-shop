<script lang="ts">
	import { goto } from '$app/navigation';
	import { cart } from '$lib/cart.svelte';
	import { order } from '$lib/order.svelte';
	import { sendEvent } from '$lib/api';
	import { Button } from '$lib/components/ui/button';
	import { toast } from 'svelte-sonner';
	import { Check, Loader2 } from '@lucide/svelte';

	let cancelling = $state(false);

	async function cancelOrder() {
		cancelling = true;
		try {
			const { kormi_event_id } = await sendEvent('order_cancelled', order.customer, order.orderId);
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
			<span class="tnum rounded bg-muted px-2 py-1 font-mono text-[13px]">{order.orderId || '—'}</span>
		</p>
		<p class="mt-1 mb-6 text-muted-foreground">
			Event <code class="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">order_confirmation</code>
			sent to Kormi. Worker will trigger the agent call shortly.
		</p>
		<div class="flex justify-center gap-3">
			<Button variant="destructive" class="gap-2" onclick={cancelOrder} disabled={cancelling}>
				{#if cancelling}<Loader2 class="size-4 animate-spin" />{/if} Cancel order
			</Button>
			<Button onclick={backToShop}>Back to shop</Button>
		</div>
	</section>
</div>
