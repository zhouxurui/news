<template>
	<div>
		<div class="w">
			<div class="top"></div>
			<div class="middle">
				<tab title="我的收藏" :home="false" class="tab" />
				<div v-for="(item,index) in datas">
					<index1 v-if="item.type === 1 && item.cover.length > 0 && item.cover.length < 3" :data="item"></index1>
					<index2 v-if="item.type === 1 && item.cover.length >= 3" :data="item"></index2>
					<index3 v-if="item.type === 2" :data="item"></index3>
				</div> 
			</div>
			<div class="foot"></div>
		</div>
	</div>
</template>

<script>
import index1 from '@/components/index1.vue';
import index2 from '@/components/index2.vue';
import index3 from '@/components/index3.vue';
import tab from '@/components/tab.vue';
export default {
	data(){
		return {
			datas:''
		}
	},
	components: {
		tab,
		index1,
		index2,
		index3
	},
	mounted(){
		const users = JSON.parse(localStorage.getItem('userInfo'));
		this.$axios({
			url:'/user_star',
			headers: {
				Authorization: users.token
			}
		}).then(res => {
			console.log(res)
			const {data} = res.data
			this.datas = data
		})
	}
};
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
		height: 635px;
		background: rgba(242, 242, 242, 1);
		.tab{
			margin-bottom: 10px;
		}
		.list{
			padding: 10px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #e4e4e4;
			.left{
				h4{
					font-weight: normal;
					font-size: 16px;
					margin-bottom: 5px;
					color: #3f3e3e;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					 overflow: hidden;
				}
				span{
					font-size: 13px;
					color: #868686;
					em{
						margin-left: 8px;
					}
				}
			}
			img{
				width: 121px;
				height: 75px;
				object-fit: cover;
				flex-shrink: 0;
			}
		}
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
				img{
					width: 32%;
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
	}
	.foot {
		height: 48px;
		background: rgba(0, 0, 0, 1);
	}
}
</style>
