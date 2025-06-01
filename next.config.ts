import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const config: NextConfig = {
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
};

export default withBundleAnalyzer({
  enabled: true,
})(config);
