import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Path alias configuration
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  
  // Server configuration for development
  server: {
    port: 3000,
    host: true,
    open: true,
  },
  
  // Build optimizations
  build: {
    target: 'esnext',
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'stacks-vendor': ['@stacks/connect', '@stacks/transactions'],
        },
      },
    },
  },
  
  // Preview server configuration
  preview: {
    port: 4173,
    host: true,
  },
})
