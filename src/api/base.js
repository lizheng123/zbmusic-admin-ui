/**
  * 接口域名的管理
  * es6 http://caibaojian.com/es6/module.html
  */
class Base {
	static admin_server = '';  //后台管理服务地址
	static api_server = ''; //通讯系统服务地址
	static websocket_server = ''; //websocket 链接地址

	static getServerInfo() {
		// 环境的切换
		if (process.env.NODE_ENV == 'development') {
			this.api_server = `/api`;

		} else if (process.env.NODE_ENV == 'debug') {
			// api_req = '/apis'
		} else if (process.env.NODE_ENV == 'production') {
			this.api_server = `/api`;
		}
		return {
			admin_server: this.admin_server,
			api_server: this.api_server,
			websocket_server: this.websocket_server
		}
	}
}


export default Base;
//    3d69f912b338e433aa330d458bb0f7c9