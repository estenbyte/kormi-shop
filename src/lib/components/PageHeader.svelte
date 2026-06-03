<script lang="ts">
	import type { Component } from 'svelte';

	let {
		title,
		subtitle,
		icon: Icon
	}: { title: string; subtitle?: string; icon?: Component } = $props();
</script>

<div class="mb-6 flex items-center gap-3">
	{#if Icon}
		<span class="grid size-11 place-items-center rounded-2xl bg-muted text-foreground">
			<Icon class="size-6" />
		</span>
	{/if}
	<div>
		<h1 class="font-display text-2xl font-bold tracking-tight text-foreground">{title}</h1>
		{#if subtitle}<p class="text-sm text-muted-foreground">{subtitle}</p>{/if}
	</div>
</div>
