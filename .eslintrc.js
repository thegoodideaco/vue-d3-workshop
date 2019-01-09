module.exports = {
  root: true,

  env: {
    es6:     true,
    node:    true,
    browser: true
  },

  extends: ['eslint:recommended', 'plugin:vue/essential'],
  plugins: ['html', 'prettier'],

  rules: {
    'vue/return-in-computed-property':            'off',
    'vue/no-side-effects-in-computed-properties': 'off',
    'vue/attribute-hyphenation':                  'error',
    'vue/valid-v-model':                          'warning',
    'func-call-spacing':                          2,
    'no-multi-spaces':                            [
      'error',
      {
        exceptions: {
          Property:           true,
          ImportDeclaration:  true,
          VariableDeclarator: true
        }
      }
    ],
    'no-mixed-spaces-and-tabs': 'error',
    'key-spacing':              [
      'error',
      {
        singleLine: {
          beforeColon: false,
          afterColon:  true
        },
        multiLine: {
          beforeColon: false,
          afterColon:  true
        },
        align: {
          beforeColon: false,
          afterColon:  true,
          on:          'value'
        }
      }
    ],
    'comma-spacing': ['error', {
      before: false,
      after:  true
    }],
    'no-tabs':                     0,
    'space-before-function-paren': 0,
    'space-in-parens':             0,
    'arrow-parens':                0,
    'valid-jsdoc':                 [
      0,
      {
        requireReturn:     false,
        requireReturnType: false
      }
    ],
    'comma-dangle': [
      'error',
      'never'
    ],
    'generator-star-spacing': 0,
    indent:                   [
      'error',
      2
    ],
    quotes: [
      'error',
      'single'
    ],
    'quote-props': [
      'error',
      'as-needed'
    ],
    eqeqeq: [
      'error',
      'always',
      {
        null: 'ignore'
      }
    ],
    'prefer-arrow-callback': [
      'error',
      {
        allowNamedFunctions: false,
        allowUnboundThis:    true
      }
    ],
    'no-console': [
      0,
      {
        allow: [
          'warn'
        ]
      }
    ],
    'no-inner-declarations': [
      'error',
      'both'
    ],
    'no-var':         'error',
    'no-unused-vars': [
      'error',
      {
        vars:               'all',
        args:               'after-used',
        ignoreRestSiblings: false
      }
    ],
    'no-func-assign': 'error',
    semi:             [
      'error',
      'never'
    ],
    'no-debugger':        0,
    'no-trailing-spaces': [
      2,
      {
        skipBlankLines: false
      }
    ]

  },

  parserOptions: {
    parser: 'babel-eslint',
    sourceType:   'module',
    ecmaVersion:  6,
    ecmaFeatures: {
      jsx: true
    }
  }
}