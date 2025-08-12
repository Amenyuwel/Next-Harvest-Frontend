/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // Main navigation routes
      {
        source: '/dashboard',
        destination: '/pages/dashboard',
      },
      {
        source: '/records',
        destination: '/pages/records',
      },
      {
        source: '/reports',
        destination: '/pages/reports',
      },
      {
        source: '/audit',
        destination: '/pages/audit',
      },
      {
        source: '/train',
        destination: '/pages/train',
      },
      {
        source: '/profile',
        destination: '/pages/profile',
      },
      {
        source: '/settings',
        destination: '/pages/settings',
      },
    ];
  },
};

export default nextConfig;
