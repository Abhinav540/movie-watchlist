import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react({
      // Enable Fast Refresh
      fastRefresh: true,
      // Include .jsx files
      include: "**/*.jsx",
    }),
    tailwindcss(),
  ],
  resolve: {
    extensions: ['.mjs', '.js', '.jsx', '.json']
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    // Ensure proper module format
    rollupOptions: {
      output: {
        manualChunks: undefined,
      }
    },
    // Target modern browsers
    target: 'es2015',
    // Use esbuild for minification (faster and built-in)
    minify: 'esbuild',
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'axios']
  }
})