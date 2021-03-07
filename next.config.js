const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin")

module.exports = {
  useFileSystemPublicRoutes: true,
  env: {
    API_SECRET: process.env.API_SECRET,
    PORT: process.env.PORT,
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.module.rules.push({
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          // eslint options (if necessary)
        },
      })
    }
    if (config.resolve.plugins) {
      config.resolve.plugins.push(
        new TsconfigPathsPlugin({
          configFile: "./frontend/tsconfig.json",
          baseUrl: "./frontend/",
        })
      )
    } else {
      config.resolve.plugins = [
        new TsconfigPathsPlugin({
          configFile: "./frontend/tsconfig.json",
          baseUrl: "./frontend/",
        }),
      ]
    }
    return config
  },
}
