const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  {
    ignores: ['dist/**', 'src/generated/**', '*.js'],
  },
  ...compat.extends(
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ),
  {
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
      },
      globals: {
        ...require('globals').node,
      },
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
      prettier: require('eslint-plugin-prettier'),
    },
    settings: {
      'import/resolver': {
        typescript: {},
      },
    },
    rules: {
      camelcase: 'off',
      'prettier/prettier': 'error',
      'class-methods-use-this': 'off',
      '@typescript-eslint/camelcase': 'off',
      'no-useless-constructor': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '_',
        },
      ],
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          ts: 'never',
        },
      ],
    },
  },
];
