<template>
	<view class="conent">
		<back-header :title="$t('home.txt11')"></back-header>
		<view class="lists" v-if="levList.length>0">
			<view class="list-item u-flex u-col-top" v-for="(lev,index) in levList" :key="index">
				<view class="lev-left">
					<image class="lev-icon" :src="lev.img" mode=""></image>
					<view class="px-font-10 tag" v-if="userInfo.level_id == lev.id">{{$t('lev.txt2')}}</view>
				</view>
				<view class="px-m-l-20 px-m-t-10 u-flex-1">
					<view class="top-info">
						<view class="title u-flex u-row-between">
							<view class="u-flex">
								<text class="px-font-18">{{ lev.name }}</text>
							</view>
						</view>
					</view>
					<view class="desc">
						<u-parse :html="lev.node"></u-parse>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				levList: [],
				userInfo: {}
			};
		},
		onLoad() {
			this.getUser();
			this.getList();
		},
		methods: {
			update(lev) {
				const that = this;
				let tip;
				if (this.vuex_lang == 'en') {
					tip = `The accumulated first Deposit of \n VND ${lev.price} can be \n upgraded to ${lev.name}!`;
				} else if (this.vuex_lang == 'vi-VN') {
					tip = `Số tiền gửi tích lũy đầu tiên của \n VND ${lev.price} có thể được \n nâng cấp lên ${lev.name}!`;
				} else {
					tip = `累積的第一筆存款 \n VND ${lev.price} \n 可以升級到 ${lev.name}！`
				}

				uni.showModal({
					title: that.vuex_config.app_name,
					content: tip,
					confirmText: that.$t('common.confirm'),
					confirmColor: '#1775DD',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							that.buyVipHandle(lev.id)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			/* 购买vip */
			buyVipHandle(level_id) {
				this.$u.api.buyVip({
					level_id
				}).then(res => {
					// console.log(res)
					this.$u.toast(res.msg);
				})
			},
			/* 获取用户信息 */
			getUser() {
				this.$u.api.userInfo().then(res => {
					this.userInfo = res.data;
				})
			},
			getList() {
				this.$u.api.vipList().then(res => {
					let list = res.data;
					list.map(item => {
						// let str1 = `<p><b>${item.order_rate_txt} profit per deal<br>
						// Maximum ${item.order_num} applications per set of data improvement<br>
						// Maximum of ${item.ring} sets of improvement tasks per day</b></p>`;
						let str1 = `<p style='line-height: 24px;'>・${item.order_rate_txt} profit per deal<br>
							・Maximum ${item.order_num} applications per set of data improvement<br>
							・Activate with an SGD$ ${item.ring} </p>`;
						let str2 = `<p style='line-height: 24px;'>・Lợi nhuận ${item.order_rate_txt} trên mỗi giao dịch<br>
							・Có tối đa ${item.order_num} ứng dụng trên mỗi bộ cải tiến dữ liệu<br>
							・Tối đa ${item.ring} bộ nhiệm vụ cải tiến mỗi ngày</p>`;

						// let str3 = `<p><b>每筆交易 ${item.order_rate_txt} 利潤<br>
						// 	每組數據改進最多 ${item.order_num} 個應用<br>
						// 	每天最多 ${item.ring} 組改進任務</b></p>`;
						let str3 = `<p style='line-height: 24px;'>・每筆交易 ${item.order_rate_txt} 利潤<br>
								・每組數據改進最多 ${item.order_num} 個應用<br>
								・重置激活円$ ${item.ring} </p>`;
						let str4 = `<p style='line-height: 24px;'>・トランザクションごとに ${item.order_rate_txt} 利益<br>
							・データセットごとに最も改善されたもの ${item.order_num} アプリケーション<br>
							・リセットアクティベーション円$ ${item.ring} </p>`;
						if (this.vuex_lang == 'en') {
							item.node = str1;
						} else if (this.vuex_lang == 'vi-VN') {
							item.node = str2;
						} else if (this.vuex_lang == 'japan') {
							item.node = str4;
						} else {
							item.node = str3
						}
					})
					this.levList = list;
				})
			}
		}
	}
</script>

<style>
	@import url("@/static/common/css/bg.css");
</style>
<style lang="scss" scoped>
	.conent {
		padding-bottom: 30px;
		.lists {
			padding: 46rpx 46rpx 0;
				
			.list-item {
				padding: 30rpx 14rpx;
				margin-bottom: 46rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 0rpx 24rpx 0rpx rgba(9,44,76,0.1);
				border-radius: 12rpx;
				color: #383838;
				.lev-icon {
					width: 160rpx;
					height: 160rpx;
				}
				.top-info {
					.title {
						color: #092C4C;
						margin-bottom: 10rpx;
						font-weight: 500;
					}

					.price {
						color: #50657a;
						margin: 10px 0;
						font-weight: 600;
					}
				}

				.desc {
					font-size: 14px;
					font-weight: normal;
				}
				
				.lev-left{
					.tag {
						margin-top: -20rpx;
						margin-left: 28rpx;
						width: 100rpx;
						height: 40rpx;
						text-align: center;
						color: #1675DE;
					}
				}
			}
		}
	}
</style>