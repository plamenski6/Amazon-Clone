/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    i18n: {
        locales: ["en", "es", "de"],
        defaultLocale: "en",
    },
    images: {
        domains: ["fakestoreapi.com"],
    },
    swcMinify: true,
};

module.exports = nextConfig;
