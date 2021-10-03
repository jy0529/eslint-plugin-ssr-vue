module.exports = {
    rules: {
        'no-browser-api-in-ssr-hook': require('./rules/no-browser-api-in-ssr-hook.js'),
    },
    configs: {
        recommended: {
            parser: require.resolve('vue-eslint-parser'),
            parserOptions: {
                ecmaVersion: 2018,
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true
                }
            },
            plugins: ['ssr-vue'],
            rules: {
                'ssr-vue/no-browser-api-in-ssr-hook': 'error',
            }
        }
    },
    processors: {
        '.vue': require.resolve('eslint-plugin-vue/lib/processor')
    }
}