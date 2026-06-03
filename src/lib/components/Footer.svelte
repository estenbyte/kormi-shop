<script lang="ts">
	const SECTIONS = [
		{ title: 'Shop', links: ['New arrivals', 'Best sellers', 'Flash deals', 'Gift cards'] },
		{ title: 'Support', links: ['Help center', 'Order status', 'Returns', 'Contact us'] },
		{ title: 'Company', links: ['About Kormi', 'Careers', 'Press', 'Sustainability'] },
		{ title: 'Legal', links: ['Terms', 'Privacy', 'Cookies', 'Accessibility'] }
	];
	const year = new Date().getFullYear();
</script>

<footer class="mt-16 border-t border-border bg-card">
	<div class="mx-auto max-w-6xl px-6 py-12">
		<div class="grid grid-cols-[1.5fr_repeat(4,1fr)] gap-10 max-lg:grid-cols-2 max-md:grid-cols-1">
			<div>
				<h3 class="font-display text-xl font-extrabold tracking-tight text-foreground">
					Kormi Shop
				</h3>
				<p class="mt-3 max-w-[280px] text-[13px] leading-relaxed text-muted-foreground">
					Trending tech, verified sellers, free shipping on orders over ৳2000. Shop with confidence.
				</p>
			</div>

			{#each SECTIONS as s (s.title)}
				<div>
					<h4 class="mb-3 text-[13px] font-bold tracking-wider text-foreground uppercase">
						{s.title}
					</h4>
					<ul class="flex flex-col gap-2">
						{#each s.links as l (l)}
							<li>
								<a
									href="#"
									class="text-[13px] text-muted-foreground transition-colors hover:text-primary"
								>
									{l}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>

		<div
			class="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6"
		>
			<p class="text-xs text-muted-foreground">© {year} Kormi Shop · All rights reserved</p>
			<p class="text-xs text-muted-foreground">Made in Bangladesh</p>
		</div>
	</div>
</footer>
