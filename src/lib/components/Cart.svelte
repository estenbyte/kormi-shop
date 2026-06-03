<script lang="ts">
	import { cart } from '$lib/cart.svelte';
	import { order } from '$lib/order.svelte';
	import { sendEvent } from '$lib/api';
	import { formatBDT } from '$lib/format';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { ShoppingCart, Minus, Plus, Trash2, Timer } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';

	let abandonTimer: ReturnType<typeof setTimeout> | null = null;

	function simulateAbandon() {
		if (abandonTimer) clearTimeout(abandonTimer);
		const orderId = order.newOrderId();
		abandonTimer = setTimeout(async () => {
			if (cart.lines.length === 0) return;
			try {
				const { kormi_event_id } = await sendEvent('abandoned_cart', order.customer, orderId);
				toast.message('abandoned_cart sent', { description: 'kormi_event_id: ' + kormi_event_id });
			} catch (e) {
				toast.error('Abandon event failed', {
					description: e instanceof Error ? e.message : String(e)
				});
			}
		}, 10000);
		toast.message('Abandoned cart fires in 10s', { description: "Don't place the order!" });
	}
</script>

{#if cart.lines.length === 0}
	<div class="flex flex-col items-center gap-2 py-8 text-center">
		<ShoppingCart class="size-8 text-muted-foreground/50" />
		<p class="text-sm text-muted-foreground">Your cart is empty — add items from the shop.</p>
	</div>
{:else}
	<div class="space-y-2.5">
		{#each cart.lines as line (line.product.id)}
			<div class="flex items-center gap-3 rounded-xl bg-muted/50 p-3">
				<img
					src={line.product.image}
					alt={line.product.name}
					class="size-16 flex-none rounded-lg object-cover"
				/>
				<div class="min-w-0 flex-1">
					<p class="truncate text-sm font-medium text-foreground">{line.product.name}</p>
					<p class="tnum text-xs text-muted-foreground">
						{formatBDT(line.product.price)} · Free shipping
					</p>
				</div>
				<div class="flex items-center gap-1.5">
					<Button
						variant="outline"
						size="icon"
						class="size-8"
						onclick={() => cart.setQty(line.product.id, line.qty - 1)}
					>
						{#if line.qty <= 1}<Trash2 class="size-3.5" />{:else}<Minus class="size-3.5" />{/if}
					</Button>
					<Input
						class="tnum h-8 w-12 text-center"
						type="number"
						min="0"
						value={line.qty}
						oninput={(e) => cart.setQty(line.product.id, parseInt(e.currentTarget.value || '0', 10))}
					/>
					<Button
						variant="outline"
						size="icon"
						class="size-8"
						onclick={() => cart.setQty(line.product.id, line.qty + 1)}
					>
						<Plus class="size-3.5" />
					</Button>
				</div>
				<p class="tnum w-20 text-right text-sm font-semibold text-foreground">
					{formatBDT(line.product.price * line.qty)}
				</p>
			</div>
		{/each}
	</div>

	<div class="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-dashed border-border pt-4">
		<div>
			<span class="text-sm font-medium text-muted-foreground">Subtotal</span>
			<p class="font-display tnum text-2xl font-bold text-foreground">{formatBDT(cart.total)}</p>
		</div>
		<Button variant="outline" class="gap-1.5" onclick={simulateAbandon}>
			<Timer class="size-4" /> Simulate abandon (10s)
		</Button>
	</div>
{/if}
