<template>
	<div>
		<div class="w">
			<div class="top"></div>
			<div class="middle">
				<div class="middle_search">
					<span class="iconfont iconnew tubiao"></span>
					<router-link to="#" class="sea_div">
						<div>
							<span class="iconfont iconsearch sea_span"></span>
							<span class="sea_span1">搜索新闻</span>
						</div>
					</router-link>
					<router-link to="#"><span class="iconfont iconwode tubiao1"></span></router-link>
				</div>
				<van-tabs v-model="active" sticky swipeable>
					<van-tab v-for="(item, index) in list" :title="item.name">
						<van-list v-model="list[active].loading" :finished="list[active].finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false">
							<!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
							<div v-for="(item, index) in list[active].post" >
								<index1 v-if="item.type === 1 && item.cover.length > 0 && item.cover.length < 3" :data="item"></index1>
								<index2 v-if="item.type === 1 && item.cover.length >= 3 " :data="item"></index2>
								<index3 v-if="item.type === 2" :data="item"></index3>
							</div>
						</van-list>
					</van-tab>
				</van-tabs>
			</div>
			<div class="foot"></div>
		</div>
	</div>
</template>

<script>
import index1 from '@/components/index1.vue';
import index2 from '@/components/index2.vue';
import index3 from '@/components/index3.vue';
export default {
	data() {
		return {
			list: [],
			active: 0
		};
	},
	components: {
		index1,
		index2,
		index3
	},
	watch:{
		active(){
			this.update()
		}
	},
	mounted(){
		const indexData = JSON.parse(localStorage.getItem('indexData'))
		const {token} = JSON.parse(localStorage.getItem('userInfo')) || {}
		if(indexData){
			if(indexData[0].name !== '关注' && token){
				this.categories(token)
			}
			if(indexData[0].name === '关注' && !token){
				this.categories()
			}
			this.list = indexData
			this.categoriesIndex()
			this.update()
		}else{
			this.categories(token)			
		}
	},
	methods:{
		//滚动加载事件
	 onLoad() {
			 this.list[this.active].pageIndex += 1
			 this.$axios({
			 			 url:"post",
			 			 params:{
			 			 	category:this.list[this.active].id,
			 			 	pageIndex:this.list[this.active].pageIndex,
			 			 	pageSize:5
			 			 } 
			 }).then(res => {
			 			 const {data,total} = res.data
			 			 this.list[this.active].post = [...this.list[this.active].post,...data]
			 			 this.list[this.active].loading = false
			 			 if(this.list[this.active].post.length === total){
			 				  this.list[this.active].finished = true;
			 			 }
						  this.list = [...this.list]
			 })
    },
	//渲染导航列表
	categories(token){
		const path = {
			url:"/category",
		}
		if(token){
			path.headers = {
				Authorization: token
			}
		}
		this.$axios(path).then(res => {
			console.log(res)
			const {data} = res.data
			data.push({
				name:"﹀"
			})
			this.list = data
			localStorage.setItem('indexData',JSON.stringify(data))
			this.categoriesIndex()
			this.update()
		})
	},
	//给每个导航添加新属性
	categoriesIndex(){
		this.list.map(v => {
			v.pageIndex=1
			v.post=[]
			v.loading = false
			v.finished = false
			return v
		})
	},
	//渲染文章数据
	update(){
		this.categoriesIndex()
		this.$axios({
			url:"/post",
			params:{
				category:this.list[this.active].id,
				pageIndex:1,
				pageSize:5
			}
		}).then(res => {
			// console.log(res)
			const {data} = res.data
			this.list[this.active].post = data
			this.list = [...this.list]
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
		background: rgba(242, 242, 242, 1);
		.middle_search {
			padding: 0px 15px;
			height: 49px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background: #f00;
			.sea_div {
				flex: 1;
				margin: 0 24px 0 8px;
				display: flex;
				justify-content: center;
				align-items: center;
				height: 34px;
				border-radius: 50px;
				color: #fff;
				background: rgba(255, 255, 255, 0.5);
				font-size: 18px;
				.sea_span {
					margin-right: 5px;
					font-size: 18px;
				}
				.sea_span1 {
					font-size: 13px;
				}
			}
			.tubiao,
			.tubiao1 {
				font-size: 24px;
				color: white;
			}
			.tubiao {
				font-size: 54px;
			}
		}
	}
	.foot {
		height: 48px;
		background: rgba(0, 0, 0, 1);
	}
}
/deep/.van-tabs__nav--line {
	background: #e4e4e4;
}
/deep/.van-tab {
	font-size: 17px;
	flex-basis: 16% !important;
	color: #000;
}
/deep/.van-tabs__line {
	display: none;
}
/deep/.van-tab--active {
	border-bottom: 2px solid red;
}
/deep/.van-tabs__nav {
	position: static;
}
/deep/.van-tab:nth-last-child(2) {
	background: #e4e4e4;
	width: 20px !important;
	position: absolute;
	right: 0;
	top: 0;
	box-sizing: unset;
	border-bottom: 0;
}
/deep/ .van-tabs__wrap {
	padding-right: 20px;
}
/deep/.van-sticky--fixed{
	width: 360px;
	margin: 0 auto;
}
</style>
