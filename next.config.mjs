/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Type-checking still gates the build; we don't block builds on lint.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
