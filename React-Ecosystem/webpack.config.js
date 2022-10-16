const path = require("path");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/index.js",
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js",
  },

  //   devServer: {
  //     contentBase: path.join(__dirname, "public/"),
  //     port: 3000,
  //     publicPath: "http://localhost:3000/dist/",
  //     hotOnly: true,
  //   },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 3000,
  },
  plugins: [
    new ReactRefreshPlugin(),
    new HtmlWebpackPlugin({
      filename: "./index.html",
      template: "./public/index.html",
    }),
  ].filter(Boolean),
};
