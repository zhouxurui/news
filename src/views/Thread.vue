<template>
	<div>
		<div class="w">
			<div class="top"></div>
			<div class="middle">
				<tab title="我的跟帖" :home="false" class="tab" />
				<div class="list" v-for="(item,index) in datas">
					<span>{{moment(item.create_date).format('YYYY-MM-DD hh:mm')}}</span>
					<div class="list_div" v-if="item.parent">
						<span class="span">回复： {{item.parent.user.nickname}}</span><br>
						<span class="list_span span">{{item.parent.content}}</span>
					</div>
					<p class="p">{{item.content}}</p>
					<div class="rou">
						<router-link to="#" class="rouLink">原文: {{item.post.title}}</router-link>
						<span class="listr iconfont iconjiantou1"></span>
					</div>
				</div>
			</div>
			<div class="foot"></div>
		</div>
	</div>
</template>

<script>
	import moment from 'moment';
	import tab from '@/components/tab.vue'
	export default{
		data(){
			return {
				datas:"",
				moment
			}
		},
		components:{
			tab
		},
		mounted(){
			const users = JSON.parse(localStorage.getItem('userInfo'));
			this.$axios({
				url:"/user_comments",
				headers: {
					Authorization: users.token
				}
			}).then(res => {
				console.log(res)
				const {data} = res.data
				this.datas = data
			})
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
		background: rgba(242, 242, 242, 1);
		.tab{
			margin-bottom: 10px;
		}
		.list{
			font-size: 14px;
			padding: 20px;
			border-bottom: 1px solid #e4e4e4;
			.list_div{
				font-size: 12px;
				padding: 10px;
				background: rgba(228, 228, 228, 1);
				margin: 10px 0;
				.span{
					line-height: 24px;
				}
				.list_span{
					font-size: 14px;
				}
			}
			span,a{
				color:rgba(148, 148, 148, 0.866667); 
			}
			.p{
				margin: 10px 0;
			}
			.rou{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.rouLink{
					width: 100%;
					display: block;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space:nowrap;
				}
				.listr{
					margin-left: 20px;
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
