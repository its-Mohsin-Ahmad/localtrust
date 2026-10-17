const path = require("path");

// GitHub Pages static-export mode is enabled by the deploy workflow
// (NEXT_STATIC_EXPORT=1). Normal dev/build behavior is unchanged.
const isStaticExport = process.env.NEXT_STATIC_EXPORT === "1";
// GitHub project pages are served from /<repo>, e.g. /localtrust
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import("next").NextConfig} */
const nextConfig = {
  ...(isStaticExport
    ? {
        output: "export",
        trailingSlash: true,
      }
    : {}),
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  images: {
    // Static hosting (GitHub Pages) has no Next.js image optimizer
    ...(isStaticExport ? { unoptimized: true } : {}),
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname, "src");
    return config;
  },
};

module.exports = nextConfig;
