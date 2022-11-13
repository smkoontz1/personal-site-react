const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    additionalData: `
      @import "${path.join(__dirname, 'styles/custom-bootstrap.scss')}";
      @import "${path.join(__dirname, 'styles/custom-variables.scss')}";
    `
  }
}

module.exports = nextConfig
