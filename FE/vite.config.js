import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    https: fs.existsSync('localhost-key.pem') && fs.existsSync('localhost-cert.pem') ? {
      key: fs.readFileSync('localhost-key.pem'),
      cert: fs.readFileSync('localhost-cert.pem'),
    } : false, // Nếu không tìm thấy file, dùng HTTP thay vì HTTPS
    host: 'localhost',
    port: 5173,
  }
});
