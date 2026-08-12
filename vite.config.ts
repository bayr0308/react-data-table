import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const viteConfig = defineConfig({
  plugins: [react(), tailwindcss()],
});

export default viteConfig;
