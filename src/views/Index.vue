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
					<van-tab v-for="(item, index) in list" :title="item">
						<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
							<!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
							<div v-for="(item, index) in arr" >
								<index1></index1>
								<index2></index2>
								<index3></index3>
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
			arr:[1,1],
			list: ['关注', '头条', '娱乐', '体育', '汽车', '房产', '体育', '汽车', '房产', '﹀'],
			active: 0,
			loading: false,
			finished: false
		};
	},
	components: {
		index1,
		index2,
		index3
	},
	methods:{
	 onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.arr.push(this.arr.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.arr.length >= 8) {
          this.finished = true;
        }
      }, 3000);
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
