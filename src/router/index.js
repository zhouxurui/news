import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		//懒加载
		component: () => import('@/views/Index.vue')
	},
	{
		path: '/login',
		//懒加载
		component: () => import('@/views/Login.vue')
	},
	{
		path: '/register',
		//懒加载
		component: () => import('@/views/Register.vue')
	},
	{
		path: '/personal',
		//懒加载
		component: () => import('@/views/Personal.vue'),
		meta: {
			author: true
		}
	},
	{
		path: '/edit',
		//懒加载
		component: () => import('@/views/Edit.vue'),
		meta: {
			author: true
		}
	},
	{
		path: '/follow',
		//懒加载
		component: () => import('@/views/Follow.vue'),
		meta: {
			author: true
		}
	},
	{
		path: '/thread',
		//懒加载
		component: () => import('@/views/Thread.vue'),
		meta: {
			author: true
		}
	},
	{
		path: '/collect',
		//懒加载
		component: () => import('@/views/Collect.vue'),
		meta: {
			author: true
		}
	},
	{
		path: '/manage',
		//懒加载
		component: () => import('@/views/Manage.vue')
	},
	{
		path: '/search',
		//懒加载
		component: () => import('@/views/Search.vue')
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
