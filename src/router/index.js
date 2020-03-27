import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
			{
				path:'/login',
				//懒加载
				component:()=>import('@/views/Login.vue')
			},
			{
				path:'/register',
				//懒加载
				component:()=>import('@/views/Register.vue')
			},
			{
				path:'/personal',
				//懒加载
				component:()=>import('@/views/Personal.vue')
			}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
