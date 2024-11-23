/** @type {import('next').NextConfig} */
const webpack = require("webpack");
const nextConfig = {
  reactStrictMode: false,
  webpack: (config, { isServer }) => {
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /symbol-crypto-wasm-node/,
        "../../../symbol-crypto-wasm-web/symbol_crypto_wasm.js"
      )
    );

    config.experiments = {
      asyncWebAssembly: true,
      topLevelAwait: true,
      layers: true,
    };

    return config;
  },
  // ここにheaders設定を追加
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate",
          },
          { key: "Pragma", value: "no-cache" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
