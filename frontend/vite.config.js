import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port:5173,
        proxy: {
            // any request that starts with /api will be forwarded to 5000
            '/api': {
                target: 'http://localhost:5000',
                changeOrigin: true,
                secure: false,
              },
            },
          },
        })
        
//         import { defineConfig } from 'vite';
//         import path from 'path';


// export default defineConfig({
//   server: {
//     fs: {
//       allow: [
//         // 👇 Allow the frontend and admin directories
//         path.resolve(__dirname),
//         path.resolve(__dirname, '../frontend'), // if this config is in /admin
//         path.resolve(__dirname, '../admin'),    // if this config is in /frontend
//       ]
//     }
//   }
// });
