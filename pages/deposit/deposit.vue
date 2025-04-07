<template>
	<view class="content">
		<back-header :title="$t('navtitle.txt8')"></back-header>
		<view class="box1">
			<view class="balance">
				<view class="px-font-14">{{$t('withdraw.txt3')}}</view>
				<view class="px-font-18 px-m-t-10 balance-num">{{userInfo.balance}} SGD</view>
			</view>
		</view>
		<view class="top-switch u-flex">
			<view class="tab-item" :class="{'active':tabIndex==0}" @click="setTab(0)">{{$t('deposit.txt1')}}</view>
			<view class="tab-item" :class="{'active':tabIndex==1}" @click="setTab(1)">{{$t('deposit.txt2')}}</view>
		</view>
		<view v-if="tabIndex==0">
			<view class="box2">
				<view class="lists u-flex u-row-between">
					<view class="list-item px-font-15" v-for="(item,index) in payList" :key="index" :class="{'l-active':listIndex == index}" @click="selItem(index)">
						<view class="money-name">SGD</view>
						<view class="px-m-t-12">{{item.num}}</view>
					</view>
				</view>
				<view class="form-box">
					<view class="form-item">
						<view class="input-label">{{$t('deposit.txt5')}}</view>
						<view class="px-font-14 input-item px-m-b-28">
							<u-input type="number" height="88" :placeholder="$t('common.plc')" />
						</view>
					</view>
				</view>
				<view class="recharge u-flex u-row-center">
					<view class="button" @click="payMethodes">
						{{$t('deposit.txt6')}}
					</view>
				</view>
			</view>
		</view>
		<!-- 记录 -->
		<view class="list-box px-p-30" v-else>
			<view class="list-item" v-if="false">
				<image class="icon" src="/static/images/home/dep_log.png" mode=""></image>
				<view class="info">
					<!-- <view class="u-flex">
						<view class="title">
							Deposit
						</view>
						<text class="status status_1">Paid</text>
					</view> -->
					<view class="u-flex u-row-between">
						<text class="money">195000000.00</text>
						<text class="create_time">2023-01-10 19:20:16</text>
					</view>
				</view>
			</view>
			<view>
				<u-empty :text="$t('common.empty')" src="/static/images/common/empty.png" icon-size="600rpx"></u-empty>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{},
				tabIndex: 0,
				/* 套餐 */
				listIndex:null,
				payList:[{num:'2000.00'},{num:'5000.00'},{num:'10000.00'}],
				// payList:[{num:'1.000.000'},{num:'2.000.000'},{num:'5.000.000'},{num:'1.000.000'},{num:'2.000.000'},{num:'5.000.000'}]
			};
		},
		onShow() {
			this.getUser()
		},
		methods: {
			/* 获取用户信息 */
			getUser(){
				this.$u.api.userInfo().then(res => {
					this.userInfo = res.data;
				})
			},
			setTab(i) {
				if (this.tabIndex == i) return;
				this.tabIndex = i;
			},
			selItem(i){
				if(this.listIndex == i) return;
				this.listIndex = i;
			},
			async payMethodes(){
				let {data} = await this.$u.api.serverList();
				let action = data.map(item=>item.name);
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
			}
		}
	}
</script>
<style>
	page{
		background-color: #FFFFFF;
	}
</style>
<style lang="scss" scoped>
	.content {
		padding: 0px 15px;
		color: #fff;
		.top-switch {
			margin: 60rpx 0;
			color: #FFFFFF;
			font-size: 14px;
			padding: 8rpx;
			.tab-item{
				height: 88rpx;
				width: 216rpx;
				line-height: 88rpx;
				text-align: center;
				border-radius: 24rpx;
				border-radius: 24rpx;
				border: 2rpx solid #808080;
				color: #808080;
				margin-right: 20rpx;
			}
			.active {
				background: #1775DD;
				border: none;
				color: #FFFFFF;
			}
		}
		.box1{
			margin-top: 38px;
			.balance{
				background: url('/static/images/common/balance-bg.png') no-repeat;
				background-size: cover;
				border-radius: 24rpx;
				height: 220rpx;
				padding: 52rpx 48rpx;
				color: #98C3F5;
				.balance-num{
					color: #fff;
				}
			}
		}
		.box2{
			background: #F2F6F7;
			padding: 30px 20px;
			border-radius: 12px;
			
			.lists{
				.list-item{
					width: 33.33333%;
					padding: 13px 0;
					text-align: center;
					border-radius: 12px;
					background-color: initial;
					color: #092C4C;
					margin-right: 10px;
					margin-bottom: 10px;
					border: 2rpx solid #ABB3BB;
					&:last-child{
						margin-right: 0;
					}
					.money-name{
						color: #808080;
					}
				}
				.l-active{
					border: 2rpx solid #1775DD;
					color: #1775DD !important;
					.money-name{
						color: #1775DD;
					}
				}
			}
			.form-box {
				.form-item {
					padding: 10px 0;
					font-size: 14px;
					color: #092C4C;
				
					.input-label {
						font-size: 28rpx;
						color: #808080;
						margin-bottom: 20rpx;
					}
					.input-item {
						background: #FFFFFF;
						border-radius: 6px;
						border: 2rpx solid #E9E9E9;
						padding: 0px 36rpx;
					}
				}
			}
			.recharge{
				margin-bottom: 10px;
				.button{
					width: 100%;
					color: #fff;
					text-align: center;
					height: 50px;
					line-height: 50px;
					border-radius: 11px;
					font-size: 16px;
					background: linear-gradient(330deg, #1212FF 0%, #30D9E6 100%);
				}
			}
		}
		.list-box{
			.list-item{
				background: rgba(255,255,255,0.1);
				color: #fff;
				padding: 11px 18px;
				border-radius: 6px;
				display: flex;
				justify-content: flex-start;
				flex-wrap: nowrap;
				align-items: center;
				margin-bottom: 18px;
				.info{
					flex: 1;
				}
				.icon{
					width: 36px;
					height: 36px;
					border-radius: 18px;
					margin-right: 10px;
				}
				.title{
					font-size: 14px;
					font-weight: 600;
				}
				.status{
					font-size: 12px;
					background-color: #590f7f;
					padding: 2px 10px;
					color: #fff;
					border-radius: 3px;
				}
				.status_0{
					background-color: #590f7f;
				}
				.status_1{
					background-color: #590f7f;
				}
				.status_2{
				    background-color: #555;
				}
				.create_time{
					font-size: 12px;
					color: #CED0DE;
					text-align: right;
				}
				.money{
					font-size: 15px;
					color: #FFFFFF;
				}
				.red{
					color: #590f7f;
				}
				.green{
					color: #18bc37;
				}
			}
		}
	}
</style>
