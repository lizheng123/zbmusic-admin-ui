import request from '@/api/request.js'; //请求对象
 
 const apis = {
	
	create (params){
		return request({url: `/cate/create`, method: 'POST', data:params})
	},
	delete (params){
		return request({url: `/cate/delete`, method: 'POST', data:params})
	},
	update (params){
		return request({url: `/cate/update`, method: 'POST', data:params})
	},
	read (pid){
		return request({url: `/cate/read/${pid}`, method: 'GET'})
	}
 }
 
 export default apis;