module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: ["eslint:recommended", "plugin:vue/essential"],
  globals: {
    $t: true,
    $n: true,
    jest: true,
    beforeAll: true,
    beforeEach: true,
    afterAll: true,
    afterEach: true,
    expect: true,
    describe: true,
    fdescribe: true,
    xdescribe: true,
    it: true,
    xit: true,
    test: true,
    mockFn: true,
    AdobeMessagingExperienceClient: true // JARVIS
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  plugins: ["vue"],
  rules: {}
};
