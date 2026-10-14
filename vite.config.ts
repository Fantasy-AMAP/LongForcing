import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig(({ isSsrBuild }) => ({
  base: '/LongForcing/',
  plugins: [react()],
  build: { copyPublicDir: !isSsrBuild, sourcemap: false },
}));
