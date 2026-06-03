<script lang="ts">
	import { cart } from '$lib/cart.svelte';
	import { placeOrder } from '$lib/api';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import { toast } from 'svelte-sonner';
	import { Loader2, CheckCircle2 } from '@lucide/svelte';

	let name = $state('Ebn Sina');
	let phone = $state('01841252123');
	let email = $state('sina@nilelabs.com');
	let address = $state('Dhaka, Dhaka, Bangladesh');
	let sending = $state(false);

	async function submit() {
		if (!name.trim() || !address.trim() || !phone.trim()) {
			toast.error('Fill name, phone, address.');
			return;
		}
		sending = true;
		try {
			const { kormi_event_id } = await placeOrder({
				name: name.trim(),
				phone: phone.trim(),
				email: email.trim(),
				address: address.trim()
			});
			toast.success('Order confirmed', { description: 'kormi_event_id: ' + kormi_event_id });
			cart.clear();
		} catch (e) {
			toast.error('Order failed', {
				description: e instanceof Error ? e.message : String(e)
			});
		} finally {
			sending = false;
		}
	}
</script>

<div class="grid gap-4 sm:grid-cols-2">
	<div class="space-y-1.5">
		<Label for="f-name">Name <span class="text-destructive">*</span></Label>
		<Input id="f-name" bind:value={name} />
	</div>
	<div class="space-y-1.5">
		<Label for="f-phone">Phone (E.164) <span class="text-destructive">*</span></Label>
		<Input id="f-phone" bind:value={phone} />
	</div>
	<div class="space-y-1.5">
		<Label for="f-email">Email</Label>
		<Input id="f-email" type="email" bind:value={email} />
	</div>
	<div class="space-y-1.5">
		<Label for="f-address">Delivery address <span class="text-destructive">*</span></Label>
		<Input id="f-address" bind:value={address} />
	</div>
</div>

<div class="mt-6 flex items-center justify-between border-t border-dashed border-border pt-5">
	<div>
		<p class="text-xs font-medium tracking-wide text-muted-foreground uppercase">Order total</p>
		<p class="font-display tnum text-2xl font-bold text-foreground">৳{cart.total}</p>
	</div>
	<Button size="lg" class="gap-2 rounded-full px-6" onclick={submit} disabled={cart.total === 0 || sending}>
		{#if sending}
			<Loader2 class="size-4 animate-spin" /> Placing…
		{:else}
			<CheckCircle2 class="size-4" /> Place order
		{/if}
	</Button>
</div>
