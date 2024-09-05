/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
      {
        protocol: 'https',
        hostname: 'replicate.delivery',
      },
    ],
    loader: 'custom',
    loaderFile: './app/image-loader.js',
  },
};

export default nextConfig;
