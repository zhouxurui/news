<template>
<div>
	<div class="user_replay">
		<div class="replay_top">
			<div class="user_id">
				<span class="user_id_span">{{data.user.nickname}}</span>
				<span class="user_id_span1">{{moment(data.user.create_date).fromNow()}}</span>
			</div>
			<span class="replay_top_span">回复</span>
		</div>
		<p class="replay_p">{{data.content}}</p>
	</div>
	<repalys v-if="data.parent" :data="data.parent"></repalys>
</div>
</template>

<script>
	import moment from 'moment'
	moment.locale('zh-CN')
	export default{
		name:'repalys',
		props:['data'],
		data(){
			return {
				moment
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.user_replay{
		border: 1px solid rgba(215, 215, 215, 1);
		padding: 15px 10px;
		margin-top: -1px;
		.replay_top{
			display: flex;
			justify-content: space-between;
			.user_id{
				.user_id_span{
					font-size: 14px;
				}
				.user_id_span1{
					margin-left: 10px;
					font-size: 12px;
					color: rgba(0, 0, 0, 0.537255);
				}
			}
			.replay_top_span{
				font-size: 12px;
				color: rgba(0, 0, 0, 0.537255);
			}
		}
		.replay_p{
			margin-top: 10px;
			line-height: 28px;
			font-size: 14px;
		}
	}
</style>
