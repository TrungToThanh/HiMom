module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // ["import", { libraryName: "antd-mobile-rn" }],
      ["import", { libraryName: "@ant-design/react-native" }],
    ],
  };
};
