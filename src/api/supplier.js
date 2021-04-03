import request from '@/api/request.js'; //请求对象
 
 const apis = {
	
	create (params){
		return request({url: `/supplier/create`, method: 'POST', data:params})
	},
	delete (params){
		return request({url: `/supplier/delete`, method: 'POST', data:params})
	},
	update (params){
		return request({url: `/supplier/update`, method: 'POST', data:params})
	},
	read (){
		return request({url: `/supplier/read`, method: 'GET'})
	}
 }
 
 export default apis;