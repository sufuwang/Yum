<template>
	<view class="content px-p-30 u-flex-col u-col-center">
		<back-header :title="$t('navtitle.txt2')"></back-header>
		<view class="m-0-center width-688 px-m-t-40 info-box">
			<view class="user-top u-flex-col u-col-center">
				<view class="avatar">
					<image class="photo" src="/static/images/common/headimg.jpg" mode=""></image>
					<view class="medal">
						<image class="level-icon" :src="userInfo.level && userInfo.level.img" mode=""></image>
					</view>
				</view>
				<view class="user-info px-m-t-10">
					<view class="px-font-16">
						{{userInfo.username}}
					</view>
				</view>
				<view class="px-m-t-10 px-font-12 u-text-center invit-txt" @click="copyTxt(userInfo.invite_code)">
					{{$t('uinfo.txt1')}}：{{userInfo.invite_code}}
				</view>
			</view>

			<view class="u-flex u-row-around px-font-14 u-col-top user-bottom">
				<view class="u-text-center p-item" @click="jumpToLogs">
					<view class="u-font-bold px-font-12 pro-num">{{$t('uinfo.txt3')}}</view>
					<view class="px-m-t-20 px-font-16 pro-txt u-flex u-row-center">
						<text>{{userInfo.today_profit}} SGD</text>
						<image class="rate" src="/static/images/home/upper.png" mode=""></image>
					</view>
				</view>
				<u-line color="#2365AF" direction="col" length="30px" :hair-line="false" margin="0 15px" />
				<view class="u-text-center p-item" @click="jumpToWithdraw">
					<view class="u-font-bold px-font-12 pro-num">{{$t('uinfo.txt4')}}</view>
					<view class="px-m-t-20 px-font-16 pro-txt2">{{userInfo.balance}} SGD</view>
				</view>
			</view>
		</view>
		<view class="m-0-center width-688 px-m-t-40 user-list u-flex u-row-between u-flex-wrap">
			<view class="list-item u-flex u-row-between" v-for="(item,index) in menuList" :key="index"
				@click="jumpPage(item.url)">
				<view class="u-flex">
					<image :src="item.icon" mode=""></image>
					<view class="px-font-16 px-m-l-20">{{ item.txt }}</view>
				</view>
				<u-icon name="arrow-right" color="#ABB3BB" size="32"></u-icon>
			</view>
		</view>
		<view class="exit-btn px-p-20 u-flex u-row-center width-688" @click="exitHandle">
			<image src="/static/images/home/arr-r-circle.png" mode=""></image>
			<text>{{$t('uinfo.txt5')}}</text>
		</view>
		<!-- 密码弹窗 -->
		<u-popup mode="bottom" v-model="showPop">
			<view class="pop-box">
				<view class="header u-flex u-row-between">
					<text>{{$t('uinfo.txt6')}}</text>
					<image class="close" src="/static/images/home/close.png" mode="" @click="closePop"></image>
				</view>
				<view class="input_item px-m-t-15 u-flex">
					<view class="label">
						{{$t('uinfo.txt7')}}
					</view>
					<u-input class="c-input" input-align="right" :clearable="false" :placeholder="$t('common.plc')"
						v-model="payPass" type="password" :border="false" :password-icon="true" />
				</view>
				<view class="btn" @click="compareKey">
					{{$t('uinfo.txt8')}}
				</view>
			</view>
		</u-popup>
		<!-- modal -->
		<h-modal ref="HModal" :tipsContent="$t('uinfo.txt9')" :logo="vuex_config.app_logo" @confirm="doExit"></h-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				/* 弹窗标识 */
				showPop: false,
				/* 菜单列表 */
				menuList: [{
					icon: "/static/images/home/BG-018.png",
					txt: this.$t('uinfo.txt11'),
					url: "/pages/deposit/deposit"
				}, {
					icon: "/static/images/home/BG-011.png",
					txt: this.$t('uinfo.txt12'),
					url: "/pages/withdraw/withdraw"
				}, {
					icon: "/static/images/home/BG-09.png",
					txt: this.$t('uinfo.txt13'),
					url: "/pages/walletLogs/walletLogs",
				}, {
					icon: "/static/images/home/BG-013.png",
					txt: this.$t('uinfo.txt15'),
					url: "/pages/bindAccount/bindAccount",
				}, {
					icon: "/static/images/home/start.png",
					txt: this.$t('index.begin'),
					url: "/pages/tabbar/begin/begin",
				}, {
					icon: "/static/images/home/BG-010.png",
					txt: this.$t('uinfo.txt17'),
					url: "/pages/noticList/noticList"
				}, {
					icon: "/static/images/home/BG-08.png",
					txt: this.$t('uinfo.txt14'),
					url: "/pages/userPages/userInfo/userInfo"
				}, {
					icon: "/static/images/home/BG-02.png",
					txt: this.$t('uinfo.txt16'),
					url: "serve"
				}],
				payPass: "",
				/* 用户信息 */
				userInfo: {},
			};
		},
		onShow() {
			this.getUser()
		},
		methods: {
			// 跳转至订单页
			jumpToLogs() {
				uni.navigateTo({
					url: "/pages/tabbar/history/history"
				})
				this.$u.vuex('vuex_index_pop', true);
			},
			jumpToWithdraw() {
				this.$u.route('/pages/withdraw/withdraw')
			},
			copyTxt(txt) {
				uni.setClipboardData({
					data: txt,
					success: function() {
						console.log('success');
					}
				});
			},
			/* 对比支付密码 */
			compareKey() {
				if (this.payPass == '') {
					this.$u.toast(this.$t('password.tip1'))
					return
				}
				if (this.payPass != this.userInfo.deal_pass) {
					this.$u.toast(this.$t('password.tip2'));
					return
				}
				this.payPass = '';
				this.closePop();
				this.$u.route('/pages/bindAccount/bindAccount')
			},
			/* 获取用户信息 */
			getUser() {
				this.$u.api.userInfo().then(res => {
					// console.log(res)
					this.userInfo = res.data;
				})
			},
			/* 跳转 */
			jumpPage(url) {
				if (url == 'psd') {
					this.showPop = true;
				} else if (url == 'serve') {
					this.openServe()
				} else {
					this.$u.route(url);
				}
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
			/* 退出modal */
			exitHandle() {
				this.$refs.HModal.open()
			},
			/* 退出登录 */
			doExit() {
				this.$u.api.logout().then(res => {
					this.$u.toast(res.msg);
					setTimeout(() => {
						this.$u.route({
							type: 'reLaunch',
							url: '/pages/userPages/login/login',
						})
					}, 1500)
				})
			},
			/* 关闭密码弹窗 */
			closePop() {
				this.showPop = false;
			}
		}
	}
