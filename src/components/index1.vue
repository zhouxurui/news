<template>
	<div class="list" @click="$router.push(`/detail/${data.id}`)">
		<div class="left">
			<h4>{{data.title}}</h4>
			<span>
				{{data.user.nickname}}
				<em>{{data.comment_length}}跟帖</em>
			</span>
		</div>
		<img :src="$axios.defaults.baseURL+data.cover[0].url" />
	</div>
</template>

<script>
	export default{
		props:['data']
	}
</script>

<style lang="less" scoped="scoped">
.list {
	margin-top: 5px;
	padding: 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid #e4e4e4;
	.left {
		h4 {
			font-weight: normal;
			font-size: 16px;
			margin-bottom: 5px;
			color: #3f3e3e;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
		}
		span {
			font-size: 13px;
			color: #868686;
			em {
				margin-left: 8px;
			}
		}
	}
	img {
		width: 121px;
		height: 75px;
		object-fit: cover;
		flex-shrink: 0;
	}
}
</style>
