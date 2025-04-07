<!-- <template>  客服我的对调
	<view class="">
		<view class="h-header">
			<view class="h-status-bar" :style="{ height: statusBarHeight + 'px' }"></view>
			<view class="cus-header u-flex u-row-between">
				<image class="left-tip" src="/static/images/home/BG-02.png" mode="" @click="openServe"></image>
				<image class="center-logo" :src="logo" mode="widthFix"></image>
				<view class="px-font-12 u-font-bold right-con u-flex" @click="usercenter">
					<image src="/static/images/home/BG-021.png" mode=""></image>
					<view class="px-m-l-10">
						{{$t('uinfo.txt22')}}
					</view>
				</view>
			</view>
		</view> -->
		<template>
			<view class="">
				<view class="h-header">
					<view class="h-status-bar" :style="{ height: statusBarHeight + 'px' }"></view>
					<view class="cus-header u-flex u-row-between">
						<view class="px-font-12 u-font-bold right-con u-flex" @click="usercenter">
							<image src="/static/images/home/BG-021.png" mode=""></image>
							<view class="px-m-l-10">
								{{$t('uinfo.txt22')}}
							</view>
						</view>
						<image class="center-logo" :src="logo" mode="widthFix"></image>
						<image class="left-tip" src="/static/images/home/BG-02.png" mode="" @click="openServe"></image>
					</view>
				</view>
		<!-- 解决fixed定位后导航栏塌陷的问题 -->
		<view class="u-navbar-placeholder" :style="{ width: '100%', height: 40 + statusBarHeight + 'px' }"></view>
	</view>
	
</template>

<script>
	// 获取系统状态栏的高度
	let systemInfo = uni.getSystemInfoSync();
	export default {
		name: "h-header",
		props:{
			logo:{
				type: String,
				default: ''
			}
		},
		data() {
			return {
				statusBarHeight: systemInfo.statusBarHeight
			};
		},
		methods: {
			usercenter() {
				this.$u.route('/pages/userPages/userCenter/userCenter')
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
		}
	}
</script>

<style lang="scss" scoped>
	.h-header{
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
		color: #009adf;
		background-color: #fff;
		padding: 0 17px;
		height: 40px;

		.left-tip {
			width: 30px;
			height: 30px;
		}

		.center-logo {
			width: 170px;
			height: 26px;
		}

		.right-con {
			image {
				width: 25px;
				height: 25px;
			}
		}
	}
</style>
