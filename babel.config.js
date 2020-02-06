module.exports = {
  presets: ["@vue/app"],
  env: {
    test: {
      presets: [["@babel/preset-env", { targets: { node: "current" } }]],
      plugins: ["syntax-async-functions"]
    }
  }
};
