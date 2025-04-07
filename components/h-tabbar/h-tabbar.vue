<template>
	<view style="width: 100%;">
	<!-- 自定义tabbar -->
	<view class="u-flex u-row-between px-font-12 cus_tabBar">
		<view class="tabbar-item" @click="jumpPage('/pages/tabbar/index/index')">
			<view class="sel-icon" v-if="activeIndex==0">
				<image class="tab-active-img" src="/static/images/tabbar/home-in.png" mode="heightFix"></image>
				<view class="tab-txt">
					{{$t('index.home')}}
				</view>
			</view>
			<image class="tab-img" src="/static/images/tabbar/home.png" mode="heightFix" v-else></image>
		</view>
		<view class="tabbar-item" @click="jumpPage('/pages/tabbar/begin/begin')">
			<view class="sel-icon" v-if="activeIndex==1">
				<image class="tab-active-img" src="/static/images/tabbar/start-in.png" mode="heightFix"></image>
				<view class="tab-txt">
					{{$t('index.begin')}}
				</view>
			</view>
			<image class="tab-img" src="/static/images/tabbar/start.png" mode="heightFix" v-else></image>
		</view>
		<view class="tabbar-item" @click="jumpPage('/pages/tabbar/history/history')">
			<view class="sel-icon u-flex" v-if="activeIndex==2">
				<image class="tab-active-img" src="/static/images/tabbar/his-in.png" mode="heightFix"></image>
				<view class="tab-txt">
					{{$t('index.order')}}
				</view>
			</view>
			<image class="tab-img" src="/static/images/tabbar/his.png" mode="heightFix" v-else></image>
		</view>
		<view class="tabbar-item" @click="openServe">
			<image class="tab-img" src="/static/images/tabbar/server.png" mode="heightFix"></image>
			<!-- <view class="tab-txt">
				{{$t('index.order')}}
			</view> -->
		</view>
	</view>
	<!-- 高度塌陷占位 -->
	<view class="tabbar-placehold"></view>
	</view>
</template>

<script>
	export default {
		name: "h-tabbar",
		data() {
			return {

			};
		},
		props: {
			activeIndex: {
				default: 0
			}
		},
		created() {
			uni.hideTabBar();
		},
		methods: {
			jumpPage(url) {
				uni.navigateTo({
					url: url
				})
				this.$u.vuex('vuex_index_pop', true);
			},
			/* 打开客服 */
			async openServe() {
				let {
					data
				} = await this.$u.api.serverList();
				let action = data.map(item => item.name);
				uni.showActionSheet({
					itemList: action,
					success: function(res) {
						let url = data[res.tapIndex].val;
						// #ifdef APP-PLUS
						plus.runtime.openURL(url)
						// #endif
						// #ifdef H5
						window.open(url)
						// #endif
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			},
		},
	}
</script>

<style lang="scss" scoped>
	.cus_tabBar {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		background: #FFFFFF;
		box-shadow: 0rpx -4rpx 32rpx 0rpx rgba(9,44,76,0.1);
		z-index: 999;
		flex-direction: row;
		height: 78px;
		color: #fff;
		font-size: 16px;
		padding: 0 15px;
		.tab-img {
			width: 26px;
			height: 22px;
		}
		
		.tab-active-img{
			width: 26px;
			height: 20px;
		}

		.tabbar-item {
			.sel-icon{
				background-color: #E7F1FB;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 120px;
				height: 48px;
				border-radius: 48px;
				.tab-txt{
					margin-left: 8px;
					color: #1675DE;
				}
			}
		}

	}
	.tabbar-placehold{
		width: 100%;
		height: 100px;
		margin-top: 30px;
	}
</style>