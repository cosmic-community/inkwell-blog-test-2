/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Changed: Ensure ESM-only packages are properly transpiled for server components
  transpilePackages: ['react-markdown', 'remark-gfm'],
}

module.exports = nextConfig