<template>
	<div>
		<div class="w">
			<div class="top"></div>
			<div class="middle">
				<tab title="我的关注" :home="false" class="tab" />
				<div class="follow_list" v-for="(item, index) in datas">
					<div class="left">
						<img :src="'http://127.0.0.1:3000' + item.head_img" />
						<div>
							<h5>{{ item.nickname }}</h5>
							<p>{{ moment(item.create_date).format('YYYY-MM-DD') }}</p>
						</div>
					</div>
					<span @click="hander(item.id, index)">取消关注</span>
				</div>
			</div>
			<div class="foot"></div>
		</div>
	</div>
</template>

<script>
import moment from 'moment';
import tab from '@/components/tab.vue';
import { Dialog } from 'vant';
export default {
	data() {
		return {
			datas: '',
			moment
		};
	},
	components: {
		tab
	},
	mounted() {
		const users = JSON.parse(localStorage.getItem('userInfo'));
		this.$axios({
			url: '/user_follows',
			headers: {
				Authorization: users.token
			}
		}).then(res => {
			console.log(res);
			const { data } = res.data;
			this.datas = data;
		});
	},
	methods: {
		hander(id, index) {
			const users = JSON.parse(localStorage.getItem('userInfo'));
			Dialog.confirm({
				title: '提示',
				message: '确定要取消关注吗？'
			}).then(() => {
					this.$axios({
						url: '/user_unfollow/' + id,
						headers: {
							Authorization: users.token
						}
					}).then(res => {
						this.datas.splice(index, 1);
						this.$toast('取消关注成功');
					});
				}).catch(() => {
					// on cancel
				});
		}
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
		.tab {
			margin-bottom: 15px;
		}
		.follow_list {
			padding: 20px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #e4e4e4;
			.left {
				display: flex;
				img {
					margin-right: 15px;
					width: 40px;
					height: 40px;
					border-radius: 20px;
				}
				h5 {
					font-weight: normal;
					font-size: 16px;
				}
				p {
					font-size: 14px;
					color: rgba(0, 0, 0, 0.537255);
				}
			}
			span {
				font-size: 12px;
				padding: 0 15px;
				line-height: 32px;
				background: rgba(153, 153, 153, 0.2);
				border-radius: 16px;
			}
		}
	}
	.foot {
		height: 48px;
		background: rgba(0, 0, 0, 1);
	}
}
</style>
