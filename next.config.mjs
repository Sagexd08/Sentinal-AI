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
  // Add experimental features to fix build issues
  experimental: {
    // Optimize CSS
    optimizeCss: true
  },
  // External packages for server components
  serverExternalPackages: [],
  // Ensure environment variables are properly loaded
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
  }
}

export default nextConfig
