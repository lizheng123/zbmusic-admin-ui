import request from '@/api/request.js'; //请求对象
 
 const apis = {
	
	create (params){
		return request({url: `/sku/create`, method: 'POST', data:params})
	},
	delete (params){
		return request({url: `/sku/delete`, method: 'POST', data:params})
	},
	update (params){
		return request({url: `/sku/update`, method: 'POST', data:params})
	},
	read (params){
		return request({url: `/sku/read`,params:params, method: 'GET'})
	},
	readOneProductSkuInfo (params){
		return request({url: `/sku/readOneProductSkuInfo`,params:params, method: 'GET'})
	},
 }
 
 export default apis;