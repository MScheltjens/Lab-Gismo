// https://github.com/amannn/next-intl/discussions/324

import nextIntl from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
};

const withNextIntl = nextIntl('./i18n/i18n.ts');

export default withNextIntl(nextConfig);
