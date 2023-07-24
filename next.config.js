/** @type {import('next').NextConfig} */
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/weather/:path*',
        destination: `${process.env.API_URL}/weather/:path*`,
      },
    ];
  },
};
