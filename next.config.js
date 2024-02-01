/** @type {import('next').NextConfig} */
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/forecast/:path*',
        destination: 'https://api.open-meteo.com/v1/forecast/:path*',
      },
      {
        source: '/api/cities/:path*',
        destination: 'https://geocode.maps.co/search/:path*',
      },
    ];
  },
};
