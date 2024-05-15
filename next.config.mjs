/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.imgur.com'],
  },
  compiler: {
    styledComponents: {
      ssr: true,
    },
  },
};

export default nextConfig;
