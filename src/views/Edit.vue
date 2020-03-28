<template>
	<div>
		<div class="w">
			<div class="top"></div>
			<div class="middle">
				<tab title="编辑资料" :home="false" />
				<div class="tou">
					<img :src="'http://localhost:3000' + datas.head_img" />
					<van-uploader :after-read="afterRead" class="van" style="opacity: 0;" />
				</div>
				<list title="昵称" :tip="datas.nickname" @click.native="show=true"/>
				<van-dialog v-model="show" title="昵称" show-cancel-button @confirm="conf" @cancel="dataname=datas.nickname"><van-field v-model="dataname" placeholder="请输入昵称" /></van-dialog>
				<list title="密码" tip="******" @click.native="shows=true" />
				<van-dialog v-model="shows" title="密码" show-cancel-button @confirm="pwd" @cancel="password=''"><van-field v-model="password" placeholder="请输入密码" type="password" /></van-dialog>
				<list title="性别" :tip="['女', '男'].splice(datas.gender, 1)[0]" @click.native="showgender=true"/>
				<van-action-sheet v-model="showgender" :actions="actions" @select="onSelect" close-on-click-action/>
			</div>
			<div class="foot"></div>
		</div>
	</div>
</template>

<script>
import tab from '@/components/tab.vue';
import list from '@/components/list.vue';
export default {
	data() {
		return {
			datas: '',
			show: false,
			shows:false,
			showgender:false,
			dataname:'',
			password:'',
			actions: [
              { name: '男' , value:1 },
              { name: '女' , value:0 },
            ]
		};
	},
	components: {
		tab,
		list
	},
	mounted() {
		const users = JSON.parse(localStorage.getItem('userInfo'));
		this.$axios({
			url: '/user/' + users.user.id,
			headers: {
				Authorization: users.token
			}
		}).then(res => {
			const { data } = res.data;
			this.datas = data;
			this.dataname = data.nickname
		});
	},
	methods: {
		afterRead(file) {
			// console.log(file.file)
			const fd = new FormData();
			fd.append('file', file.file);
			const users = JSON.parse(localStorage.getItem('userInfo'));
			// 此时可以自行将文件上传至服务器
			this.$axios({
				url: '/upload',
				method: 'post',
				data: fd,
				headers: {
					Authorization: users.token
				}
			}).then(res => {
				const { data } = res.data;
				this.datas.head_img = data.url;
				this.handler({ head_img: this.datas.head_img });
			});
		},
		handler(datas) {
			const users = JSON.parse(localStorage.getItem('userInfo'));
			this.$axios({
				url: '/user_update/' + users.user.id,
				method: 'post',
				headers: {
					Authorization: users.token
				},
				data: datas
			}).then(res => {
				this.$toast(res.data.message);
			});
		},
		conf(){
			this.handler({nickname:this.dataname})
			this.datas.nickname = this.dataname
		},
		pwd(){
			this.handler({password:this.password})
		},
		onSelect(item) {
		// 默认情况下点击选项时不会自动收起
		// 可以通过 close-on-click-action 属性开启自动收起
		this.handler({gender:item.value})
		// console.log(item)
		this.datas.gender = item.value
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
		.tou {
			position: relative;
			padding: 10 / 360 * 100vw;
			padding-top: 25 / 360 * 100vw;
			display: flex;
			justify-content: center;
			img {
				width: 100px;
				height: 100px;
				border-radius: 50%;
			}
			.van {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translateX(-38/360 * 100vw) translateY(-32/360 * 100vw);
			}
		}
	}
	.foot {
		height: 48px;
		background: rgba(0, 0, 0, 1);
	}
}
</style>
