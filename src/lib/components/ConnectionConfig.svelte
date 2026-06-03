<script lang="ts">
	import { config } from '$lib/config.svelte';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import { toast } from 'svelte-sonner';
	import { Info, Save } from '@lucide/svelte';

	function save() {
		config.save();
		toast.success('Connection saved', { description: "Stored in this browser's localStorage." });
	}
</script>

<form
	class="space-y-4"
	onsubmit={(e) => {
		e.preventDefault();
		save();
	}}
>
	<div class="space-y-1.5">
		<Label for="c-url">API URL</Label>
		<Input id="c-url" placeholder="http://localhost:8080" bind:value={config.url} />
	</div>
	<div class="space-y-1.5">
		<Label for="c-key">API Key <span class="text-muted-foreground">(X-API-Key)</span></Label>
		<Input id="c-key" type="password" placeholder="kormi.v1.…" bind:value={config.key} />
	</div>
	<div class="space-y-1.5">
		<Label for="c-store">Store ID <span class="text-muted-foreground">(X-Store-Id) — optional</span></Label>
		<Input id="c-store" placeholder="empty = default store" bind:value={config.store} />
	</div>

	<div class="flex items-center justify-between gap-3 pt-1">
		<p class="flex items-center gap-1.5 text-xs text-muted-foreground">
			<Info class="size-3.5" /> Saved to this browser's localStorage.
		</p>
		<Button type="submit" class="gap-2">
			<Save class="size-4" /> Save
		</Button>
	</div>
</form>
