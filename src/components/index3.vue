<template>
		<div class="lists">
		<h4>美军与英军联合训练 6机编队阵容强大</h4>
		<div class="img">
			<img src="../assets/u19.jpg">
			<div class="shipin">
				<span class="iconfont iconshipin tubiao"></span>
			</div>
		</div>
		<span>
			火星时报    
			<em>52跟帖</em>
		</span>
	</div>
</template>

<script>
</script>

<style lang="less" scoped="scoped">
	.lists{
			padding: 10px;
			border-bottom: 1px solid #e4e4e4;
			h4{
				font-weight: normal;
				font-size: 15px;
				color: #3f3e3e;
				display: -webkit-box;
		       -webkit-box-orient: vertical;
			   -webkit-line-clamp: 2;
			    overflow: hidden;
			}
			.img{
				position: relative;
				display: flex;
				justify-content: center;
				margin-top: 5px;
				img{
					width: 100%;
					height: 170px;
					object-fit: cover;
				}
				.shipin{
					width: 55px;
					height: 55px;
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translateX(-27px) translateY(-27px);
					border-radius: 50%;
					background: rgba(0,0,0,.3);
					display: flex;
					justify-content: center;
					align-items: center;
					.tubiao{
						color: #fff;
						font-size: 46px;
					}
				}
			}
			span{
				margin-top: 5px;
				font-size: 13px;
				color: #868686;
				em{
					margin-left: 8px;
				}
			}
		}
</style>
