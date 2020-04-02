<template>
	<div class="lists">
		<h4>{{data.title}}</h4>
		<div class="img">
			<img :src="$axios.defaults.baseURL +item.url" v-for="(item,index) in data.cover">
		</div>
		<span>
			{{data.user.nickname}}    
			<em>{{data.comment_length}}跟帖</em>
		</span>
	</div>
</template>

<script>
	export default{
		props:['data']
	}
</script>

<style lang="less" scoped="scoped">
.lists{
		padding: 10px;
		border-bottom: 1px solid #e4e4e4;
		h4{
			font-weight: normal;
			font-size: 15px;
			color: #3f3e3e;
			display: -webkit-box;
	       -webkit-box-orient: vertical;
		   -webkit-line-clamp: 2;
		    overflow: hidden;
		}
		.img{
			display: flex;
			justify-content: space-between;
			margin-top: 5px;
			img{
				width: 32.8%;
				height: 74px;
				object-fit: cover;
			}
		}
		span{
			font-size: 13px;
			color: #868686;
			em{
				margin-left: 8px;
			}
		}
	}
</style>
