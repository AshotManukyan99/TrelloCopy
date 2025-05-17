import js from '@eslint/js'
import globals from 'globals'
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'
import {fixupConfigRules} from '@eslint/compat'
import tseslint from 'typescript-eslint'

export default tseslint.config(
    {ignores: ['dist']},
    {
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],

        languageOptions: {
            globals: globals.browser,
            parserOptions: {
                ecmaVersion: 2020,
                ecmaFeatures: {jsx: true},
            },
        },

        settings: {
            react: {version: 'detect'},
        },

        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommended,
            ...fixupConfigRules(pluginReactConfig),
        ],

        plugins: {
            '@typescript-eslint': tseslint,
        },

        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            'no-console': ['error', {allow: ['error']}],
            'prefer-const': [
                'error',
                {destructuring: 'any', ignoreReadBeforeAssign: false},
            ],
            'no-var': 'error',
            'no-new-object': 'error',
            'object-shorthand': ['error', 'always'],
            'quote-props': ['error', 'as-needed'],
            'no-array-constructor': 'error',
            'no-prototype-builtins': 'off',
            'prefer-destructuring': [
                'off',
                {array: true, object: true},
                {enforceForRenamedProperties: false},
            ],
            'react/display-name': 'off',
            'react/prop-types': 'off',
            quotes: 'off',
            'prefer-template': 'error',
            'template-curly-spacing': ['error', 'never'],
            'func-style': ['off', 'expression', {allowArrowFunctions: true}],
            'wrap-iife': ['error', 'outside'],
            'space-before-function-paren': [
                'error',
                {anonymous: 'never', named: 'never', asyncArrow: 'always'},
            ],
            'arrow-parens': [2, 'as-needed', {requireForBlockBody: true}],
            'arrow-spacing': ['error', {before: true, after: true}],
            'arrow-body-style': ['error', 'as-needed'],
            'generator-star-spacing': [
                'error',
                {before: false, after: true, anonymous: 'after', method: {before: true, after: true}},
            ],
            'dot-notation': ['error', {allowKeywords: true}],
            'no-confusing-arrow': 'error',
            'no-useless-constructor': 'error',
            'no-dupe-class-members': 'error',
            'no-duplicate-imports': 'error',
            'object-curly-spacing': ['error', 'always'],
            'array-bracket-spacing': ['error', 'never'],
            'space-in-parens': ['error', 'never'],
            'space-before-blocks': ['error', 'always'],
            'keyword-spacing': ['error', {before: true}],
            'space-infix-ops': 'error',
            'spaced-comment': ['error', 'always'],
            indent: ['error', 2, {SwitchCase: 1}],
            'newline-per-chained-call': ['error', {ignoreChainWithDepth: 2}],
            'no-whitespace-before-property': 'error',
            'padded-blocks': ['error', 'never'],
            curly: ['error', 'all'],
            semi: ['error', 'always'],
            'comma-style': ['error', 'last'],
            'comma-dangle': ['error', 'always-multiline'],
            'brace-style': ['error', '1tbs'],
            'eol-last': 'error',
            'max-len': ['off', {code: 120, ignoreUrls: true, ignoreStrings: true}],
            'no-eval': 'error',
            'no-useless-escape': 'error',
            'prefer-rest-params': 'error',
            'no-new-func': 'error',
            'prefer-spread': 'off',
            'prefer-arrow-callback': 'error',
            'no-undef': 'error',
            'one-var': ['error', 'never'],
            'no-plusplus': ['error', {allowForLoopAfterthoughts: true}],
            eqeqeq: ['error', 'always', {null: 'ignore'}],
            'no-case-declarations': 'error',
            'no-unneeded-ternary': 'error',
            'no-implicit-coercion': 'off',
            radix: ['error', 'as-needed'],
            'id-length': [
                'error',
                {
                    properties: 'never',
                    exceptions: ['x', 'y', 'z', 'h', 'm', 's', '_', 'i', 'j', 'a', 'b'],
                },
            ],
            camelcase: [
                'off',
                {ignoreDestructuring: true, ignoreImports: true, properties: 'never'},
            ],
            'new-cap': 'off',
            'no-underscore-dangle': 'off',
            'no-restricted-syntax': [
                {
                    selector: "CallExpression[callee.name='isNaN']",
                    message: 'Please use Number.isNaN instead',
                },
                {
                    selector: "CallExpression[callee.name='isFinite']",
                    message: 'Please use Number.isFinite instead',
                },
                {
                    selector: "CallExpression[callee.object.name='Math'][callee.property.name='pow']",
                    message: 'Prefer the ** operator over Math.pow().',
                },
            ],
        },
    },
)
