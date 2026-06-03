<script lang="ts">
	import { page } from '$app/state';
	import Hero from '$lib/components/Hero.svelte';
	import CategoryRow from '$lib/components/CategoryRow.svelte';
	import ProductCard from '$lib/components/ProductCard.svelte';
	import SkeletonCard from '$lib/components/SkeletonCard.svelte';
	import { getProducts, getCategories } from '$lib/products.remote';
	import { titleCase } from '$lib/format';
	import { SearchX } from '@lucide/svelte';

	const category = $derived(page.url.searchParams.get('category') ?? 'All');
	const query = $derived(page.url.searchParams.get('q') ?? '');
	const isHome = $derived(!query && category === 'All');

	// Home: curated category carousels. Filtered view: flat result grid.
	const categoriesQuery = getCategories();
	const rows = $derived((categoriesQuery.current ?? []).slice(0, 5));

	const productsQuery = $derived(getProducts({ category, query }));
	const products = $derived(productsQuery.current ?? []);
	const heading = $derived(query ? `Results for “${query}”` : titleCase(category));
</script>

<svelte:head><title>Shop · Kormi Shop</title></svelte:head>

{#if isHome}
	<Hero />
	{#if categoriesQuery.loading}
		<div class="space-y-2">
			<div class="h-6 w-40 animate-pulse rounded bg-muted"></div>
			<div class="flex gap-5 overflow-hidden">
				{#each Array(5) as _, i (i)}
					<div class="w-[260px] shrink-0"><SkeletonCard /></div>
				{/each}
			</div>
		</div>
	{:else}
		{#each rows as c (c)}
			<CategoryRow category={c} />
		{/each}
	{/if}
{:else}
	<div class="mb-4 flex items-baseline justify-between">
		<h2 class="font-display text-[22px] font-bold tracking-tight text-foreground">{heading}</h2>
		{#if !productsQuery.loading}
			<span class="text-[13px] text-muted-foreground">{products.length} items</span>
		{/if}
	</div>

	{#if productsQuery.error}
		<div class="rounded-2xl border border-border bg-card p-6 text-destructive">
			Couldn't load products: {productsQuery.error.message}
		</div>
	{:else if productsQuery.loading}
		<div class="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-5">
			{#each Array(8) as _, i (i)}
				<SkeletonCard />
			{/each}
		</div>
	{:else if products.length === 0}
		<div
			class="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-16 text-center"
		>
			<SearchX class="size-10 text-muted-foreground/40" />
			<h2 class="text-xl font-bold text-foreground">No products found</h2>
			<p class="text-muted-foreground">Try a different search or category.</p>
		</div>
	{:else}
		<div class="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-5">
			{#each products as p (p.id)}
				<ProductCard product={p} />
			{/each}
		</div>
	{/if}
{/if}
