import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant'
import axios from "axios"

Vue.prototype.$axios = axios
axios.defaults.baseURL = "http://localhost:3000"
Vue.use(Vant)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
	//类似node.js的中间件
	if(to.path === '/personal'){
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

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
