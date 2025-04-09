<template>
	<!-- 自定义tabbar -->
	<view class="u-flex u-row-between px-font-12 cus_tabBar">
		<view class="tabbar-item" @click="jumpPage('/pages/tabbar/index/index')">
			<view class="sel-icon" v-if="activeIndex == 0">
				<image
					class="tab-active-img"
					src="/static/images/tabbar/home-in.png"
					mode="heightFix"
				></image>
				<view class="tab-txt">
					{{ $t("index.home") }}
				</view>
			</view>
			<image
				class="tab-img"
				src="/static/images/tabbar/home.png"
				mode="heightFix"
				v-else
			></image>
		</view>
		<view class="tabbar-item" @click="jumpPage('/pages/tabbar/begin/begin')">
			<view class="sel-icon" v-if="activeIndex == 1">
				<image
					class="tab-active-img"
					src="/static/images/tabbar/start-in.png"
					mode="heightFix"
				></image
				><view class="tab-txt">
					{{ $t("index.begin") }}
				</view>
			</view>
			<image
				class="tab-img"
				src="/static/images/tabbar/start.png"
				mode="heightFix"
				v-else
			></image>
		</view>
		<view
			class="tabbar-item"
			@click="jumpPage('/pages/tabbar/history/history')"
		>
			<view class="sel-icon u-flex" v-if="activeIndex == 2">
				<image
					class="tab-active-img"
					src="/static/images/tabbar/his-in.png"
					mode="heightFix"
				></image>
				<view class="tab-txt">
					{{ $t("index.order") }}
				</view>
			</view>
			<image
				class="tab-img"
				src="/static/images/tabbar/his.png"
				mode="heightFix"
				v-else
			></image>
		</view>
		<view class="tabbar-item" @click="openServe">
			<image
				class="tab-img"
				src="/static/images/tabbar/server.png"
				mode="heightFix"
			></image>
		</view>
	</view>
</template>

<script>
export default {
	name: "h-tabbar",
	data() {
		return {};
	},
	props: {
		activeIndex: {
			default: 0,
		},
	},
	created() {
		uni.hideTabBar();
	},
	methods: {
		jumpPage(url) {
			uni.navigateTo({
				url: url,
			});
			this.$u.vuex("vuex_index_pop", true);
		},
		/* 打开客服 */
		async openServe() {
			let { data } = await this.$u.api.serverList();
			let action = data.map((item) => item.name);
			uni.showActionSheet({
				itemList: action,
				success: function (res) {
					let url = data[res.tapIndex].val;
					// #ifdef APP-PLUS
					plus.runtime.openURL(url);
					// #endif
					// #ifdef H5
					window.open(url);
					// #endif
				},
				fail: function (res) {
					console.log(res.errMsg);
				},
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.cus_tabBar {
	flex-direction: row;
	color: #fff;
	font-size: 16px;
	height: var(--tabbar-height);
	background: rgba(255, 255, 255, 0.4);
	backdrop-filter: blur(6px);
	width: 100%;

	.tab-img {
		width: 26px;
		height: 22px;
	}

	.tab-active-img {
		width: 26px;
		height: 20px;
	}

	.tabbar-item {
		.sel-icon {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: 14px;
			.tab-txt {
				color: #1675de;
			}
		}
	}
}
.tabbar-placehold {
	width: 100%;
	height: 100px;
	margin-top: 30px;
}
</style>
