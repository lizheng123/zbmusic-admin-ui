import request from '@/api/request.js'; //请求对象
 
 const apis = {
	
	create (params){
		return request({url: `/tag/create`, method: 'POST', data:params})
	},
	delete (params){
		return request({url: `/tag/delete`, method: 'POST', data:params})
	},
	update (params){
		return request({url: `/tag/update`, method: 'POST', data:params})
	},
	read (){
		return request({url: `/tag/read`, method: 'GET'})
	}
 }
 
 export default apis;