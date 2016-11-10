module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    'import/no-unresolved': 0,
    'no-param-reassign': 0,
    'no-restricted-syntax': 0,
    // allow debugger during development
    'no-debugger': 0,
    'no-console': 0,
    'arrow-body-style': 0,
    'spaced-comment': 0,
    'linebreak-style': 0,
    'import/no-extraneous-dependencies': 0,
    'import/extensions': 0,
    'no-prototype-builtins': 0,
  }
}
