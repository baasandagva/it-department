import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// Vercel дээр build хийхэд асуудал үүсгэж магадгүй Replit плагиныг авахгүй байхаар тохируулъя
export default defineConfig(async () => {
  const isProduction = process.env.NODE_ENV === "production";

  // Port болон Base Path-д default утга өгөх (Алдаа шидэхгүйгээр)
  const port = Number(process.env.PORT) || 8080;
  const basePath = process.env.BASE_PATH || "/";

  return {
    base: basePath,
    plugins: [
      react(),
      tailwindcss(),
      // Зөвхөн production биш үед болон Replit орчинд байгаа бол эдгээр плагиныг ажиллуулна
      ...(!isProduction && process.env.REPL_ID !== undefined
        ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
          // Runtime error overlay-г зөвхөн dev үед ашиглах
          await import("@replit/vite-plugin-runtime-error-modal").then((m) =>
            m.default(),
          ),
        ]
        : []),
    ],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "src"),
        "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
      },
      dedupe: ["react", "react-dom"],
    },
    root: path.resolve(import.meta.dirname),
    build: {
      // Vercel ихэвчлэн 'dist' хавтсыг хүлээдэг тул ийм болгов
      outDir: path.resolve(import.meta.dirname, "dist"),
      emptyOutDir: true,
    },
    server: {
      port,
      host: "0.0.0.0",
      allowedHosts: true,
    },
    preview: {
      port,
      host: "0.0.0.0",
      allowedHosts: true,
    },
  };
});