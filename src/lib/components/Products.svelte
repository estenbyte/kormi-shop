<script lang="ts">
	import { cart, PRODUCTS } from '$lib/cart.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Plus } from '@lucide/svelte';
</script>

<div class="space-y-2.5">
	{#each PRODUCTS as p (p.id)}
		<div
			class="group flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition-all hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-md"
		>
			<div class="grid size-11 place-items-center rounded-lg bg-muted font-display text-base font-semibold text-muted-foreground">
				{p.name.charAt(0)}
			</div>
			<div class="min-w-0">
				<p class="truncate font-medium text-foreground">{p.name}</p>
				<p class="tnum text-sm font-semibold text-muted-foreground">৳{p.price}</p>
			</div>
			<Button
				size="sm"
				class="ml-auto gap-1 rounded-full transition-transform group-hover:scale-105"
				onclick={() => cart.add(p.id)}
			>
				<Plus class="size-4" /> Add
			</Button>
		</div>
	{/each}
</div>
