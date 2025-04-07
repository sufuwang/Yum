<template>
	<view class="content">
		<back-header :title="$t('navtitle.txt13')"></back-header>
		<view class="text_rich">
			<view class="px-font-26 px-m-b-30">{{node.title}}</view>
			<u-parse :html="node.content"></u-parse>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				node:'',
				nid:""
			};
		},
		onLoad(e) {
			this.nid = e.id;
		},
		onShow() {
			this.getDesc()
		},
		methods:{
			getDesc(){
				let time=Date.parse(new Date())/1000;
				let nowTime=this.$u.timeFormat(time, 'yyyy/mm/dd hh:MM:ss');
				this.$u.api.newsDetail({
					web_time:nowTime,
					id:this.nid
				}).then(res => {
					this.node = res.data;
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.text_rich{
	padding: 15px;
	font-size: 14px;
	color: #000;
	background: #fff;
}
</style>
