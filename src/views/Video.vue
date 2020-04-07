<template>
	<div class="w">
	<div class="top"></div>
	<div class="middle">
		<div class="tap" @click="$router.back()">
			<span class="iconfont iconjiantou2"></span>
		</div>
		<video :src="$axios.defaults.baseURL + list.content" class="video" controls="controls"></video>
		<div class="main">
			<div class="autor">
				<div class="left">
					<img :src="$axios.defaults.baseURL + list.user.head_img">
					<span class="img_span">{{list.user.nickname}}</span>
				</div>
				<span class="right" :class="list.has_follow?'active':''" @click="handefol">{{list.has_follow?'已关注':'关注'}}</span>
			</div>
			<h5>{{list.title}}</h5>
			<div class="mian_bottom">
				<span class="bottom_span">
					<span class="iconfont icondianzan" :class="list.has_like?'active1':''" @click="handelike"></span>
					<i class="span_i">{{list.like_length || 0}}</i>
				</span>
				<span class="bottom_span">
					<span class="iconfont iconweixin tubiao2"></span>
					<i class="span_i">微信</i>
				</span>
			</div>
		</div>
		<midfoot :list="list"/>
	</div>
	<!-- <div class="foot"></div> -->
	</div>
</template>

<script>
	import midfoot from '@/components/Middle_foot.vue'
	export default{
		data(){
			return {
				list:{
					user:{}
				},
				token:''
			}
		},
		components:{
			midfoot
		},
		mounted(){
			const {token} = JSON.parse(localStorage.getItem('userInfo')) || ''
			this.token = token
			const urls = {
				url:'/post/' + this.$route.params.id,
			}
			if(token){
				urls.headers = {
					Authorization: token
				}
			}
			this.$axios(urls).then(res => {
				console.log(res)
				const {data} = res.data
				this.list = data
			})
		},
		methods:{
			handelike(){
				this.$axios({
					url:'/post_like/' + this.list.id,
					headers: {
						Authorization: this.token
					}
				}).then(res => {
					this.list.has_like = !this.list.has_like
					if(this.list.has_like){
						this.list.like_length += 1
					}else{
						this.list.like_length -= 1
					}
					this.$toast(res.data.message)
				})
			},
			handefol(){
				let url;
				if(this.list.has_follow){
					url = '/user_unfollow/' + this.list.user.id
				}else{
					url = '/user_follows/' + this.list.user.id
				}
				this.$axios({
					url,
					headers: {
						Authorization: this.token
					}
				}).then(res => {
					console.log(res)
					this.list.has_follow = !this.list.has_follow
					if(this.list.has_follow){
						this.list.has_follow = true
						this.$toast(res.data.message)
					}else{
						this.list.has_follow = false
						this.$toast(res.data.message)
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.w {
		margin: 0 auto;
		width: 360 / 375 * 100vw;
		.top {
			height: 24px;
			background: rgba(117, 117, 117, 1);
		}
		.middle {
			position: relative;
			height: 635px;
			background: rgba(242, 242, 242, 1);
			padding-bottom: 100px;
			.tap{
				line-height: 32px;
				padding-left: 5px;
			}
			.video{
				width: 100%;
			}
			.main{
				padding: 0 15px;
				border-bottom: 5px solid rgba(228, 228, 228, 1); 
				background: rgba(242, 242, 242, 1);
				.autor{
					margin-top: 10px;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.left{
						display: flex;
						align-items: center;
						img{
							width: 25px;
							height: 25px;
							border-radius: 50%;
						}
						.img_span{
							margin-left: 5px;
							font-size: 13px;
							color: #868686;
						}
					}
					.right{
						padding: 0 18px;
						line-height: 28px;
						border-radius: 50px;
						font-size: 12px;
						border: 1px solid #ccc;
					}
					.active{
						background: #f00;
						color: #fff;
						border: 1px solid #f00;
					}
				}
				h5{
					margin: 30px 0;
					font-size: 16px;
				}
				.mian_bottom{
					display: flex;
					justify-content: space-around;
					align-items: center;
					margin-bottom: 20px;
					margin-top: 15px;
					.bottom_span{
						width: 95px;
						padding: 0 20px;
						line-height: 32px;
						border-radius: 50px;
						border: 1px solid #978989;
						.span_i{
							margin-left: 5px;
						}
						.tubiao2{
							color: #1ec21e;
						}
						.active1{
							color: #f00;
						}
					}
				}
			}
		}
		.foot {
			height: 48px;
			background: rgba(0, 0, 0, 1);
		}
	}
</style>
