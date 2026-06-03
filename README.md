# 🛒 Kormi Shop

A demo storefront that sends `order_confirmation` events to the Kormi API.
Built with **SvelteKit** (Svelte 5 runes), **shadcn-svelte**, and **Tailwind CSS v4**.

## Features

- **Multi-route app** — Shop, Cart, Checkout, Connection — with a sticky navbar and live cart badge
- **Global state** via Svelte 5 runes stores (`$lib/cart.svelte.ts`, `$lib/config.svelte.ts`)
- **Persistence** — API config and a stable per-phone customer id are saved to `localStorage`
- **Order placement** — `POST {url}/v1/events` with the same payload as the original demo; results shown via `svelte-sonner` toasts
- **Professional theme** — neutral shadcn tokens with a restrained lime accent; Plus Jakarta Sans + Space Grotesk fonts

## Project structure

```
src/
  lib/
    products.ts            catalog
    cart.svelte.ts         cart store ($state / $derived)
    config.svelte.ts       API config store + resolveCustomerId
    api.ts                 placeOrder → POST /v1/events
    components/
      Navbar.svelte        sticky nav, active route, cart badge
      PageHeader.svelte    reusable page title
      Products.svelte      catalog list
      Cart.svelte          line items + quantity steppers
      Checkout.svelte      delivery form + place order
      ConnectionConfig.svelte
      ui/                  shadcn-svelte components
  routes/
    +layout.svelte         navbar shell + Toaster
    +page.svelte           / (Shop)
    cart/+page.svelte
    checkout/+page.svelte
    connection/+page.svelte
```

## Developing

Install dependencies and start the dev server:

```sh
pnpm install
pnpm dev
```

## Usage

1. Open **Connection** and set the **API URL** and **API Key** (`X-API-Key`). Optionally set a **Store ID** (`X-Store-Id`).
2. On **Shop**, add products to the cart; adjust quantities in **Cart**.
3. Fill the **Checkout** form and place the order. The `kormi_event_id` from the response is shown in a toast.

Config is stored in this browser's `localStorage` only.

## Building

```sh
pnpm build
pnpm preview
```

> To deploy, install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
