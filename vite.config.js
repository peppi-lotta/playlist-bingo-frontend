import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { VitePWA } from 'vite-plugin-pwa';

dotenv.config();

// Get the environment variables
const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: 'Music Bingo',
        short_name: 'Music Bingo',
        description: 'Music Bingo',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: 'src/public/logo.png',
            sizes: '96x96',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        // workbox options for generateSW
      }
    }),],
  define: {
    'process.env.REACT_APP_BASE_URL': JSON.stringify(REACT_APP_BASE_URL),
  },
}));




