const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, 
  },
  images: {
    remotePatterns: [
      {
        hostname: 'ugqdmysezwjwwzmjsabv.supabase.co',
        protocol: 'https',
      },
    ],
  },
};

export default nextConfig;
