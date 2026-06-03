<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel';
	import { Button } from '$lib/components/ui/button';

	const U = (id: string) =>
		`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`;

	const slides = [
		{
			label: "Men's Fashion",
			sub: 'Shirts, shoes & watches — up to 40% off',
			cta: 'Shop men',
			href: '/?category=mens-shirts',
			img: U('1490114538077-0a7f8cb49891')
		},
		{
			label: 'New Gadgets',
			sub: 'Phones, tablets & smart tech',
			cta: 'Shop tech',
			href: '/?category=smartphones',
			img: U('1511707171634-5f897ff02aa9')
		},
		{
			label: "Women's Edit",
			sub: 'Trending tops & seasonal picks',
			cta: 'Shop women',
			href: '/?category=tops',
			img: U('1512436991641-6745cdb1723f')
		}
	];
</script>

<Carousel.Root opts={{ loop: true, align: 'start' }} class="mb-8">
	<Carousel.Content>
		{#each slides as s (s.href)}
			<Carousel.Item>
				<a href={s.href} class="group relative block overflow-hidden rounded-xl">
					<img
						src={s.img}
						alt={s.label}
						class="h-[300px] w-full object-cover transition-transform duration-500 group-hover:scale-105 max-md:h-[220px]"
					/>
					<div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
					<div class="absolute inset-0 flex flex-col justify-center gap-3 p-10 text-white max-md:p-7">
						<div>
							<h2 class="font-display text-[28px] font-extrabold tracking-tight max-md:text-[22px]">
								{s.label}
							</h2>
							<p class="mt-1 text-[15px] opacity-90">{s.sub}</p>
						</div>
						<Button variant="secondary" size="lg" class="w-fit">{s.cta}</Button>
					</div>
				</a>
			</Carousel.Item>
		{/each}
	</Carousel.Content>
	<Carousel.Previous class="left-4" />
	<Carousel.Next class="right-4" />
</Carousel.Root>
