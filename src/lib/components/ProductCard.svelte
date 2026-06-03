<script lang="ts">
	import type { Product } from '$lib/products';
	import { formatBDT } from '$lib/format';
	import { cart } from '$lib/cart.svelte';
	import Stars from './Stars.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Heart, Plus } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';

	let { product }: { product: Product } = $props();

	const discounted = $derived(product.discountPercentage > 5);
	const originalPrice = $derived(
		discounted ? Math.round(product.price / (1 - product.discountPercentage / 100)) : null
	);
	const lowStock = $derived(product.stock > 0 && product.stock < 10);

	function add() {
		cart.add(product);
		toast.success(`${product.name} added to cart`);
	}
</script>

<div
	class="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-lg"
	onclick={add}
	onkeydown={(e) => e.key === 'Enter' && add()}
	role="button"
	tabindex="0"
>
	<div class="relative aspect-[4/3] w-full overflow-hidden bg-muted">
		{#if discounted}
			<Badge variant="destructive" class="absolute top-3 left-3 z-10">
				-{Math.round(product.discountPercentage)}%
			</Badge>
		{/if}
		<Button
			variant="secondary"
			size="icon"
			aria-label="Save"
			onclick={(e: MouseEvent) => e.stopPropagation()}
			class="absolute top-2.5 right-2.5 z-10 size-8 rounded-full"
		>
			<Heart class="size-4" />
		</Button>
		<img
			src={product.image}
			alt={product.name}
			loading="lazy"
			class="size-full object-cover transition-transform duration-300 group-hover:scale-105"
		/>
	</div>

	<div class="flex flex-1 flex-col gap-1.5 p-4">
		{#if product.brand}
			<div class="text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
				{product.brand}
			</div>
		{/if}
		<h3 class="line-clamp-1 text-[15px] leading-snug font-semibold text-foreground">
			{product.name}
		</h3>
		<div class="flex items-center gap-1.5 text-xs text-muted-foreground">
			<Stars value={product.rating} />
			<span class="tnum">{product.rating.toFixed(1)} ({product.reviews})</span>
		</div>
		<div class="mt-0.5 flex flex-wrap items-baseline gap-2">
			<span class="font-display tnum text-xl font-extrabold tracking-tight text-foreground">
				{formatBDT(product.price)}
			</span>
			{#if originalPrice}
				<span class="tnum text-[13px] text-muted-foreground line-through">
					{formatBDT(originalPrice)}
				</span>
			{/if}
		</div>
		<div class="flex flex-wrap items-center gap-2.5">
			<span class="text-xs font-semibold text-primary">Free shipping</span>
			{#if lowStock}
				<span class="text-xs font-semibold text-destructive">Only {product.stock} left</span>
			{/if}
		</div>
		<div class="mt-auto pt-2.5">
			<Button
				class="w-full gap-1.5"
				onclick={(e: MouseEvent) => {
					e.stopPropagation();
					add();
				}}
			>
				<Plus class="size-4" /> Add to cart
			</Button>
		</div>
	</div>
</div>
