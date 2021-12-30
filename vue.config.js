module.exports = {
    productionSourceMap: false,
    publicPath: '/flight-lc/',
    lintOnSave: false,
    assetsDir: 'static',
    filenameHashing: true,
    css: {
        requireModuleExtension: true,
        extract: true,
        sourceMap: false,
        //ant design
        loaderOptions: {
            less: {
                lessOptions: {
                    javascriptEnabled: true,
                }
            }
        },
    },
    // 所有 webpack-dev-server 的选项都支持
    // https://webpack.js.org/configuration/dev-server/
    devServer: {
        open: true,
        host: '0.0.0.0',
        port: 5000,
        https: false,
        hotOnly: false,
        disableHostCheck: true,
        // 将任何未知请求 (没有匹配到静态文件的请求) 代理到该字段指向的地方
        // proxy: {
        //     '/api-gateway': {
        //         target: 'https://wxcbb.lczq.com',
        //         // target: 'http://lczq.bullsoft.org',
        //         secure: false,
        //         // changeOrigin: true,
        //     },
        // },
    },
}