# Qrati Connect — React Example

Embeds [Qrati Connect](https://qrati.com) into a React + Vite app using the
**React component** integration, with a host-controlled
light/dark theme and a demo login for organizations that use custom auth.

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

## Configuration

| Variable               | Description                 |
| ---------------------- | -----------------------------|
| `VITE_ORGANIZATION_ID` | Your Qrati organization ID  |

## Other integration methods

- **Web component** — `<qrati-connect>` from the CDN (see the Svelte / Solid / Qwik / Lit examples).
- **Embed (no-code)** — single `<script>` tag with `data-*` attributes (see the Vanilla JS / Marko / Ember examples).

Docs: <https://www.npmjs.com/package/@qratilabs/qrati-connect>
