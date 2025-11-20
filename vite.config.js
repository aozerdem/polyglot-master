import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Define the public placeholder variables
const VITE_APP_ID = process.env.VITE_APP_ID || 'vercel-public-id';
const VITE_FIREBASE_CONFIG = process.env.VITE_FIREBASE_CONFIG || '{ "apiKey": "PUBLIC_PLACEHOLDER_KEY" }';
const VITE_AUTH_TOKEN = process.env.VITE_AUTH_TOKEN || null;

// Convert config string to a JavaScript object string
const FB_CONFIG_STRING = JSON.stringify(VITE_FIREBASE_CONFIG);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // This creates a global object accessible in the React app
    '__FIREBASE_VARS__': {
      APP_ID: JSON.stringify(VITE_APP_ID),
      CONFIG: FB_CONFIG_STRING,
      AUTH_TOKEN: JSON.stringify(VITE_AUTH_TOKEN)
    }
  }
})