import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const viteConfig = defineConfig({
  base: "/react-data-table/",
  plugins: [react(), tailwindcss()],
});

export default viteConfig;
