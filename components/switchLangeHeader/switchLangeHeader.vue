<template>
	<view class="">
		<view class="h-header">
			<view class="h-status-bar" :style="{ height: statusBarHeight + 'px' }"></view>
			<view class="cus-header u-flex u-row-between">
				<view class="u-slot-left">
					<slot name="left"></slot>
				</view>
				<view class="center-con">
					{{title}}
					<!-- <image src="/static/images/common/logo.png" mode="widthFix"></image> -->
				</view>
				<!-- <view class="right-con u-flex" @click="setLang">
					<image src="/static/images/common/language.png" mode=""></image>
					<text>{{vuex_current_lang}}</text>
				</view> -->
			</view>
		</view>
		<!-- 解决fixed定位后导航栏塌陷的问题 -->
		<view class="u-navbar-placeholder" :style="{ width: '100%', height: 80 + statusBarHeight + 'px' }"></view>
	</view>

</template>

<script>
	// 获取系统状态栏的高度
	let systemInfo = uni.getSystemInfoSync();
	export default {
		name: "switchLangeHeader",
		props: {
			// 导航栏标题
			title: {
				type: String,
				default: ''
			},
		},
		data() {
			return {
				statusBarHeight: systemInfo.statusBarHeight
			};
		},
		methods: {
			setLang() {
				const that = this;
				uni.showActionSheet({
					itemList: ['日本語', 'English'],
					success: function(res) {
						if (res.tapIndex == 0) {
							uni.setLocale('japan');
							that.$u.vuex('vuex_lang', 'japan');
							that.$u.vuex('vuex_current_lang', '日本語');
							that.$i18n.locale = 'japan';
							// }else if(res.tapIndex==1){
							// 	uni.setLocale('en');
							// 	that.$u.vuex('vuex_lang','en');
							// 	that.$i18n.locale = 'en';
						} else {
							uni.setLocale('en');
							that.$u.vuex('vuex_lang', 'en');
							that.$u.vuex('vuex_current_lang', 'EN');
							that.$i18n.locale = 'en';
						}
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.h-header {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		width: 100%;
		z-index: 999;
	}

	.h-status-bar {
		width: 100%;
	}

	.cus-header {
		position: relative;
		background-color: transparent;
		height: 80px;
		padding:  22px;
		.center-con{
			position: absolute;
			left: calc(50% - 125rpx);
			text-align: center;
			width: 250rpx;
			font-size: 32rpx;
			color: #FFFFFF;
			// image{
			// 	width: 250rpx;
			// 	height: 72rpx;
			// }
		}
		.right-con {
			position: absolute;
			right: 0;
			padding: 30rpx;
			line-height: 40rpx;
			color: #FFFFFF;
			font-size: 28rpx;
			image{
				width: 40rpx;
				height: 40rpx;
				margin-right: 14rpx;
			}
		}
	}
</style>