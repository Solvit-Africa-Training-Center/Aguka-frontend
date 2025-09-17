import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
<<<<<<< HEAD
   server: {
    proxy: {
      '/api': 'https://aguka.onrender.com'
    }
  }
  
})


=======
  server: {
    proxy: {
      "/api": {
        target: "https://aguka.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
>>>>>>> a2d6b72c08253f6f5cb5a67b019bc5a47f9fefeb
