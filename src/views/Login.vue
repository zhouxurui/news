<template>
	<div>
		<div class="w">
			<div class="top"></div>
			<div class="middle">
				<span class="iconfont iconicon-test"></span>
				<div class="iconfont iconnew"></div>
				<van-form @submit="onSubmit" class="form">
					<van-field v-model="form.username"  placeholder="用户名 / 手机号" :rules="[{ required: true, message: '请输入账号' }]" />
					<van-field
						v-model="form.password"
						type="password"
						placeholder="密码"
						:rules="[{ required: true, message: '请输入密码' }]"
				/>
				<div><van-button round block type="info">登录</van-button></div>
				</van-form>
				<div class="zuce"><router-link to="/register">还没有注册？去注册</router-link></div>
			</div>
			<div class="foot"></div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			form: {
				username: '',
				password: ''
			}
		}
	},
	methods: {
		 onSubmit() {
		  	this.$axios({
		  		url: '/login',
		  		method: 'POST',
		  		data: this.form
		  	}).then(res => {
					this.$toast(res.data.message)
					console.log(res.data)
					const {data} = res.data
					localStorage.setItem('userInfo',JSON.stringify(data))
					this.$router.push('/personal')
		  	})
			
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
		padding: 20 / 360 * 100vw;
		height: 635px;
		background: rgba(242, 242, 242, 1);
		span {
			font-size: 28 / 360 * 100vw;
		}
		div.iconnew {
			text-align: center;
			font-size: 126 / 360 * 100vw;
			color: #e14747;
		}
		.form .van-cell{
			padding: 0;
			margin-bottom: 25px;
			width: 100%;
			line-height: 32px;
			border: 0;
			border-bottom: 1px solid #999;
			background-color: rgba(242, 242, 242, 1);
			font-size: 16px;
			color: #868484dd;
		}
		.form .van-button{
			margin-top: 50px;
			width: 100%;
			padding: 0;
			border: 0;
		}
		.form .van-button--info{
			background: #cb4545;
		}
		.form span{
			font-size: 18px;
		}
		.zuce{
			margin-top: 20px;
			text-align: center;
			font-size: 14px;
			background-color: rgba(242, 242, 242, 1);
			border: 0;
			color: #5555ee;
		}
	}
	.foot {
		height: 48px;
		background: rgba(0, 0, 0, 1);
	}
}
</style>
