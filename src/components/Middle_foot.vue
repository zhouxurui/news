<template>
	<div class="middle_foot">
		<span class="input" @click="$router.push('/post_comment/'+list.id)">写跟帖</span>
		<div>
			<span class="iconfont iconpinglun- right rights">
				<span class="rights_son">{{list.comment_length}}</span>
			</span>
			<span class="iconfont iconshoucang right" :class="list.has_star?'active2':''" @click="handestart"></span>
			<span class="iconfont iconfenxiang right"></span>
		</div>
	</div>
</template>

<script>
	export default{
		props:['list'],
		methods:{
			handestart(){
				const {token} = JSON.parse(localStorage.getItem('userInfo'))
				this.$axios({
					url:'/post_star/' + this.list.id,
					headers: {
						Authorization: token
					}
				}).then(res => {
					this.list.has_star = !this.list.has_star
					this.$toast(res.data.message)
				})
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.middle_foot{
		background: rgba(242, 242, 242, 1);
		position: fixed;
		bottom: 0;
		left: 0;
		width: 360px;
		height: 48px;
		display: flex;
		justify-content: space-around;
		margin-left:8px;
		padding: 0 15px;
		align-items: center;
		border-top: 1px solid #ccc;
		.input{
			flex: 1;
			background: rgba(215, 215, 215, 1);
			border-radius: 50px;
			line-height: 32px;
			text-indent: 1em;
		}
		.right{
			font-size: 20px;
			margin-left: 34px;
		}
		.active2{
			color: #f00;
		}
		.rights{
			position: relative;
			.rights_son{
				position: absolute;
				right: -14px;
				top: -6px;
				color: #fff;
				background: #f00;
				width: 26px;
				line-height: 16px;
				// padding: 0 5px;
				font-size: 12px;
				border-radius: 50px;
				text-align: center;
			}
		}
	}
</style>