</script>
<style>
	@import url("@/static/common/css/bg.css");
</style>
<style lang="scss" scoped>
	.content {
		color: #fff;

		.info-box {
			color: #fff;
			border-radius: 10px;
			background-color: #1675DE;

			.user-top {
				margin-top: 38rpx;

				.avatar {
					position: relative;
					.photo{
						width: 66px;
						height: 66px;
						border-radius: 50%;
						border: 2px solid #fff;
					}
					.medal{
						position: absolute;
						right: 2px;
						bottom: 2px;
						width:20px;
						height: 20px;
						background: #1675DE;
						border-radius: 50%;
						.level-icon {
							width: 100%;
							height: 100%;
						}
					}
				}

				.invit-txt{
					color: rgba(255,255,255,0.6);
				}
				.edit-icon {
					width: 28rpx;
					height: 28rpx;
					padding: 20rpx 0;
				}
			}

			.user-bottom {
				margin: 16px 22px 21px;
				padding: 16px 0;
				background: rgba(6,68,140,0.66);
				border-radius: 12px;
				.p-item{
					width: 50%;
				}
				.pro-txt {
					color: #FF7957;
					.rate{
						margin-left: 8px;
						width: 12px;
						height: 17px;
					}
				}

				.pro-txt2 {
					color: #FFFFFF;
				}
			}

		}

		.user-list {
			.list-item {
				width: 100%;
				color: #092C4C;
				height: 60px;
				border-radius: 12px;
				background: #FFFFFF;
				margin-bottom: 10px;
				text-align: center;
				padding: 0 20px 0 16px;
				image {
					width: 40px;
					height: 40px;
				}
			}
		}

		.exit-btn {
			margin: 30px 0;
			color: #fff;
			font-size: 15px;
			text-align: center;
			height: 50px;
			line-height: 50px;
			background: #1775DD;
			border-radius: 12px;
			position: relative;
			image{
				position: absolute;
				width: 36px;
				height: 36px;
				left: 7px;
				top: 7px;
			}
		}

		.pop-box {
			background-color: #fff;
			padding: 15px;
			border-radius: 15px 15px 0 0;
			height: 40vh;

			.header {
				font-size: 17px;
				color: #333;

				.close {
					width: 16px;
					height: 16px;
				}
			}

			.input_item {
				color: #333;
				font-size: 15px;
				margin-bottom: 20px;
				margin-top: 15px;
				background-color: #f1f1f1;
				border-radius: 10px;
				height: 46px;
				line-height: 46px;
				padding: 0 10px 0 20px;

				.c-input {
					::v-deep .u-input__input {
						height: 46px;
						line-height: 46px;
						font-size: 16px;
					}
				}
			}

			.btn {
				width: 100%;
				background-color: #416cc7;
				color: #fff;
				text-align: center;
				height: 46px;
				line-height: 46px;
				border-radius: 25px;
				font-size: 15px;
				margin-top: 20px;
			}
		}
	}
</style>