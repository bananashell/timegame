var withAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["jotai-devtools"],
  experimental: {
    typedRoutes: true,
  },
};

module.exports = withAnalyzer(nextConfig);
