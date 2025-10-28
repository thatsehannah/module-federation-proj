const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: "index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: "marketing@http://localhost:8081/remoteEntry.js",
      },
      shared: packageJson.dependencies, //this allows Webpack to manage my dependencies from package.json for me so I don't have to manually add them to the array
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

//by listing the devConfig second, the devConfig is going to take priority over any similar properties in the commonConfig
module.exports = merge(commonConfig, devConfig);
