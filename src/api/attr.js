import request from '@/api/request.js'; //请求对象
 
 const apis = {
	
	create (params){
		return request({url: `/attr/create`, method: 'POST', data:params})
	},
	delete (params){
		return request({url: `/attr/delete`, method: 'POST', data:params})
	},
	deleteChildAttr (params){
		return request({url: `/attr/deleteChildAttr`, method: 'POST', data:params})
	},
	update (params){
		return request({url: `/attr/update`, method: 'POST', data:params})
	},
	read (){
		return request({url: `/attr/read`, method: 'GET'})
	},
	readChildAttrs (params){
		return request({url: `/attr/readChildAttrs`, params:params, method: 'GET'})
	},
	ReadAttrsTree (){
		return request({url: `/attr/ReadAttrsTree`, method: 'GET'})
	},
 }
 
 export default apis;