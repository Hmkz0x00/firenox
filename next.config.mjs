/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Serve modern formats; next/image picks the best one the browser accepts.
    formats: ['image/avif', 'image/webp'],
    qualities: [70, 75, 85],
    // One year: every image is either fingerprinted (static import) or versioned by filename.
    minimumCacheTTL: 31536000,
  },
}

export default nextConfig
