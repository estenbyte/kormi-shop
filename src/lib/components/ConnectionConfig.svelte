<script lang="ts">
	import { config } from '$lib/config.svelte';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Info } from '@lucide/svelte';

	function save() {
		config.save();
	}
</script>

<div class="space-y-4">
	<div class="space-y-1.5">
		<Label for="c-url">API URL</Label>
		<Input id="c-url" placeholder="http://localhost:8080" bind:value={config.url} oninput={save} />
	</div>
	<div class="space-y-1.5">
		<Label for="c-key">API Key <span class="text-muted-foreground">(X-API-Key)</span></Label>
		<Input id="c-key" type="password" placeholder="kormi.v1.…" bind:value={config.key} oninput={save} />
	</div>
	<div class="space-y-1.5">
		<Label for="c-store">Store ID <span class="text-muted-foreground">(X-Store-Id) — optional</span></Label>
		<Input id="c-store" placeholder="empty = default store" bind:value={config.store} oninput={save} />
	</div>
	<p class="flex items-center gap-1.5 text-xs text-muted-foreground">
		<Info class="size-3.5" /> Saved automatically to this browser's localStorage.
	</p>
</div>
