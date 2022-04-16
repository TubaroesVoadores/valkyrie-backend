module.exports = {
  env: {
    browser: false,
    es6: true,
    node: true,
  },
  extends: ["airbnb-base"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    quotes: ["single"],
    "no-console": "off",
    "linebreak-style": "off",
    "import/prefer-default-export": "off",
    "prefer-const": [
      "error",
      {
        destructuring: "all",
      },
    ],
    "max-len": [
      "warn",
      {
        code: 140,
        ignoreUrls: true,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
  },
};
