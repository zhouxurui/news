<template>
	<div class="w">
		<div class="top"></div>
		<div class="middle">
			<div class="middle_search">
				<span class="iconfont iconjiantou2 tubiao" @click="$router.back()"></span>
				<div class="search">
						<input type="text" placeholder="通灵兽消失术" @keyup.enter="hande_sea" v-model="value" autofocus="autofocus">
						<span class="iconfont iconsearch tubiao1 "></span>
				</div>
				<span class="sou" @click="hande_sea">搜索</span>
			</div>
			<div class="histroy">
				<div class="histroy_top">
					<h5>历史记录</h5>
					<span class="iconfont iconicon-test" @click="hande_del"></span>
				</div>
				<div class="list">
					<span v-for="(item,index) in histroy" @click="hande_span(item)">{{item}}</span>
				</div>
			</div>
			<div class="fu" v-if="show">
				<div v-for="(item,index) in list">
					<index1 v-if="item.type === 1 && item.cover.length > 0 && item.cover.length < 3" :data="item"></index1>
					<index2 v-if="item.type === 1 && item.cover.length >= 3" :data="item"></index2>
					<index3 v-if="item.type === 2" :data="item"></index3>
				</div>
				<div v-if="list.length === 0" class="tip">
					<p>没有搜索到你想要的内容!</p>
				</div>
			</div>
		</div>
		<div class="foot"></div>
	</div>
</template>

<script>
	import index1 from '@/components/index1.vue';
	import index2 from '@/components/index2.vue';
	import index3 from '@/components/index3.vue';
	export default{
		name:"search",
		data(){
			return {
				value:'',
				histroy: JSON.parse(localStorage.getItem('histroy')) || [],
				show:false,
				list:[]
			}
		},
		components: {
			index1,
			index2,
			index3
		},
		watch:{
			value(){
				if(this.value === ''){
					this.show = false
				} 
			}
		},
		methods:{
			hande_sea(){
				if(this.value === '')return
				this.histroy.unshift(this.value)
				this.histroy = [...new Set(this.histroy)]
				localStorage.setItem('histroy',JSON.stringify(this.histroy))
				this.show = true
				this.hande()
			},
			hande_del(){
				this.histroy = []
				localStorage.removeItem('histroy')
			},
			hande(){
				if(this.value === '')return
				this.$axios({
					url:"/post_search",
					params:{
						keyword:this.value
					}
				}).then(res => {
					const {data} = res.data
					this.list = data
				})
			},
			hande_span(item){
				this.value = item
				this.show = true
				this.hande()
			}
		},
		 beforeRouteEnter (to, from, next){
			 next(vm => {
				 if(from.path === '/'){
				 	vm.value = ''		 
				 }
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
		position: relative;
		height: 635px;
		background: rgba(242, 242, 242, 1);
		padding: 0px 15px;
		padding-top: 10px;
		.middle_search {
			height: 49 / 360 * 100vw;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20px;
			.search{
				position: relative;
				input{
					width: 258px;
					border-radius: 50px;
					border: 1px solid rgba(215, 215, 215, 1);
					background: rgba(242, 242, 242, 1);
					line-height: 38px;
					text-indent: 2em;
					font-size: 15px;
				}
				.tubiao1{
					font-size: 16px;
					position: absolute;
					left: 12px;
					top: 12px;
				}
			}
		}
		.histroy{
			padding-bottom: 20px; 
			border-bottom: 1px solid rgba(215, 215, 215, 1);
			.histroy_top{
				display: flex;
				justify-content: space-between;
				align-items: center;
				line-height: 32px;
				h5{
					font-size: 14px;
				}
			}
			.list{
				display: flex;
				flex-wrap: wrap;
				span{
					line-height: 24px;
					font-size: 14px;
					margin-right: 19px;
					border: 1px solid #ccc;
					padding: 5px 10px;
					margin-top: 10px;
				}
			}
		}
		.fu{
			position: absolute;
			left: 0;
			right: 0;
			top: 68px;
			bottom: 0;
			background: rgba(242, 242, 242, 1);
			overflow-y: auto;
			.fu_list{
				display: flex;
				justify-content: space-between;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
				border-bottom: 1px solid rgba(215, 215, 215, 1);
				line-height: 48px;
				font-size: 14px;
			}
			.tip{
				text-align: center;
				line-height: 32px;
			}
		}
	}
	.foot {
		height: 48px;
		background: rgba(0, 0, 0, 1);
	}
}
</style>
