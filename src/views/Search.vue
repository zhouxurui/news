<template>
	<div class="w">
		<div class="top"></div>
		<div class="middle">
			<div class="middle_search">
				<span class="iconfont iconjiantou2 tubiao" @click="$router.back()"></span>
				<div class="search">
						<input type="text" placeholder="通灵兽消失术">
						<span class="iconfont iconsearch tubiao1 "></span>
				</div>
				<span class="sou">搜索</span>
			</div>
			<div class="histroy">
				<h5>历史记录</h5>
				<div class="list">
					<span>美女</span>
				</div>
			</div>
			<div class="fu" v-if="false">
				<div class="fu_list">
					<span>花露水的妙用</span>
					<span class="iconfont iconjiantou1"></span>
				</div>
				<div class="fu_list">
					<span>花露水的妙用</span>
					<span class="iconfont iconjiantou1"></span>
				</div>
				<div class="fu_list">
					<span>花露水的妙用</span>
					<span class="iconfont iconjiantou1"></span>
				</div>
				<div class="fu_list">
					<span>花露水的妙用</span>
					<span class="iconfont iconjiantou1"></span>
				</div>
				<div class="fu_list">
					<span>花露水的妙用</span>
					<span class="iconfont iconjiantou1"></span>
				</div>
			</div>
		</div>
		<div class="foot"></div>
	</div>
</template>

<script></script>

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
			h5{
				font-size: 14px;
				margin-bottom: 10px;
			}
			.list{
				span{
					font-size: 14px;
				}
			}
		}
		.fu{
			position: absolute;
			left: 0;
			right: 0;
			top: 79px;
			bottom: 0;
			background: rgba(242, 242, 242, 1);
			margin: 0px 15px;
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
		}
	}
	.foot {
		height: 48px;
		background: rgba(0, 0, 0, 1);
	}
}
</style>
