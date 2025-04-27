const nextConfig = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    // Mengatasi import yang menggunakan window di server
    if (isServer) {
      config.externals.push('window');
    }

    // Only apply PWA-specific settings during client-side builds
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
