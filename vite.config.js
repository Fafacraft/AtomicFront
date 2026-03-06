import { defineConfig } from "vite"

export default defineConfig({
  preview: {
    host: true,
    allowedHosts: ["atomicfront.onrender.com"]
  }
})