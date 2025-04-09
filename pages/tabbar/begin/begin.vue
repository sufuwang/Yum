<template>
	<l-base :logo="vuex_config.app_logo" :activeIndex="1" :scrollDis="scrollDis">
		<view class="content u-flex-col u-col-center">
			<!-- 滚动图片 -->
			<view class="scroll-img u-m-t-30 u-m-b-30 scroll-horizontal">
				<scroll-view scroll-x="true" style="height: 380rpx;">
					<view class="u-flex">
						<view class="scroll-item" v-for="(item,i) in 5" :key="i">
							<image :src="'/static/images/start/ad'+i+'.jpg?'+Math.random()" mode="aspectFill"></image>
							<!-- <view class="pos-desc px-p-l-26 px-p-b-22">
								<view class="px-font-16">text title</view>
								<view class="px-font-12">text decription</view>
							</view> -->
						</view>
					</view>
				</scroll-view>
			</view>
			<!-- 等级 -->
			<view class="u-flex u-row-between level-box">
				<view class="u-flex level-title">
					<image :src="userInfo.level && userInfo.level.img" mode=""></image>
					<view class="px-m-l-20 px-font-16">{{userInfo.level && userInfo.level.name}}</view>
				</view>
				<view class="px-font-14 u-flex" @click="goLevelDesc">
					<text class="px-m-r-10 level-more">{{$t('home.txt12')}}</text>
					<!-- <u-icon name="arrow-right" color="#9F9F9F" size="28"></u-icon> -->
				</view>
			</view>
			<!-- 下单区域 -->
			<view class="handle-warp">
				<view class="u-flex u-row-between">
					<view class="circle-progress u-flex u-row-center">
						<u-circle-progress border-width="16" width="260" bg-color="transparent" active-color="#1675DE" :percent="userInfo.complatePersent" v-if="userInfo.overOrder>0">
							<view class="progress-content u-text-center">
								<view class="progress-num px-font-22">{{userInfo.overOrder || 0}}</view>
								<view class="progress-info px-font-14 px-m-t-12">{{$t('begin.txt20')}}</view>
							</view>
						</u-circle-progress>
					</view>
					<view class="circle-progress u-flex u-row-center">
						<u-circle-progress border-width="16" width="260" bg-color="transparent" active-color="#ea5e5b" :percent="userInfo.lastPersent">
							<view class="progress-content u-text-center">
								<view class="progress-num px-font-22">{{userInfo.order_total}}/{{userInfo.level && userInfo.level.order_num}}</view>
								<view class="progress-info px-font-14 px-m-t-12">{{$t('begin.txt21')}}</view>
							</view>
						</u-circle-progress>
					</view>
				</view>
				<view class="btn" @click="starthandle">{{$t('begin.txt1')}}</view>
				<view class="u-flex px-font-14 u-row-between wealth">
					<view>
						<view>{{$t('begin.txt2')}}</view>
						<view>{{userInfo.today_profit}}<text class="px-m-l-10">SGD</text></view>
					</view>
					<view class="u-text-right">
						<view>{{$t('begin.txt22')}}</view>
						<view>{{$t('begin.txt23')}}</view>
					</view>
				</view>
				
				<u-line color="#E5E5E5" :hair-line="false" />
				<view class="u-flex px-font-14 u-row-between wealth">
					<view>
						<view>{{$t('begin.txt4')}}</view>
						<view>{{userInfo.balance}} <text class="px-m-l-10">SGD</text></view>
					</view>
					<view class="u-text-right">
						<view>{{$t('begin.txt24')}}</view>
						<view>{{$t('begin.txt25')}}</view>
					</view>
				</view>
				<!-- <view class="btn" @click="starthandle">{{$t('begin.txt1')}}</view> -->
			</view>
			<view class="width-688 bottom-tips">
				<view class="px-font-13 tips-title">{{$t('begin.txt6')}}</view>
				<view class="px-m-t-10 px-font-11">{{$t('begin.txt7')}}: </view>
				<view class="px-font-11">{{ vuex_config.operation_time }}</view>
				<view class="px-font-11">{{$t('begin.txt8')}}!</view>
			</view>
			<!-- 自定义loading -->
			<view class="cus-loading" v-if="showLoading">
				<image src="/static/images/common/loading.svg" mode=""></image>
			</view>
			<!-- 下单弹窗 -->
			<u-popup mode="bottom" v-model="showPop">
				<view class="pop-box">
					<view class="header u-flex u-row-between">
						<text>{{$t('begin.txt9')}}</text>
						<image class="close" src="/static/images/start/close-white.png" mode="" @click="closePop"></image>
					</view>
					<view class="creat-info u-flex-col u-col-center">
						<image class="c-icon" :src="goodsInfo.goods_img" mode="heightFix"></image>
						<view class="c-name px-m-t-20 px-font-18">
							{{goodsInfo.goods_name}}
						</view>
						<view class="money-box u-flex px-m-t-74 px-p-b-50">
							<view class="box-item">
								<view class="title px-font-14">
									{{$t('begin.txt10')}}
								</view>
								<view class="nums px-font-18 px-m-t-20">
									{{goodsInfo.price}} SGD
								</view>
							</view>
							<view class="box-item">
								<view class="title px-font-14">
									{{$t('begin.txt11')}}
								</view>
								<view class="nums px-font-18 px-m-t-20 profit-num">
									{{goodsInfo.commission}} SGD
								</view>
							</view>
						</view>
						<view class="u-flex u-row-between info-list">
							<view class="label">
								{{$t('begin.txt12')}}
							</view>
							<view class="txt-val">
								{{goodsInfo.create_time}}
							</view>
						</view>
						<view class="u-flex u-row-between info-list">
							<view class="label">
								{{$t('begin.txt13')}}
							</view>
							<view class="txt-val">
								{{goodsInfo.order_no}}
							</view>
						</view>
						<view class="sub-orer-btn" @click="submissionHandle">
							{{$t('begin.txt14')}}
						</view>
					</view>
				</view>
			</u-popup>
		</view>
	</l-base>
