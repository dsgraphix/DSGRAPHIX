import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import fs from 'fs';

// Helper plugin: auto-generates a crisp, circular white-backed SVG favicon with embedded base64 logo
function faviconGeneratorPlugin() {
  return {
    name: 'favicon-generator',
    buildStart() {
      try {
        const logoPath = path.resolve(process.cwd(), 'public/logo.png');
        if (fs.existsSync(logoPath)) {
          const logoBuffer = fs.readFileSync(logoPath);
          const base64Logo = logoBuffer.toString('base64');
          const dataUri = `data:image/png;base64,${base64Logo}`;

          const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <clipPath id="circleClip">
      <circle cx="32" cy="32" r="30" />
    </clipPath>
  </defs>
  <!-- Circular White Background with high-contrast subtle dark border matching navbar -->
  <circle cx="32" cy="32" r="31" fill="#FFFFFF" stroke="#2A2A29" stroke-width="1.5" />
  <!-- Logo image inside circle clip -->
  <g clip-path="url(#circleClip)">
    <image href="${dataUri}" x="2" y="2" width="60" height="60" preserveAspectRatio="xMidYMid meet" />
  </g>
</svg>`;

          fs.writeFileSync(path.resolve(process.cwd(), 'public/favicon.svg'), svgContent);
        }
      } catch (err) {
        console.error('Favicon generator error:', err);
      }
    },
  };
}

// Generate immediately on config load
try {
  const logoPath = path.resolve(process.cwd(), 'public/logo.png');
  if (fs.existsSync(logoPath)) {
    const logoBuffer = fs.readFileSync(logoPath);
    const base64Logo = logoBuffer.toString('base64');
    const dataUri = `data:image/png;base64,${base64Logo}`;

    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <clipPath id="circleClip">
      <circle cx="32" cy="32" r="30" />
    </clipPath>
  </defs>
  <!-- Circular White Background with high-contrast subtle dark border matching navbar -->
  <circle cx="32" cy="32" r="31" fill="#FFFFFF" stroke="#2A2A29" stroke-width="1.5" />
  <!-- Logo image inside circle clip -->
  <g clip-path="url(#circleClip)">
    <image href="${dataUri}" x="2" y="2" width="60" height="60" preserveAspectRatio="xMidYMid meet" />
  </g>
</svg>`;

    fs.writeFileSync(path.resolve(process.cwd(), 'public/favicon.svg'), svgContent);
  }
} catch (e) {
  // Silent fallback
}

export default defineConfig({
  plugins: [react(), tailwindcss(), faviconGeneratorPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
    allowedHosts: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on('error', (err, req, res) => {
            // Silently return 503 so Vite does not spam terminal with ECONNREFUSED when backend is offline
            if (res && !res.headersSent) {
              res.writeHead(503, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Backend server offline on port 5000' }));
            }
          });
        },
      },
      '/uploads': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on('error', (err, req, res) => {
            if (res && !res.headersSent) {
              res.writeHead(503, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Backend server offline on port 5000' }));
            }
          });
        },
      },
    },
  },
});
