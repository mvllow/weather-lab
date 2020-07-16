const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
    purge: ['./src/**/*.vue'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...fontFamily.sans],
            },
            borderColor: {
                default: 'var(--border)',
            },
            boxShadow: {
                default: 'var(--shadow)',
            },
            colors: {
                primary: 'var(--primary)',
                fg: 'var(--fg)',
                label: 'var(--label)',
                overlay: 'var(--overlay)',
                base: 'var(--base)',
            },
        },
    },
}
