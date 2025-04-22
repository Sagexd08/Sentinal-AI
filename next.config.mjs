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
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
  },
  // Disable source maps in production
  productionBrowserSourceMaps: false,
  // Disable strict mode for compatibility
  reactStrictMode: false,
  // Use static export for better compatibility with Vercel
  output: 'export',
  // Disable type checking during build
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  // Disable trailing slash
  trailingSlash: false,
  // Disable powered by header
  poweredByHeader: false,
  // Disable source maps
  generateBuildId: () => 'build'
}

export default nextConfig
