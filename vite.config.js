import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

// Get the environment variables
const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  define: {
    'process.env.REACT_APP_BASE_URL': JSON.stringify(REACT_APP_BASE_URL),
  },
}));
