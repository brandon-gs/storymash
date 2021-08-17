const path = require("path")

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

      // Use baseUrl
      config.resolve.modules.push(path.resolve("./"))
    }
    return config
  },
}
