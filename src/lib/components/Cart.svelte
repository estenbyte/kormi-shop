<script lang="ts">
	import { cart } from '$lib/cart.svelte';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { ShoppingCart, Minus, Plus, Trash2 } from '@lucide/svelte';
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
				<span class="grid size-9 place-items-center rounded-lg bg-card font-display text-sm font-semibold text-muted-foreground">
					{line.product.name.charAt(0)}
				</span>
				<div class="min-w-0">
					<p class="truncate text-sm font-medium text-foreground">{line.product.name}</p>
					<p class="tnum text-xs text-muted-foreground">৳{line.product.price} each</p>
				</div>
				<div class="ml-auto flex items-center gap-1.5">
					<Button
						variant="outline"
						size="icon"
						class="size-8 rounded-full"
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
						class="size-8 rounded-full"
						onclick={() => cart.setQty(line.product.id, line.qty + 1)}
					>
						<Plus class="size-3.5" />
					</Button>
				</div>
				<p class="tnum w-16 text-right text-sm font-semibold text-foreground">
					৳{line.product.price * line.qty}
				</p>
			</div>
		{/each}
	</div>

	<div class="mt-4 flex items-center justify-between border-t border-dashed border-border pt-4">
		<span class="text-sm font-medium text-muted-foreground">Total</span>
		<span class="font-display tnum text-2xl font-bold text-foreground">৳{cart.total}</span>
	</div>
{/if}
