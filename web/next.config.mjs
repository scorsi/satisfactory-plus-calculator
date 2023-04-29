/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },

  images: {
    domains: ["www.gravatar.com", "firebasestorage.googleapis.com"],
  }
};

export default config;
