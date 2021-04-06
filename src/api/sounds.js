import request from '@/api/request.js'; //请求对象
 
 const apis = {
	
	create (params){
		return request({url: `/admin_sounds/create`, method: 'POST', data:params})
	},
	delete (params){
		return request({url: `/admin_sounds/delete`, method: 'POST', data:params})
	},
	update (params){
		return request({url: `/admin_sounds/update`, method: 'POST', data:params})
	},
	read (params){
		return request({url: `/admin_sounds/read`,params:params, method: 'GET'})
	},
	readOneSound (params){
		return request({url: `/admin_sounds/ReadOneSound`,params:params, method: 'GET'})
	},
 }
 
 export default apis;