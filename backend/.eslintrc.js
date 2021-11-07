module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'simple-import-sort'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'simple-import-sort/imports': 'error',
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/member-delimiter-style": [ "off", {
      "multiline": {
        "delimiter": "none",
        "requireLast": true
      },
      "singleline": {
          "delimiter": "comma",
          "requireLast": true
      }
    }],
    "@typescript-eslint/no-empty-interface": "error",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-parameter-properties": "off",
    "@typescript-eslint/no-use-before-define": [ "error", "nofunc" ],
    "@typescript-eslint/no-unused-vars": [ "error", {
      "argsIgnorePattern": "^_"
    }],
    "eol-last": [ "warn", "always" ],
    "no-unused-vars": "off",
    "prettier/prettier": "error",
    "import/no-unresolved": "off",
    "import/namespace": "off",
    "valid-jsdoc": ["error", {
      "requireReturn": false,
      "requireReturnType": false,
      "requireParamType": false,
      "requireParamDescription": false
    }],
    "require-jsdoc": ["error", {
      "require": {
        "FunctionDeclaration": true,
        "MethodDefinition": true,
        "ClassDeclaration": false,
        "ArrowFunctionExpression": true,
        "FunctionExpression": false
      }
    }],
    "import/no-named-as-default": "off"
  },
};
