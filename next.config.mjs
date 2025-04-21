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
    // Enable app directory features
    appDir: true,
    // Improve handling of route groups
    serverComponentsExternalPackages: [],
    // Optimize build output
    optimizeCss: true,
    // Improve build performance
    turbotrace: {
      logLevel: 'error'
    }
  },
  // Ensure environment variables are properly loaded
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
  }
}

export default nextConfig
