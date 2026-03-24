# Qrati Connect — React Example

This example demonstrates how to integrate [Qrati Connect](https://qrati.com) into a **React** application using the Web Component (`<qrati-connect>`).

Qrati Connect is a fully embeddable, customizable event discovery widget that brings your community events, photo galleries, and leaderboards directly into your website — no backend required.

## Quick Start

```bash
pnpm install
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## How It Works

1. A `<script>` tag loads the Qrati Connect Web Component from the CDN
2. The `<qrati-connect>` custom element renders the widget inside your React app
3. All configuration is passed via HTML attributes

**Key file:** `src/config.ts` — update `EXAMPLE_ORG_ID` with your real organization ID from [qrati.com](https://qrati.com).

```tsx
// src/config.ts
export const EXAMPLE_ORG_ID = 'YOUR_ORGANIZATION_ID';
```

```tsx
// src/App.tsx
import { EXAMPLE_ORG_ID } from './config'

<qrati-connect
  organization-id={EXAMPLE_ORG_ID}
  theme="light"
  router="hash"
/>
```

## Available Attributes

| Attribute         | Type                  | Default    | Description                        |
| ----------------- | --------------------- | ---------- | ---------------------------------- |
| `organization-id` | `string`              | —          | Your organization ID (**required**)|
| `theme`           | `"light"` \| `"dark"` | `"light"`  | Color theme                        |
| `router`          | `"memory"` \| `"hash"`| `"memory"` | Routing strategy                   |
| `uid`             | `string`              | —          | User ID (for custom auth)          |
| `fname`           | `string`              | —          | First name (for custom auth)       |
| `lname`           | `string`              | —          | Last name (for custom auth)        |

## Tech Stack

- [React](https://react.dev) 19
- [Vite](https://vite.dev) 8
- [TypeScript](https://typescriptlang.org) 5.9
- [Qrati Connect](https://qrati.com) Web Component

## Learn More

- [Qrati Connect Documentation](https://qrati.com/docs)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vite.dev)

---

### Open it in

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/qrati-labs/qrati-connect-react-example)
[![Open in CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/qrati-labs/qrati-connect-react-example)
[![Open in VS Code](https://img.shields.io/badge/Open_in-VS_Code-blue?logo=visualstudiocode)](https://vscode.dev/github/qrati-labs/qrati-connect-react-example)

---

Built with [Qrati Connect](https://qrati.com) — the embeddable event discovery widget for modern web apps.
