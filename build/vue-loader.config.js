module.exports = (isDev) => {
    return {
        preserveWhitepace: true,
        extractCSS: !isDev,
        cssModules: {
            localInentName: isDev ? '[path]-[name]-[hash:base64:5]':'[hash:base64:5]',
            camelCase: true
        }
    }
}