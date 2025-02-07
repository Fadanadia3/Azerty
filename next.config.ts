import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  distDir: ".next", // Assure que Next.js utilise le bon répertoire pour la build
  eslint: {
    ignoreDuringBuilds: true, // Ignore les erreurs ESLint lors du build Netlify
  },
};

export default nextConfig;
