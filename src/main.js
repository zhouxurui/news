import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant'
import axios from "axios"
import { Toast } from 'vant';

Vue.prototype.$axios = axios
axios.defaults.baseURL = "http://localhost:3000"
Vue.use(Vant)
Vue.config.productionTip = false

//axios拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    // console.log(error.response.data)
	const {statusCode,message} = error.response.data
	if(statusCode === 400){
		Toast(message)
	}
	if(statusCode === 403){
		const url =  app.$route.path
		console.log(url)
		Toast(message)
		app.$router.push({
			path:'/login',
			query:{
				url_id:url
			}
		})
	}
	
	
});

//验证token
router.beforeEach((to, from, next) => {
	//类似node.js的中间件
	if(to.meta.author){
		const data = JSON.parse(localStorage.getItem('userInfo')) || {}
		if(data.token){
			next()
		}else{
			next({path:'/login'})
		}
	}else{
		next()
	}
})

var app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
