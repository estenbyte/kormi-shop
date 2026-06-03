<script lang="ts">
	import { page } from '$app/state';
	import { cart } from '$lib/cart.svelte';
	import { ShoppingBag, Plug, Package, ShoppingCart, CreditCard } from '@lucide/svelte';
	import { cn } from '$lib/utils';

	const links = [
		{ href: '/', label: 'Shop', icon: Package },
		{ href: '/cart', label: 'Cart', icon: ShoppingCart },
		{ href: '/checkout', label: 'Checkout', icon: CreditCard },
		{ href: '/connection', label: 'Connection', icon: Plug }
	];

	const isActive = (href: string) =>
		href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(href);
</script>

<header class="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
	<nav class="mx-auto flex h-16 max-w-3xl items-center gap-2 px-4">
		<a href="/" class="mr-2 flex items-center gap-2.5">
			<span
				class="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-lime-500 to-green-600 text-white shadow-sm"
			>
				<ShoppingBag class="size-5" />
			</span>
			<span class="font-display text-lg font-bold tracking-tight text-foreground">Kormi Shop</span>
		</a>

		<div class="ml-auto flex items-center gap-1">
			{#each links as l (l.href)}
				<a
					href={l.href}
					class={cn(
						'relative flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition-colors',
						isActive(l.href)
							? 'bg-foreground text-background'
							: 'text-muted-foreground hover:bg-muted hover:text-foreground'
					)}
				>
					<l.icon class="size-4" />
					<span class="hidden sm:inline">{l.label}</span>
					{#if l.href === '/cart' && cart.count > 0}
						<span
							class="tnum absolute -top-0.5 -right-0.5 grid size-5 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground"
						>
							{cart.count}
						</span>
					{/if}
				</a>
			{/each}
		</div>
	</nav>
</header>
