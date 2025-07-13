/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // Set a limit for the body size of server actions
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-02b4d765ea5d471c9521c79568970f8e.r2.dev",
        port: "",
        pathname: "/think-twice/post-images/**",
      },
    ],
  },
};

export default nextConfig;
