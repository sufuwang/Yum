<template>
	<view class="">
		<view class="h-header">
			<view class="h-status-bar" :style="{ height: statusBarHeight + 'px' }"></view>
			<view class="cus-header u-flex u-row-between" :style="{'backgroundColor':scrollTop>10?'#798DA3':defaultBg}">
				<view class="left-tip" @click="usercenter">
					<image src="/static/images/home/more.png" mode=""></image>
				</view>
				<image class="center-logo" :src="logo" mode="widthFix"></image>
				<view class="right-alert">
					<image class="right-con" src="/static/images/home/header-message.png" mode="" @click="goNotic"></image>
					<view class="point"></view>
				</view>
			</view>
		</view>
		<!-- 解决fixed定位后导航栏塌陷的问题 -->
		<view class="u-navbar-placeholder" :style="{ width: '100%', height: 65 + statusBarHeight + 'px' }"></view>
	</view>

</template>

<script>
	// 获取系统状态栏的高度
	let systemInfo = uni.getSystemInfoSync();
	export default {
		name: "h-header",
		props: {
			defaultBg:{
				type: String,
				default: 'transparent'
			},
			logo: {
				type: String,
				default: ''
			},
			scrollTop:{
				type: [String,Number],
				default: 0
			}
		},
		data() {
			return {
				statusBarHeight: systemInfo.statusBarHeight
			};
		},
		methods: {
			goNotic() {
				this.$u.route('/pages/noticList/noticList')
			},
			usercenter() {
				this.$u.route('/pages/userPages/userCenter/userCenter')
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
		height: 65px;
		padding: 0 42rpx;
		transition: all linear 0.1s;
		.left-tip {
			image {
				width: 36rpx;
				height: 8rpx;
			}
		}

		.center-logo {
			width: 250rpx;
			height: 72rpx;
		}
		
		.right-alert{
			position: relative;
			.right-con {
				width: 44rpx;
				height: 42rpx;
			}
			.point{
				position:absolute;
				width: 14rpx;
				height: 14rpx;
				background: #FF7957;
				border-radius: 50%;
				top: 0;
				right: 4rpx;
			}
		}
	}
</style>