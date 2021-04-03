import request from '@/api/request.js'; //请求对象
 
 const apis = {
	
	create (params){
		return request({url: `/admin_user/create`, method: 'POST', data:params})
	},
	delete (params){
		return request({url: `/admin_user/delete`, method: 'POST', data:params})
	},
	update (params){
		return request({url: `/admin_user/update`, method: 'POST', data:params})
	},
	read (params){
		return request({url: `/admin_user/read`,params:params, method: 'GET'})
	},
	readOneUser (params){
		return request({url: `/user/ReadOneUser`,params:params, method: 'GET'})
	},
 }
 
 export default apis;