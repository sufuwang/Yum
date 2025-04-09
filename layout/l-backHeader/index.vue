<template>
	<view class="container">
		<back-header :title="$t(title)" />
		<slot></slot>
	</view>
</template>
<script>
export default {
	props: {
		title: {
			type: String,
			default: "",
		},
	},
};
</script>
<style lang="scss" scoped>
.container {
	position: relative;

	.header {
		position: absolute;
	}
}
</style>
