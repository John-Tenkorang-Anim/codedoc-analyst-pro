/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://codedoc-backend-n2p8.onrender.com'
  }
}

module.exports = nextConfig