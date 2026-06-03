<script lang="ts">
	import Cart from '$lib/components/Cart.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { Button } from '$lib/components/ui/button';
	import { cart } from '$lib/cart.svelte';
	import { ShoppingCart, ArrowRight, ArrowLeft } from '@lucide/svelte';
</script>

<svelte:head><title>Cart · Kormi Shop</title></svelte:head>

<PageHeader title="Your Cart" subtitle="Review items before checkout" icon={ShoppingCart} />

<section class="rounded-2xl border border-border bg-card p-6 shadow-sm">
	<Cart />
</section>

<div class="mt-5 flex items-center justify-between">
	<Button href="/" variant="ghost" class="gap-2 text-muted-foreground">
		<ArrowLeft class="size-4" /> Keep shopping
	</Button>
	<Button href="/checkout" class="gap-2 rounded-full" disabled={cart.total === 0}>
		Checkout <ArrowRight class="size-4" />
	</Button>
</div>
