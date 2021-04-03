import request from '@/api/request.js'; //请求对象
 
 const apis = {
	
	create (params){
		return request({url: `/store/create`, method: 'POST', data:params})
	},
	delete (params){
		return request({url: `/store/delete`, method: 'POST', data:params})
	},
	update (params){
		return request({url: `/store/update`, method: 'POST', data:params})
	},
	read (){
		return request({url: `/store/read`, method: 'GET'})
	}
 }
 
 export default apis;