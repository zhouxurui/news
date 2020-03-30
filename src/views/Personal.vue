<template>
	<div>
		<div class="w">
			<div class="top"></div>
			<div class="middle">
				<tab title="个人中心" :home="true" />
				<div class="middle_top" @click="$router.push('/edit')">
					<div class="left">
						<div><img :src="'http://127.0.0.1:3000' + infoList.head_img" /></div>
						<div class="xingbie">
							<span class="nv iconfont iconxingbienv" v-if="infoList.gender === 0"></span>
							<span class="iconfont iconxingbienan" v-if="infoList.gender === 1"></span>
							{{ infoList.nickname }}
							<p>{{ moment(infoList.create_date).format('YYYY-MM-DD') }}</p>
						</div>
					</div>
					<span class="right iconfont iconjiantou1"></span>
				</div>
				<div class="md"></div>
				<list v-for="(item, key, index) in perlist" :title="item.title" :tip="item.tip" @click.native="$router.push(item.path)" />
				<list :title="'退出'" :tip="''" @click.native="hander" />
			</div>
			<div class="foot"></div>
		</div>
	</div>
</template>

<script>
import list from '@/components/list.vue';
import moment from 'moment';
import tab from '@/components/tab.vue';
import { Dialog } from 'vant';
export default {
	data() {
		return {
			perlist: [
				{
					title: '我的关注',
					tip: '关注的用户',
					path: '/follow'
				},
				{
					title: '我的跟帖',
					tip: '跟帖/回复',
					path: '/thread'
				},
				{
					title: '我的收藏',
					tip: '文章/视频',
					path: '/collect'
				}
			],
			infoList: '',
			moment
		};
	},
	components: {
		list,
		tab
	},
	mounted() {
		const users = JSON.parse(localStorage.getItem('userInfo'));
		this.$axios({
			url: '/user/' + users.user.id,
			headers: {
				Authorization: users.token
			}
		}).then(res => {
			this.infoList = res.data.data;
		});
	},
	methods: {
		hander() {
			Dialog.confirm({
				title: '提示',
				message: '确定要退出吗？'
			}).then(() => {
					this.$router.push('/login');
					localStorage.removeItem('userInfo');
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

		.middle_top {
			padding: 20 / 360 * 100vw;
			padding-right: 10 / 360 * 100vw;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.left {
				display: flex;
				align-items: center;
				img {
					width: 70px;
					height: 70px;
					border-radius: 50%;
				}
				.xingbie {
					margin-left: 15px;
					span {
						color: #319be4;
					}
					p {
						margin-top: 5px;
						color: #7c7979dd;
						font-size: 14px;
					}
					.nv {
						color: pink;
					}
				}
			}
			.right {
				color: #9b9191;
			}
		}
		.md {
			height: 5px;
			background: rgba(228, 228, 228, 1);
		}
	}
	.foot {
		height: 48px;
		background: rgba(0, 0, 0, 1);
	}
}
</style>
