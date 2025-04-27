module.exports = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Disable SSR for specific libraries
    if (isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
        os: false,
        // Tambahkan library lain jika perlu
      };
    }
    return config;
  },
};
