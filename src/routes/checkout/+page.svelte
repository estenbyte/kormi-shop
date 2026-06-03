<script lang="ts">
	import Checkout from '$lib/components/Checkout.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { Button } from '$lib/components/ui/button';
	import { cart } from '$lib/cart.svelte';
	import { CreditCard, ShoppingCart } from '@lucide/svelte';
</script>

<svelte:head><title>Checkout · Kormi Shop</title></svelte:head>

<div class="mx-auto max-w-3xl">
	<PageHeader title="Checkout" subtitle="Enter delivery details and place your order" icon={CreditCard} />

	{#if cart.total === 0}
		<section
			class="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-10 text-center shadow-sm"
		>
			<ShoppingCart class="size-9 text-muted-foreground/50" />
			<p class="text-sm text-muted-foreground">Your cart is empty. Add items before checking out.</p>
			<Button href="/" class="mt-1">Go to shop</Button>
		</section>
	{:else}
		<section class="rounded-2xl border border-border bg-card p-6 shadow-sm">
			<Checkout />
		</section>
	{/if}
</div>
