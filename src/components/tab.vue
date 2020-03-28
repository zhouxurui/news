<template>
	<div class="middle_tap">
		<span class="zuo iconfont iconjiantou" @click="$router.back()"></span>
		<h3>{{title}}</h3>
		<span class="home iconfont iconshouye" @click="$router.push('/')" v-if="home"></span>
		<span v-else class="home iconfont iconshouye" style="opacity: 0;"></span>
	</div>
</template>

<script>
	export default{
		props:['title','home']
	}
</script>

<style lang="less" scoped="scoped">
.middle_tap {
	padding: 0 10px;
	padding-top: 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.home {
		font-size: 18px;
	}
	.zuo {
		font-size: 16px;
		color: #9b9191;
	}
	h3 {
		color: #23bfbf;
	}
}
</style>
