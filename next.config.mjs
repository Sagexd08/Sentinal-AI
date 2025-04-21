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
  // Disable static optimization for problematic routes
  staticPageGenerationTimeout: 180,
  // Configure output for better compatibility
  output: 'standalone',
  // Disable source maps in production
  productionBrowserSourceMaps: false,
  // Disable strict mode for compatibility
  reactStrictMode: false,
  // Configure SWC for better compatibility
  swcMinify: true,
  experimental: {
    // Ensure SWC is properly configured
    forceSwcTransforms: true
  }
}

export default nextConfig
