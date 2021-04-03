// import request from '@/api/request.js'; //请求对象
import axios from 'axios';
var instance = axios.create({
    timeout: 30000,
	// baseURL:'/apis',
    // baseURL:base.getServerInfo().api_server
	headers: { 'content-type': 'multipart/form-data' }
});
 const apis = {
	
	up (params){
		return instance.post(`http://jxc.com/upload/up`,params)
	},
 }
 
 export default apis;