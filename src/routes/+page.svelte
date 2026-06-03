<script lang="ts">
	import Products from '$lib/components/Products.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { Button } from '$lib/components/ui/button';
	import { cart } from '$lib/cart.svelte';
	import { Package, ArrowRight } from '@lucide/svelte';
</script>

<svelte:head><title>Shop · Kormi Shop</title></svelte:head>

<PageHeader title="Shop" subtitle="Browse the catalog and add items to your cart" icon={Package} />

<section class="rounded-2xl border border-border bg-card p-6 shadow-sm">
	<Products />
</section>

{#if cart.count > 0}
	<div class="mt-5 flex items-center justify-between rounded-xl border border-border bg-muted/50 px-5 py-4">
		<p class="text-sm font-medium text-foreground">
			{cart.count} item{cart.count > 1 ? 's' : ''} · <span class="tnum font-bold">৳{cart.total}</span>
		</p>
		<Button href="/cart" class="gap-2 rounded-full">
			View cart <ArrowRight class="size-4" />
		</Button>
	</div>
{/if}
