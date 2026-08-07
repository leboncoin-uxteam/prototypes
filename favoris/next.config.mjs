/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production"
const basePath = isProd ? "/prototypes/favoris" : ""

const nextConfig = {
  output: "export",
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
