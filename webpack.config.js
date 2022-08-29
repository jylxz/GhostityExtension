// webpack.config.js
const path = require("path");

module.exports = {
  devtool: "cheap-module-source-map",
  experiments: {
    topLevelAwait: true,
  },
  entry: {
    content: "./src/content/content.tsx",
    background: "./src/background/background.ts",
    popup: "./src/popup/popup.tsx",
  },
  output: {
    filename: "[name].webpack.js",
    path: path.resolve(__dirname, "dist"),
    iife: true,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(woff(2)?|ttf|eot)$/,
        type: "asset/resource",
        generator: {
          filename: "./fonts/[name][ext]",
        },
      },
    ],
  },
  resolve: {
    alias: {
      "@Azure": path.resolve(__dirname, "./src/services/Azure"),
      "@DeepL": path.resolve(__dirname, "./src/services/DeepL"),
      utils: path.resolve(__dirname, "./src/utils"),
    },
    extensions: [".ts", ".js", ".jsx", ".tsx"],
  },
};
