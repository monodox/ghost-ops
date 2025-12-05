/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://github.com https://*.github.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https: blob: https://*.githubusercontent.com https://avatars.githubusercontent.com; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://api.github.com https://github.com https://*.github.com; frame-src 'self' https://github.com https://*.github.com; object-src 'none'; base-uri 'self';"
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig
