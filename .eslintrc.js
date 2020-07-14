module.exports = {
    root: true,
    env: {
        node: true,
        browser: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
        'plugin:prettier/recommended',
        'prettier/vue',
    ],
}
