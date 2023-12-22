module.exports = {
  // ... 다른 설정 ...
  mode: "development",
  output: {
    chunkFilename: "[id].js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-syntax-dynamic-import"],
            // experiments: {
            //   topLevelAwait: true,
            //   dynamicImport: true,
            // },
          },
        },
      },
    ],
  },
};
