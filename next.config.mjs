/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [{ source: "/", destination: "/weatherpage", permanent: true }];
  },
  reactStrictMode: true,
  images: {
    domains: ["apod.nasa.gov"],
  },
};

export default nextConfig;
