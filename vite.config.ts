import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { cloudflare } from '@cloudflare/vite-plugin';

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: process.env.BASE_PATH || (command === 'build' ? '/connect/react-example/' : '/'),
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    cloudflare(),
  ],
}))