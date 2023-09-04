module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['airbnb', 'standard-with-typescript', 'plugin:react/recommended'],
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react'],
    rules: {
        '@typescript-eslint/comma-dangle': 'off',
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/semi': 'off',
        'import/no-unresolved': 'off',
        'linebreak-style': 'off',
        'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
        'react/jsx-indent': ['error', 4],
        'no-var': 'off',
        'react/jsx-props-no-spreading': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        'import/extensions': 'off',
        '@typescript-eslint/space-before-function-paren': 'off',
        'react/jsx-indent-props': ['error', 4],
        'react/no-children-prop': 'off',
        'react/jsx-no-bind': 'off',
        'prefer-arrow-callback': 'off',
        'jsx-quotes': ['error', 'prefer-single'],
        quotes: [
            'error',
            'single',
            { allowTemplateLiterals: true, avoidEscape: true },
        ],
        '@typescript-eslint/member-delimiter-style': 'off',
        'import/no-mutable-exports': 'off',
        'prefer-const': 'off',
        '@typescript-eslint/no-dynamic-delete': 'off',
        'vars-on-top': 'off',
        'react/jsx-wrap-multilines': 'off',
    },
    ignorePatterns: ['next.config.js', 'tsconfig.json'],
};
