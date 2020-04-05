<template>
	<div class="w">
		<div class="top"></div>
		<div class="middle">
			<tab title="栏目管理" class="tab"></tab>
			<div class="del">
				<p>点击删除以下频道</p>
				<div class="list">
					<span v-for="(item,index) in del" @click="handdel(item,index)" :class="['关注','头条'].includes(item.name)?'active':''">{{item.name}}</span>
				</div>
			</div>
			<div class="del">
				<p>点击添加以下频道</p>
				<div class="list">
					<span v-for="(item,index) in add"  @click="handadd(item,index)">{{item.name}}</span>
				</div>
			</div>
		</div>
		<div class="foot"></div>
	</div>
</template>

<script>
	import tab from '@/components/tab.vue'
	export default{
		data(){
			return {
				arr:[],
				add:[],
				del:[]
			}
		},
		components:{
			tab
		},
		mounted(){
			const data = JSON.parse(localStorage.getItem('indexData'))
			this.arr = data
			this.del = data.filter((item) => {
				return item.is_top === 1
			})
			this.add = data.filter((item) => {
				return item.is_top === 0
			})
		},
		methods:{
			handdel(item,index){
				if(['关注','头条'].includes(item.name))return
				this.del.splice(index,1)
				item.is_top = 0
				this.add.push(item)
			},
			handadd(item,index){
				if(['关注','头条'].includes(item.name))return
				this.add.splice(index,1)
				item.is_top = 1
				this.del.push(item)
			}
		},
		destroyed(){
			this.arr = [...this.del,...this.add,this.arr[this.arr.length-1]]
			localStorage.setItem('indexData',JSON.stringify(this.arr))
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
			height: 635px;
			background: rgba(242, 242, 242, 1);
			.tab{
				margin-bottom: 15px;
			}
			.del{
				margin-top: 10px;
				padding-right: 15px;
				p{
					margin-left: 20px;
					margin-bottom: 15px;
					font-size: 14px;
					color: #605a5a;
				}
				.list{
					display: flex;
					flex-wrap: wrap;
					span{
						line-height: 32px;
						padding: 0 16px;
						border: 1px solid #ccc;
						margin-left: 20px;
						margin-bottom: 10px;
					}
				}
			}
		}
		.foot {
			height: 48px;
			background: rgba(0, 0, 0, 1);
		}
		.active{
			background-color: #e6e3e3;
		}
	}
</style>
