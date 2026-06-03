<script lang="ts">
	import { goto } from '$app/navigation';
	import { cart } from '$lib/cart.svelte';
	import { order } from '$lib/order.svelte';
	import { sendEvent } from '$lib/api';
	import { formatBDT } from '$lib/format';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import { toast } from 'svelte-sonner';
	import { Loader2, CheckCircle2, UserPlus, Sparkles } from '@lucide/svelte';

	let sending = $state(false);

	async function submit() {
		const c = order.customer;
		if (!c.name.trim() || !c.address.trim() || !c.phone.trim()) {
			toast.error('Fill name, phone, address.');
			return;
		}
		sending = true;
		try {
			const orderId = order.newOrderId();
			const { kormi_event_id } = await sendEvent('order_confirmation', c, orderId);
			order.saveLast(cart.lines);
			toast.success('Order confirmed', { description: 'kormi_event_id: ' + kormi_event_id });
			await goto('/placed');
		} catch (e) {
			toast.error('Order failed', { description: e instanceof Error ? e.message : String(e) });
		} finally {
			sending = false;
		}
	}
</script>

<div class="mb-2 flex flex-wrap items-center justify-end gap-2">
	<Button variant="outline" size="sm" class="gap-1.5" onclick={() => order.prefill()}>
		<Sparkles class="size-3.5" /> Prefill demo data
	</Button>
	<Button variant="outline" size="sm" class="gap-1.5" onclick={() => order.reset()}>
		<UserPlus class="size-3.5" /> New customer
	</Button>
</div>

<p class="mb-4 text-xs leading-relaxed text-muted-foreground">
	Customer is keyed by phone. Same phone → same Kormi customer (updates name/email). Different phone →
	new customer.
</p>

<form
	onsubmit={(e) => {
		e.preventDefault();
		submit();
	}}
	class="grid gap-4 sm:grid-cols-2"
>
	<div class="space-y-1.5">
		<Label for="f-name">Name <span class="text-destructive">*</span></Label>
		<Input id="f-name" bind:value={order.customer.name} />
	</div>
	<div class="space-y-1.5">
		<Label for="f-phone">Phone (E.164) <span class="text-destructive">*</span></Label>
		<Input id="f-phone" bind:value={order.customer.phone} />
	</div>
	<div class="space-y-1.5">
		<Label for="f-email">Email</Label>
		<Input id="f-email" type="email" bind:value={order.customer.email} />
	</div>
	<div class="space-y-1.5">
		<Label for="f-address">Delivery address <span class="text-destructive">*</span></Label>
		<Input id="f-address" placeholder="House, road, area, city" bind:value={order.customer.address} />
	</div>

	<div
		class="mt-2 flex items-center justify-between gap-4 border-t border-dashed border-border pt-5 sm:col-span-2"
	>
		<div>
			<p class="text-xs font-medium tracking-wide text-muted-foreground uppercase">Order total</p>
			<p class="font-display tnum text-2xl font-bold text-foreground">{formatBDT(cart.total)}</p>
		</div>
		<Button
			type="submit"
			size="lg"
			class="gap-2 px-6"
			disabled={cart.total === 0 || sending}
		>
			{#if sending}
				<Loader2 class="size-4 animate-spin" /> Placing…
			{:else}
				<CheckCircle2 class="size-4" /> Place order
			{/if}
		</Button>
	</div>
</form>
