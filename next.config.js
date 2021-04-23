// next.config.js
module.exports = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'https://criterionone.us1.list-manage.com/:path*',
          },
        ]
      },
  };