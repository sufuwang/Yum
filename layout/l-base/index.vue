<template>
	<view class="container">
		<h-header class="header" :logo="logo" :scrollTop="scrollDis"></h-header>
		<view class="body"><slot></slot></view>
		<h-tabbar class="tabbar" :activeIndex="activeIndex"></h-tabbar>
	</view>
</template>
<script>
export default {
	props: {
		activeIndex: {
			type: Number,
			default: 0,
		},
		logo: {
			type: String,
			default: "",
		},
		scrollDis: {
			type: Number,
			default: 0,
		},
	},
	watch: {
		scrollDis(newVal) {
			console.info("scrollDis", newVal);
		},
	},
};
</script>
<style lang="scss" scoped>
.container {
	width: 100%;
	min-height: 100vh;

	.header {
		max-width: 500px;
		width: 100vw;
		position: fixed;
		top: 0px;
		left: 0px;
		right: 0px;
		margin: 0 auto;
		z-index: 10000;
	}
	.body {
		overflow-y: auto;
		padding: 54px 0 80px 0;
	}
	.tabbar {
		max-width: 500px;
		width: 100vw;
		position: fixed;
		bottom: 0px;
		left: 0px;
		right: 0px;
		margin: 0 auto;
		z-index: 10000;
	}
}
</style>
