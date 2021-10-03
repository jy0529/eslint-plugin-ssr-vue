# eslint-plugin-ssr-vue
A ESLint plugin for linting vue ssr hook, avoid browser api running in node env.

# Quick-start

## Installation
    yarn add -D eslint-plugin-ssr-vue
## Usage
    {
        extends: ["plugin:ssr-vue/recommended"]
    }

## Supported Rules
### no-browser-api-in-ssr-hook
Disallow use browser api in ssr hook, as this may be cause error in node env.

    {
        "ssr-vue/no-browser-api-in-ssr-hook": "error"
    }