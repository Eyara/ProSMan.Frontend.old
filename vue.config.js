module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:54973',
                changeOrigin: true
            }
        }
    }
}