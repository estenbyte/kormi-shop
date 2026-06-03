<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { cart } from '$lib/cart.svelte';
	import { getCategories } from '$lib/products.remote';
	import { titleCase } from '$lib/format';
	import * as InputGroup from '$lib/components/ui/input-group';
	import * as Select from '$lib/components/ui/select';
	import { Separator } from '$lib/components/ui/separator';
	import { ShoppingBag, Plug, ShoppingCart, CreditCard, Search, Package } from '@lucide/svelte';
	import { cn } from '$lib/utils';

	const links = [
		{ href: '/cart', label: 'Cart', icon: ShoppingCart },
		{ href: '/orders', label: 'Orders', icon: Package },
		{ href: '/checkout', label: 'Checkout', icon: CreditCard },
		{ href: '/connection', label: 'Connection', icon: Plug }
	];

	const isActive = (href: string) =>
		href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(href);

	const categoriesQuery = getCategories();
	const categories = $derived(['All', ...(categoriesQuery.current ?? []).slice(0, 8)]);

	// Filters live in the URL (?q=&category=) so they persist across reloads/sharing.
	let search = $state(page.url.searchParams.get('q') ?? '');
	let category = $state(page.url.searchParams.get('category') ?? 'All');
	let timer: ReturnType<typeof setTimeout> | null = null;

	function apply(replace = true) {
		const params = new URLSearchParams();
		if (search.trim()) params.set('q', search.trim());
		if (category !== 'All') params.set('category', category);
		const qs = params.toString();
		goto(`/${qs ? '?' + qs : ''}`, { keepFocus: true, noScroll: true, replaceState: replace });
	}

	function onSearchInput(v: string) {
		search = v;
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => apply(true), 350);
	}

	function onCategory(v: string) {
		category = v;
		apply(false);
	}

	function onSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (timer) clearTimeout(timer);
		apply(false);
	}
</script>

<header class="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
	<nav
		class="mx-auto grid h-auto max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3 max-md:grid-cols-[1fr_auto] max-md:grid-rows-[auto_auto]"
	>
		<a href="/" class="flex items-center gap-2.5">
			<span
				class="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-lime-500 to-green-600 text-white shadow-sm"
			>
				<ShoppingBag class="size-5" />
			</span>
			<span class="font-display text-lg font-bold tracking-tight text-foreground">Kormi Shop</span>
		</a>

		<form
			onsubmit={onSubmit}
			class="w-full max-w-[640px] justify-self-center max-md:order-3 max-md:col-span-full"
		>
			<InputGroup.Root class="bg-white">
				<InputGroup.Addon align="inline-start" class="pr-0 max-sm:hidden">
					<Select.Root type="single" value={category} onValueChange={onCategory}>
						<Select.Trigger
							class="h-7 gap-1 border-0 bg-transparent px-2 text-xs font-medium text-foreground shadow-none hover:bg-transparent focus-visible:ring-0"
						>
							{titleCase(category)}
						</Select.Trigger>
						<Select.Content>
							{#each categories as c (c)}
								<Select.Item value={c}>{titleCase(c)}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
					<Separator orientation="vertical" class="ml-2 !h-5" />
				</InputGroup.Addon>
				<InputGroup.Input
					type="text"
					placeholder="Search for anything"
					value={search}
					oninput={(e) => onSearchInput(e.currentTarget.value)}
				/>
				<InputGroup.Addon align="inline-end">
					<InputGroup.Button type="submit" size="icon-xs" aria-label="Search">
						<Search />
					</InputGroup.Button>
				</InputGroup.Addon>
			</InputGroup.Root>
		</form>

		<div class="flex items-center gap-1 justify-self-end">
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
