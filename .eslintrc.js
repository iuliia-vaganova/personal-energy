module.exports = {
  root: true,
  plugins: ['react', 'react-hooks'],
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jest: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:react-hooks/recommended', 'prettier'],
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  rules: {
    // http://eslint.org/docs/rules/
    'linebreak-style': ['error', 'unix'],

    // https://github.com/yannickcr/eslint-plugin-react
    'react/display-name': 'off',
    'react/no-typos': 'error',
    'react/prop-types': 'off',
    'react/style-prop-object': 'error',

    // https://github.com/facebook/react/tree/master/packages/eslint-plugin-react-hooks
    'react-hooks/exhaustive-deps': 'off',
  },
  overrides: [
    {
      files: '**/*.+(ts|tsx)',
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
      plugins: ['@typescript-eslint'],
      extends: ['plugin:@typescript-eslint/eslint-recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
      rules: {
        // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
        '@typescript-eslint/ban-ts-comment': [
          'error',
          {
            'ts-expect-error': 'allow-with-description',
            'ts-ignore': true,
            'ts-nocheck': true,
            'ts-check': false,
            minimumDescriptionLength: 3,
          },
        ],
      },
    }
  ],
};
