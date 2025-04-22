import withPWA from 'next-pwa';

const isDev = process.env.NODE_ENV === 'development';

const nextConfig = {
  reactStrictMode: true,
};

const withPWAModule = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: isDev,
});

export default withPWAModule(nextConfig);
