<template>
	<div class="w">
		<div class="top"></div>
		<div class="middle">
			<tab title="精彩跟帖" class="tab"></tab>
			<van-list class="lists1" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false">
				<div v-for="(item, index) in list">
					<div class="lists">
						<div class="list_top">
							<div class="left">
								<img :src="$axios.defaults.baseURL + item.user.head_img" />
								<div class="user">
									<h5>{{ item.user.nickname }}</h5>
									<span class="user_span">{{ moment(item.create_date).fromNow() }}</span>
								</div>
							</div>
							<span class="replay" @click="handerep(item)">回复</span>
						</div>
						<replay v-if="item.parent" :data="item.parent" @replay="handerep"></replay>
						<p class="list_p">{{ item.content }}</p>
					</div>
				</div>
			</van-list>
		</div>
		<div class="bottom">
			<van-field v-model="message" :rows="rows" :autosize="!fous" type="textarea" :placeholder="replay.user?'回复@'+replay.user.nickname:'说点什么...'"  
			class="fie" @focus="handefous" :class="fous?'active':''" @blur="handeblur" ref="ref"  @keyup.enter="handefabu"/>
			<span class="fabu" v-if="fous" @click="handefabu">发布</span>
		</div>
	</div>
</template>

<script>
import moment from 'moment';
import tab from '@/components/tab.vue';
import replay from '@/components/repaly.vue';
moment.locale('zh-CN');
export default {
	data() {
		return {
			list: '',
			moment,
			loading: false,
			finished: false,
			pageIndex: 1,
			pageSize: 5,
			open: false,
			message: '',
			fous: false,
			rows: 1,
			replay:''
		};
	},
	components: {
		tab,
		replay
	},
	mounted() {
		this.hander();
	},
	methods: {
		hander() {
			if (this.open) return;
			this.open = true;
			if (this.finished === true) return;
			this.$axios({
				url: '/post_comment/' + this.$route.params.id,
				params: {
					pageIndex: this.pageIndex,
					pageSize: this.pageSize
				}
			}).then(res => {
				this.pageIndex += 1;
				console.log(res);
				const { data } = res.data;
				this.list = [...this.list, ...data];
				this.list = [...this.list];
				this.loading = false;
				if (data.length < 5) {
					this.finished = true;
				}
				this.open = false;
			});
		},
		onLoad() {
			this.hander();
		},
		handefous(){
			this.fous = true
		},
		handeblur(){
			setTimeout(() => {
				this.fous = false
				if(this.message === ''){
					this.replay = ''
				}
			},100)
		},
		handefabu(){
			if(this.message.trim() === '') {
				return
			}
			const {token} = JSON.parse(localStorage.getItem('userInfo')) || {}
			const data = {
					content: this.message
				}
			if(this.replay.id){
				data.parent_id = this.replay.id
			}
			
			this.$axios({
				url:'/post_comment/' + this.$route.params.id,
				headers: {
					Authorization: token
				},
				method:'post',
				data
			}).then(res => {
				this.list = []
				this.pageIndex = 1
				this.hander()
				this.message =''
				this.replay = ''
			})
		},
		handerep(item){
			setTimeout(() => {
				this.replay = item
				console.log(this.replay)
				this.fous = true
				this.$refs.ref.focus()
			},300)
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
		position: relative;
		// height: 635px;
		background: rgba(242, 242, 242, 1);
		padding-bottom: 100px;
		.tab {
			margin-bottom: 10px;
		}
		.lists1 {
			.lists {
				padding: 20px 15px;
				border-bottom: 1px solid rgba(228, 228, 228, 1);
				.list_top {
					display: flex;
					justify-content: space-between;
					margin-bottom: 10px;
					.left {
						display: flex;
						align-items: center;
						img {
							width: 35px;
							height: 35px;
							border-radius: 50%;
						}
						.user {
							margin-left: 10px;
							h5 {
								font-size: 14px;
							}
							.user_span {
								font-size: 12px;
								color: rgba(0, 0, 0, 0.537255);
							}
						}
					}
					.replay {
						font-size: 12px;
						color: rgba(0, 0, 0, 0.537255);
					}
				}
				.list_p {
					margin-top: 10px;
					line-height: 28px;
					font-size: 14px;
				}
			}
		}
	}
	.bottom{
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		padding: 0 15px;
		display: flex;
		align-items: flex-end;
		.fie{
			border-radius: 50px;
		}
		.active{
			height: 82px;
		}
		.fabu{
			height: 32px;
			line-height: 32px;
			width: 80px;
			background: #f00;
			color: #fff;
			border-radius: 50px;
			text-align: center;
			font-size: 14px;
		}
	}
}
</style>
