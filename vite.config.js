import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

const env = loadEnv("development", process.cwd(), 'VITE');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: env.VITE_PORT_FRONTEND,
    host: env.VITE_HOSTNAME
  }
})
