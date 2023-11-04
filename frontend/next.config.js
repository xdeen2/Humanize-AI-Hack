/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'res.cloudinary.com', 'localhost', "lh3.googleusercontent.com", "server.humanizeai.in"],
  },
}

module.exports = nextConfig
