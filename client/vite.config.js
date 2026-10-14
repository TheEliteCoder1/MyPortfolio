import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" makes asset paths work on any host (Netlify, Vercel, Render...)
export default defineConfig({ plugins: [react()], base: "./" });
