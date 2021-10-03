// @ts-check

const rule = require('../../lib/rules/no-browser-api-in-ssr-hook');
const { RuleTester } = require('eslint');

const parserOptions = {
    ecmaVersion: 2020,
    sourceType: 'module'
}

const parser = require.resolve('vue-eslint-parser');
  
// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------
  
const ruleTester = new RuleTester({
  parser,
  parserOptions,
})

ruleTester.run('no-browser-api-in-ssr-hook', rule, {
    valid: [
        {
            filename: 'test.vue',
            code: `
                export default {
                    computed: {
                      name() {
                        return '';
                      }
                    }
                }
            `,
            parserOptions
        },
    ],
    invalid: [
        {
          filename: 'test.vue',
          code: `
            <template>
              <div>{{ foo }}</div>
            </template>
            <script>
              export default {
                data() {
                  return {
                    s: document.name,
                  }
                },
                computed: {
                  foo() {
                      window.x = 3;
                      return 1;
                  }
                },
                created() {
                  console.log(window.xx)
                },
                beforeCreate() {
                  console.log(document.cookies)
                },

              }
            </script>
          `,
          errors: [
            {
              message: 'document in data maybe cause ssr error.',
              line: 9,
            },
            {
              message:
                'window in computed maybe cause ssr error.',
              line: 14
            },
            {
              message:
                'window in created maybe cause ssr error.',
              line: 19
            },
            {
              message:
                'document in beforeCreate maybe cause ssr error.',
              line: 22
            },
          ]
        },
    ]
})