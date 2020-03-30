<template>
	<div>
			<div class="middle_list">
				<div class="list_left">{{title}}</div>
				<div class="list_right">
					<span class="user">{{tip}}</span>
					<span class="listr iconfont iconjiantou1"></span>
				</div>
			</div>
	</div>
</template>

<script>
	export default{
		props:['title','tip']
		
	}
</script>

<style lang="less" scoped="scoped">
.middle_list {
	padding-right: 10 / 360 * 100vw;
	margin-left: 20 / 360 * 100vw;
	display: flex;
	justify-content: space-between;
	line-height: 48px;
	border-bottom: 1px solid #e4e4e4;
	.list_left {
		font-size: 14px;
	}
	.list_right {
		.user {
			font-size: 13px;
			color: #666464dd;
			margin-right: 5px;
		}
		.listr {
			color: #9b9191;
		}
	}
}
</style>
