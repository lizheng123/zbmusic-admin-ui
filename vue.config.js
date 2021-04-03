
module.exports = {
  //代理设置
  devServer: {
    // hotOnly:true,    // 是否热更新;
    proxy: {
        '/apis': {     //这里最好有一个 /
            target: 'http://zbmusic.com/',  // 后台接口域名
            // ws: true,        //如果要代理 websockets，配置这个参数
            secure: false,  // 如果是https接口，需要配置这个参数
            changeOrigin:true,  //是否跨域
            pathRewrite: {
              '^/apis': ''
            }
        }
    }
  },
  css: {
    loaderOptions: {
        sass: {
            prependData: `@import "./src/styles/index";`,
        },
    },
},
}