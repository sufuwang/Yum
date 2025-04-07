<template>
	<view class="content u-flex-col u-col-center">
		<!-- <switch-lange-header></switch-lange-header> -->
		<view class="logo-tips">
			<image src="/static/images/common/logo.png" mode=""></image>
			<view class="desc-tips">
				{{$t('welcome.title')}}
			</view>
			<view class="wel-desc u-m-t-12">{{$t('welcome.desc')}}</view>
		</view>
		<view class="pos-btn u-flex">
			<view class="jump-btn btn1 u-m-r-20" @click="jump('/pages/userPages/login/login')">
				<text>{{$t('login.txt3')}}</text>
			</view>
			<view class="jump-btn btn2" @click="jump('/pages/userPages/register/register')">
				<text>{{$t('login.txt4')}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import SwitchLangeHeader from "@/components/switchLangeHeader/switchLangeHeader.vue";
	export default {
		components: {
			SwitchLangeHeader
		},
		data() {
			return {

			};
		},
		methods:{
			jump(url){
				this.$u.route(url)
			}
		}
	}
</script>

<style>
	page {
		background-image: url('/static/images/common/outsider1-bg.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		min-height: 100vh;
		background-attachment: fixed;
		color: #fff;
	}
	@media screen and (min-width: 500px){
		page{
			/* background-image: url('/static/images/common/outsider-bg-pc.png'); */
		}
	}
</style>
<style lang="scss" scoped>
	.content {
		.logo-tips {
			margin-top: 136rpx;
			width: 448rpx;
			text-align: center;
			image {
				width: 348rpx;
				height: 100rpx;
			}

			.desc-tips {
				margin-top: 108rpx;
				text-align: center;
				font-size: 64rpx;
				color: #FFFFFF;
				line-height: 90rpx;
				font-weight: 500;
			}
			.wel-desc{
				font-size: 29rpx;
				color: #FFFFFF;
				line-height: 44rpx;
			}
		}
		.pos-btn{
			position: fixed;
			bottom: 160rpx;
		}
		.jump-btn {
			width: 300rpx;
			height: 100rpx;
			text-align: center;
			line-height: 100rpx;
			border-radius: 12rpx;
		}
		.btn1{
			background: #1675DE;
			box-shadow: 0rpx 4rpx 0rpx 0rpx #003F87;
		}
		.btn2{
			background: #FF7957;
			box-shadow: 0rpx 4rpx 0rpx 0rpx #785800;
		}

		.footer {
			font-size: 22rpx;
			color: #FFFFFF;
			line-height: 300rpx;
			// position: fixed;
			bottom: 38rpx;
		}
	}
</style>