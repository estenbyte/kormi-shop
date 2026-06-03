<script lang="ts">
	import { Star } from '@lucide/svelte';
	let { value }: { value: number } = $props();
	const rounded = $derived(Math.round(value));
</script>

<span class="flex items-center" aria-label={`${value.toFixed(1)} out of 5`}>
	{#each Array(5) as _, i (i)}
		<Star
			class="size-3.5 {i < rounded
				? 'fill-amber-400 text-amber-400'
				: 'fill-muted text-muted'}"
		/>
	{/each}
</span>
