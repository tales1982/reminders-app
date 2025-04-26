import withPWA from 'next-pwa';

const isDev = process.env.NODE_ENV === 'development';

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true, // habilita suporte a SSR e nomes de classes
  },
};

const withPWAModule = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: isDev,
});

export default withPWAModule(nextConfig);
