<template>
	<view class="content">
		<back-header :title="$t('navtitle.txt4')"></back-header>
		<view class="lists">
			<view class="list-item u-flex u-row-between">
				<view class="label">
					{{$t('uinfo.txt18')}}
				</view>
				<view class="u-flex">
					<image class="headimg" src="/static/images/common/headimg.jpg" mode=""></image>
				</view>
			</view>
			<view class="list-item u-flex u-row-between">
				<view class="label">
					{{$t('uinfo.txt19')}}
				</view>
				<view class="u-flex">
					<text class="desc">{{userInfo.username}}</text>
				</view>
			</view>
			<view class="list-item u-flex u-row-between">
				<view class="label">
					{{$t('uinfo.txt1')}}
				</view>
				<view class="u-flex">
					<text class="desc">{{userInfo.invite_code}}</text>
				</view>
			</view>
			<!-- <view class="list-item u-flex u-row-between" @click="selGender">
				<view class="label">
					Gender
				</view>
				<view class="u-flex">
					<text class="desc">Female</text>
					<u-icon name="arrow-right" color="#CED0DE" size="32"></u-icon>
				</view>
			</view> -->
		</view>
		<view class="lists">
			<view class="list-item u-flex u-row-between" @click="jumpPage('/pages/password/password')">
				<view class="label">
					{{$t('uinfo.txt21')}}
				</view>
				<view class="u-flex">
					<u-icon name="arrow-right" color="#ABB3BB" size="32"></u-icon>
				</view>
			</view>
		</view>
		<view class="lists">
			<view class="list-item u-flex u-row-between" @click="jumpPage('/pages/payPassword/payPassword')">
				<view class="label">
					{{$t('uinfo.txt20')}}
				</view>
				<view class="u-flex">
					<u-icon name="arrow-right" color="#ABB3BB" size="32"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{}
			};
		},
		onShow() {
			this.getUser()
		},
		methods:{
			/* 获取用户信息 */
			getUser(){
				this.$u.api.userInfo().then(res => {
					// console.log(res)
					this.userInfo = res.data;
				})
			},
			selGender(){
				uni.showActionSheet({
					itemList: ['Female', 'Male'],
					success: function (res) {
						if(res.tapIndex==0){
						}else{
						}
					},
					fail: function (res) {
						console.log(res.errMsg);
					}
				});
			},
			jumpPage(url){
				this.$u.route(url);
			}
		}
	}
</script>
<style>
	@import url("@/static/common/css/bg.css");
</style>
<style lang="scss" scoped>
	.content {
		padding-top: 40px;
		color: #fff;
		.lists{
			margin: 0 15px 10px;
			background: #FFFFFF;
			border-radius: 24rpx;
			padding:0 18px;
			.list-item{
				padding: 19px 0;
				border-bottom: 1rpx solid #F2F4F6;
				border-top: 1px solid #F2F4F6;
				&:last-child{
					border-bottom: none;
				}
				&:first-child{
					border-top: none;
				}
				.label{
					font-size: 16px;
					color: #808080;
				}
				.headimg{
					height: 36px;
					width: 36px;
					border-radius: 50%;
				}
				.desc{
					font-size: 16px;
					color: #092C4C;
				}
			}
		}
	}
</style>
