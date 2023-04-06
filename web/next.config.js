/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['styles'],
    additionalData: `
      @import "styles/custom-bootstrap.scss";
      @import "styles/custom-variables.scss";
    `
  }
}

module.exports = nextConfig
