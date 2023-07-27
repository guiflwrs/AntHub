/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },

  redirects: async () => ([
    {
      source: '/',
      destination: '/relevantes/1',
      permanent: false
    },
    {
      source: '/relevantes',
      destination: '/relevantes/1',
      permanent: false,
    },
    {
      source: '/recentes',
      destination: '/recentes/1',
      permanent: false,
    },
  ])
}

module.exports = nextConfig
