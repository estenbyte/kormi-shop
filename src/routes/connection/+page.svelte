<script lang="ts">
	import ConnectionConfig from '$lib/components/ConnectionConfig.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { Plug } from '@lucide/svelte';
</script>

<svelte:head><title>Connection · Kormi Shop</title></svelte:head>

<PageHeader title="Connection" subtitle="API credentials for sending order events" icon={Plug} />

<section class="rounded-2xl border border-border bg-card p-6 shadow-sm">
	<ConnectionConfig />
</section>