</template>

<script>
	import lBase from "@/layout/l-base";
	import math from "@/utils/math.js"
	export default {
		components: {
			lBase
		},
		data() {
			return {
				showLoading: false,
				showPop: false,
				/* 用户信息 */
				userInfo: {},
				/* 轮播二维数据 */
				appList: [],
				/* 订单生成后返回商品信息 */
				goodsInfo: {}
			}
		},
		onLoad() {
			this.initData();
		},
		onShow() {
			this.getUser();
		},
		methods: {
			// 跳转至订单页
			// jumpToLogs(){
			// 	uni.switchTab({
			// 		url: "/pages/tabbar/history/history"
			// 	})
			// 	this.$u.vuex('vuex_index_pop',true);
			// },
			// jumpToWithdraw(){
			// 	this.$u.route('/pages/withdraw/withdraw')
			// },
			goLevelDesc() {
				this.$u.route('/pages/levelList/levelList')
			},
			getUser() {
				this.$u.api.userInfo().then(res => {
					this.userInfo = res.data;
					this.userInfo.overOrder = res.data.level.order_num - res.data.order_total;
					this.userInfo.complatePersent = Number(math.multiple(math.division(res.data.order_total,res.data.level.order_num),100,2));
					this.userInfo.lastPersent = Number(math.subtr(100,this.userInfo.complatePersent,0));
					console.log(this.userInfo)
				})
			},
			/* 跳转到描述 */
			jumpDesc(app) {
				console.log(app)
				this.$u.route('/pages/companyDesc/companyDesc', {
					id: app.id
				})
			},
			/* 数组分割 */
			sliceIntoChunks(arr, chunkSize) {
				const res = [];
				for (let i = 0; i < arr.length; i += chunkSize) {
					const chunk = arr.slice(i, i + chunkSize);
					res.push(chunk);
				}
				return res;
			},
			/* 获取滚动数据 */
			initData() {
				this.$u.api.scrollList().then(res => {
					let mulList = this.sliceIntoChunks(res.data, 24);
					this.appList = mulList;
				})
			},
			/* 关闭密码弹窗 */
			closePop() {
				this.showPop = false;
			},
			/* 生成订单 */
			starthandle() {
				let time = Date.parse(new Date()) / 1000;
				let nowTime = this.$u.timeFormat(time, 'yyyy/mm/dd hh:MM:ss');
				this.showLoading = true;
				this.$u.api.creatOrder({
					web_time: nowTime
				}).then(res => {
					this.showLoading = false;
					this.goodsInfo = res.data;
					this.showPop = true;
				}).catch(err => {
					this.showLoading = false;
					console.log(err)
					if (err.data.status == 0) {
						uni.hideToast();
						this.noBanlaceTips(err.data.num)
					}
					if (err.data.status == 1) {
						uni.hideToast();
						this.noLastOrder(err.data.num)
					}
				})
				this.getUser();
			},
			/* 做完单提示 */
			noLastOrder(num) {
				const that = this;
				uni.showModal({
					title: that.vuex_config.app_name,
					showCancel: false,
					content: `${that.$t('begin.txt17')} ${num} ${that.$t('begin.txt18')}`,
					confirmText: that.$t('common.confirm'),
					confirmColor: '#1775DD',
					success: function(res) {
						if (res.confirm) {

						} else if (res.cancel) {

						}
					}
				});
			},
			/* 余额不足提示 */
			noBanlaceTips(num) {
				const that = this;
				uni.showModal({
					title: that.vuex_config.app_name,
					content: `${that.$t('begin.txt15')} ${num}SGD ${that.$t('begin.txt16')}`,
					confirmText: that.$t('home.txt6'),
					confirmColor: '#1775DD',
					success: function(res) {
						if (res.confirm) {
							that.$u.route('/pages/deposit/deposit')
						} else if (res.cancel) {}
					}
				});
			},
			/* 提交订单 */
			submissionHandle() {
				this.showLoading = true;
				let params = {
					order_id: this.goodsInfo.order_id
				}
				this.$u.api.subOrder(params).then(res => {
					this.$u.toast(res.msg)
					this.showLoading = false;
					this.closePop();
					this.getUser();
				}).catch(err => {
					this.showLoading = false;
				})
			}
		}
	}
