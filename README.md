# Qrati Connect — React Example

[![Qrati Connect — embeddable event photo galleries](public/qrati-connect-og.png)](https://qrati.com/connect)

Build live event photo galleries into React applications with guest uploads, full-screen lightbox, emoji reactions, and photo-contest leaderboards. [Explore Qrati Connect](https://qrati.com/connect) or [view the live React example](https://qrati.com/connect/react-example).

Embeds [Qrati Connect](https://qrati.com) into a React + Vite app using the
**React component** integration, with a host-controlled
light/dark theme with the widget rendered immediately.

## Integration method: React component

The SDK ships a React component. Import it and render:

```tsx
import QratiConnect from '@qratilabs/qrati-connect';

<QratiConnect organizationId={ORGANIZATION_ID} theme={theme} router="hash" />
```

## Run it

```bash
pnpm install
cp .env.example .env   # optional — sensible defaults are baked in
pnpm dev
```

## Other integration methods

- **Web component** — `<qrati-connect>` from the CDN (see the Svelte / Solid / Qwik / Lit examples).
- **Embed (no-code)** — single `<script>` tag with `data-*` attributes (see the Vanilla JS / Marko / Ember examples).

Docs: <https://www.npmjs.com/package/@qratilabs/qrati-connect>
