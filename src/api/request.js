/**
  * axios封装
  * 请求拦截、响应拦截、错误统一处理
  */
import axios from 'axios';
// import router from '@/router/index.js';
// import store from '@/store/index.js';
import {Message} from 'element-ui'
// import base from './base.js'; // 导入接口域名列表
 /**
   * 提示函数
   * type info  success  warning  error
*/
const tip = (msg,type) => {
    Message({
      message:msg,
      type:type
    })
}

/**
  * 请求失败后的错误统一处理
  * @param {Number} status 请求失败的状态码
*/
 const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
        tip('登录失效，请重新登录','info');
        break;
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
        tip('登录过期，请重新登录','info');
        break;
    // 404请求不存在
    case 404:
        break;
    // 400请求错误
    case 400:
        tip(other,'error');
        break;
        default:
        tip(other,'error');
        console.log(other);
  }

}


//创建axios实例
var instance = axios.create({
    timeout: 15000,
    // baseURL:base.getServerInfo().api_server
});

//post请求头
// instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// instance.defaults.headers.common['X-token'] = '12111111111111111111';

instance.defaults.baseURL = '/apis';

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
      // 在发送请求之前做些什么
      // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
      // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
      // const token = store.state.systemConfig.token;
      // token && (config.headers['x-token'] = token);
      // config.headers['X-token'] = '12111111111111111111';
      // config.headers['X-token'] = '4154554545';
      // store.commit('isRequestingStateChange',true)
      return config;
  }, function (error) {
    // 对请求错误做些什么
    // store.commit('isRequestingStateChange',false)
    return Promise.reject(error);
  });

// 添加响应拦截器
instance.interceptors.response.use(
    res => {
        return res.status === 200 ? Promise.resolve(res) : Promise.reject(res)
    }, 
    error => {
      const { response } = error;
      if (response) {
        // 请求已发出，但是不在2xx的范围
        errorHandle(response.status, response.data.msg);
        // store.commit('isRequestingStateChange',false)
        console.log('请求已发出，但是不在2xx的范围',response)
        return Promise.reject('请求错误');
      } else {
        // return
        // 处理断网的情况
        // eg:请求超时或断网时，更新state的network状态
        // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
        // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
        // store.commit({
          //   type: 'setNetwork',
          //   link: false
          // })
        // console.log('请求已发出但错误',error)
        return Promise.reject('无法连接到服务器');
      }
    }
);


 export default instance;
 