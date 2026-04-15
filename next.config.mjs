/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  transpilePackages: ["@mui/material", "@emotion/react", "@emotion/styled"],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ]
  },
}

export default nextConfig
