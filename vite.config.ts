import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { blogApiMiddleware } from './scripts/blogSyncServer.mjs';

export default defineConfig({
  plugins: [react(), blogApiMiddleware()],
  server: {
    port: 3000,
    host: true,
  },
});
