
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Otimizações para Cloudflare Pages
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        // Code splitting manual para otimizar carregamento
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-select'],
          'form-vendor': ['react-hook-form', 'zod'],
          'query-vendor': ['@tanstack/react-query'],
          'utils': ['date-fns', 'clsx', 'tailwind-merge'],
          'icons': ['lucide-react'],
        },
      },
    },
    // Limites de chunk otimizados
    chunkSizeWarningLimit: 1000,
    // Assets inline para arquivos pequenos
    assetsInlineLimit: 4096,
  },
  // Otimizações de desenvolvimento
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
  // Performance de build
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  },
}));