</script>
<style>
	@import url("@/static/common/css/bg.css");
</style>
<style lang="scss" scoped>
	.content {
		.scroll-img{
			width: 688rpx;
			.scroll-item{
				position: relative;
				margin-left: 34rpx;
				&:first-child{
					margin-left: 0;
				}
				.pos-desc{
					position: absolute;
					left: 0;
					bottom: 0;
					color: #FFFFFF;
				}
				image{
					width: 468rpx;
					height: 360rpx;
					border-radius: 24rpx;
				}
				&:last-child{
					padding-right: 34rpx;
				}
			}
			&.partner{
				.partner-title{
					font-size: 32rpx;
					font-weight: 500;
					color: #092C4C;
					margin-left: 34rpx;
					margin-bottom: 30rpx;
				}
				.scroll-item{
					image{
						width: 468rpx;
						height: 160rpx;
						border-radius: 20rpx;
					}
				}
			}
		}
		.level-box{
			width: 688rpx;
			padding: 15px 20px;
			font-size: 32rpx;
			margin: 0 0 60rpx;
			background: #804747db;
			box-shadow: 0rpx 0rpx 24rpx 0rpx rgba(0,0,0,0.1);
			border-radius: 24rpx;
			color: #FFFFFF;
			.level-title{
				// color: #092C4C;
				image {
					width: 50rpx;
					height: 50rpx;
				}
			}
			.level-more{
				// color: #FF7957;
			}
		}
			
		.handle-warp{
			min-width: 344px;
			max-width: 2160px;
			padding: 20px;
			margin: 20px auto 0;
			background: #804747db;
			box-shadow: 0rpx 0rpx 24rpx 0rpx rgba(0,0,0,0.1);
			border-radius: 24rpx;
			.circle-progress{
				width: 140px;
				border-radius: 50%;
				height: 140px;
				background: #FFFFFF;
				border: 2rpx solid #CED0DE;
				margin-top: -55px;
				margin-bottom: 5px;
			}
			.wealth{
				color: #fbf7f7ed;
				padding: 19px 0;
			}
			.btn {
				margin-top: 8px;
				background-color: #e64340db;
				color: #fff;
				text-align: center;
				height: 50px;
				line-height: 50px;
				border-radius: 12px;
				font-size: 16px;
			}
		}

		.new-box {
			margin-top: 48px;

			.new-item {
				background-color: #0d1e5cf7;
				border: 1px solid #4152E5;
				border-radius: 6px;
				padding: 0 15px 0 28px;
				color: #fff;
				height: 119px;

				image {
					width: 63px;
					height: 67px;
					margin-right: 29px;
				}

				.new-txt1 {
					font-size: 16px;
					color: #79FAFD;
				}

				.new-txt2 {
					margin-top: 8px;
					font-size: 24px;
				}
			}

			.left-item {
				margin-bottom: 22px;

				image {
					width: 64px;
					height: 79px;
				}
			}
		}



		.profit-box {
			margin: 0 auto;
			padding: 10px 5px;
			border-radius: 12px !important;

			.icon-left {
				width: 30px;
				height: 30px;
			}

			.con-center {
				width: 90px;

				.w-115 {
					width: 115px;
				}
			}

			.con-right {
				width: 140px;
			}
		}

		.bottom-tips {
			margin-top: 44rpx;
			color: #9C9C9C;
			text-align: center;

			.tips-title {
				margin-bottom: 10rpx;
			}
		}
	}

	.cus-loading {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		color: #fff;
		background: rgba(0, 0, 0, .4);
		left: 0;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 99999;
	}

	.pop-box {
		background-color: #FFFFFF;
		border-radius: 24px 24px 0 0;
		color: #092C4C;
		padding-bottom: 45px;

		.header {
			font-size: 16px;
			padding: 23px 20px;
			border-bottom: 1px solid #CCCCCC;

			.close {
				width: 16px;
				height: 16px;
			}
		}

		.creat-info {
			padding: 42rpx 40rpx 0;

			.c-icon {
				height: 60px;
				width: 60px;
				border-radius: 50%;
			}

			.money-box {
				width: 100%;
				border-bottom: 1px solid #F8F8F8;

				.box-item {
					width: 50%;
					text-align: center;

					.nums {
						font-weight: bold;
						color: #1775DD;
					}

					.profit-num {
						color: #43CF7C;
					}
				}
			}

			.info-list {
				width: 100%;
				font-size: 14px;
				padding: 15px 0;

				.label {
					color: #ABB3BB;
				}
			}

			.sub-orer-btn {
				margin-top: 40px;
				width: 100%;
				color: #fff;
				text-align: center;
				height: 50px;
				line-height: 50px;
				border-radius: 12px;
				font-size: 16px;
				background: #1775DD;
			}
		}
	}
</style>