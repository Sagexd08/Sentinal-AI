/** @type {import('next').NextConfig} */
const nextConfig = {
  // Skip all checks and validations
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Ensure images are properly handled
  images: {
    unoptimized: true,
  },
  // Ensure environment variables are properly loaded
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://sentinal-ai-backend.vercel.app'
  },
  // Disable source maps in production
  productionBrowserSourceMaps: false,
  // Disable strict mode for compatibility
  reactStrictMode: false,
  // Disable powered by header
  poweredByHeader: false,
  // Output as standalone for Docker deployment
  output: 'standalone',
  // Transpile dependencies that use modern JavaScript features
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei']
}

module.exports = nextConfig
