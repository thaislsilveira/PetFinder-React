// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
const storybook = require('eslint-plugin-storybook');

const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  {
    ignores: [
      'dist/**',
      'styled-system/**',
      'styled-system-studio/**',
      '*.js',
      '*.cjs',
    ],
  },
  ...compat.extends(
    'plugin:react/recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ),
  {
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
      },
      globals: {
        ...require('globals').browser,
      },
    },
    plugins: {
      react: require('eslint-plugin-react'),
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
      'react-hooks': require('eslint-plugin-react-hooks'),
      prettier: require('eslint-plugin-prettier'),
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {},
      },
    },
    rules: {
      camelcase: 'off',
      'prettier/prettier': 'error',
      'jsx-a11y/label-has-associated-control': 'off',
      'react/no-array-index-key': 'off',
      'react/jsx-one-expression-per-line': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'no-unused-expressions': 'off',
      'no-use-before-define': 'off',
      'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
      'import/prefer-default-export': 'off',
      'import/no-duplicates': 'off',
      '@typescript-eslint/camelcase': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      'import/extensions': [
        'error',
        'ignorePackages',
        { ts: 'never', tsx: 'never' },
      ],
      // This codebase consistently uses `const X: React.FC = () => {}` and
      // dropped defaultProps in favor of default parameters (React 18
      // deprecated defaultProps on function components) -- both newly
      // enforced by the airbnb 19 bump, but neither matches this project.
      'react/function-component-definition': 'off',
      'react/require-default-props': 'off',
    },
  },
  {
    files: [
      '**/*.test.ts',
      '**/*.test.tsx',
      '**/*.stories.tsx',
      'src/setupTests.ts',
      '.storybook/**/*.{ts,tsx}',
    ],
    rules: {
      'import/no-extraneous-dependencies': 'off',
    },
  },
  ...storybook.configs['flat/recommended'],
];
