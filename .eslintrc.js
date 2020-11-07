module.exports = {
    env: {
        browser: true,
        node: true,
        es2020: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
        project: './tsconfig.json',
        tsconfigRootDir: '.',
    },
    plugins: ['@typescript-eslint', 'react', 'prettier'],
    extends: [
        'airbnb',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'prettier',
        'prettier/@typescript-eslint',
        'prettier/react',
    ],
    rules: {
        'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
        'import/extensions': 0,
        'react/prop-types': 0,
        'react/jsx-props-no-spreading': ['error', { custom: 'ignore' }],
        'prettier/prettier': 'error',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': 'error',
        '@typescript-eslint/no-var-requires': 'off',
        'no-underscore-dangle': 'off',
        'import/prefer-default-export': 'off',
        'global-require': 'off',
        'no-var-requires': 'off',
    },
    settings: {
        'import/resolver': {
            typescript: {},
        },
    },
}
