/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Ensure environment variables are properly loaded
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
  },
  // Disable source maps in production
  productionBrowserSourceMaps: false,
  // Disable strict mode for compatibility
  reactStrictMode: false,
  // Configure SWC for better compatibility
  swcMinify: true
}

export default nextConfig
