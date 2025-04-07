<template>
	<view class="content">
		<back-header :title="$t('home.txt10')"></back-header>
		<view class="text_rich">
			<u-parse :html="node"></u-parse>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				node:"",
			};
		},
		onShow() {
			this.getAgree()
		},
		methods:{
			getAgree() {
				this.$u.api.regAgree().then(res => {
					this.node = res.data.register_agree;
				})
			},
		}
	}
</script>
<style>
	@import url("@/static/common/css/bg.css");
</style>
<style lang="scss" scoped>
.text_rich{
	padding: 15px;
	font-size: 14px;
	color: #fff;
}
</style>
