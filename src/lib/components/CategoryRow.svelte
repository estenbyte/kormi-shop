<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel';
	import ProductCard from './ProductCard.svelte';
	import SkeletonCard from './SkeletonCard.svelte';
	import { Button } from '$lib/components/ui/button';
	import { getProducts } from '$lib/products.remote';
	import { titleCase } from '$lib/format';
	import { ArrowRight } from '@lucide/svelte';

	let { category }: { category: string } = $props();
	const productsQuery = $derived(getProducts({ category, limit: 12 }));
</script>

<section class="mb-10">
	<div class="mb-3 flex items-baseline justify-between">
		<h2 class="font-display text-xl font-bold tracking-tight text-foreground">
			{titleCase(category)}
		</h2>
		<Button href={`/?category=${category}`} variant="link" class="gap-1 text-muted-foreground">
			View all <ArrowRight class="size-4" />
		</Button>
	</div>

	{#if productsQuery.loading}
		<div class="flex gap-5 overflow-hidden">
			{#each Array(5) as _, i (i)}
				<div class="w-[260px] shrink-0"><SkeletonCard /></div>
			{/each}
		</div>
	{:else if productsQuery.error}
		<div class="rounded-xl border border-border bg-card p-6 text-sm text-destructive">
			Couldn't load {titleCase(category)}.
		</div>
	{:else}
		<Carousel.Root opts={{ align: 'start' }}>
			<Carousel.Content class="-ml-5">
				{#each productsQuery.current ?? [] as p (p.id)}
					<Carousel.Item class="basis-[260px] pl-5">
						<ProductCard product={p} />
					</Carousel.Item>
				{/each}
			</Carousel.Content>
			<Carousel.Previous class="-left-3" />
			<Carousel.Next class="-right-3" />
		</Carousel.Root>
	{/if}
</section>
