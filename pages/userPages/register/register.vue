<template>
	<view class="content u-flex-col u-col-center">
		<switch-lange-header :title="$t('login.txt4')">
			<view slot="left" @click="jumpToBack">
				<image
					class="back-icon"
					src="/static/images/common/back.png"
					mode=""
				></image>
			</view>
		</switch-lange-header>
		<view class="logo-tips width-688">
			<!-- {{$t('login.txt4')}} -->
			<image src="/static/images/common/logo.png" mode="widthFix"></image>
		</view>

		<view class="login-form width-688">
			<view class="blur-bg"></view>
			<view class="u-flex-col" style="z-index: 9; position: relative">
				<!-- <view class="input-label">{{$t('reg.txt3')}}</view> -->
				<view class="px-font-14 input-item px-m-b-50">
					<u-input
						type="text"
						height="88"
						v-model="username"
						:placeholder="$t('reg.txt3')"
					/>
				</view>
				<!-- <view class="input-label">{{$t('reg.txt4')}}</view> -->
				<view class="px-font-14 input-item px-m-b-50">
					<u-input
						type="text"
						height="88"
						v-model="userPhone"
						:placeholder="$t('reg.txt4')"
					/>
				</view>
				<!-- <view class="input-label">{{$t('reg.txt5')}}</view> -->
				<view class="px-font-14 input-item px-m-b-50">
					<u-input
						type="password"
						height="88"
						v-model="password"
						:placeholder="$t('reg.txt5')"
					/>
				</view>
				<!-- <view class="input-label">{{$t('reg.txt6')}}</view> -->
				<view class="px-font-14 input-item px-m-b-50">
					<u-input
						type="password"
						height="88"
						v-model="confirmPsd"
						:placeholder="$t('reg.txt6')"
					/>
				</view>
				<!-- 	<view class="input-label">{{$t('reg.txt7')}}</view> -->
				<view class="px-font-14 input-item px-m-b-50">
					<u-input
						type="password"
						height="88"
						v-model="payPsd"
						:placeholder="$t('reg.txt7')"
					/>
				</view>
				<!-- <view class="input-label">{{$t('reg.txt8')}}</view> -->
				<view class="px-font-14 input-item px-m-b-30">
					<u-input
						type="text"
						height="88"
						v-model="inviteCode"
						:placeholder="$t('reg.txt8')"
					/>
				</view>

				<!-- <view class="u-flex px-p-30 px-font-14">
				<text class="font-error u-label-50">
					Gender
				</text>
				<view class="u-flex u-flex-1 px-font-14 px-m-l-20 u-row-between" @click="selGender">
					<view>Select Gender</view>
					<u-icon name="arrow-down" color="#333" size="28"></u-icon>
				</view>
			</view> -->
				<view>
					<checkbox-group @change="checkboxChange">
						<label class="u-flex" style="color: white">
							<checkbox
								style="transform: scale(0.6)"
								value="1"
								color="#3F8AD1"
								:checked="agree"
							/>
							{{ $t("reg.txt9") }}
							<text class="px-m-l-10" @click.stop="jumpTerm">{{
								$t("reg.txt10")
							}}</text>
						</label>
					</checkbox-group>
				</view>
				<view class="reg-btn u-flex u-row-center" @click="regHandle">
					<text>{{ $t("login.txt4") }}</text>
					<!-- <image src="/static/images/common/arrow-point.png" mode=""></image> -->
				</view>
				<view class="reg-tips" @click="jumpToLogin">
					{{ $t("reg.txt11") }}
				</view>
				<view class="footer-copyright">
					{{ $t("common.copyright") }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import SwitchLangeHeader from "@/components/switchLangeHeader/switchLangeHeader.vue";
export default {
	components: {
		SwitchLangeHeader,
	},
	data() {
		return {
			agree: false,
			/* 注册提交数据 */
			username: "",
			userPhone: "",
			password: "",
			confirmPsd: "",
			payPsd: "",
			gender: "1",
			inviteCode: "",
		};
	},
	onLoad() {},
	methods: {
		resetForm() {
			this.username = "";
			this.userPhone = "";
			this.password = "";
			this.confirmPsd = "";
			this.payPsd = "";
			this.inviteCode = "";
		},
		regHandle() {
			let pass = this.judge();
			if (!pass) return;
			let params = {
				username: this.userPhone,
				pass: this.password,
				deal_pass: this.payPsd,
				invite_code: this.inviteCode,
				nickname: this.username,
			};
			this.$u.api.register(params).then((res) => {
				// console.log(res)
				this.resetForm();
				this.$u.toast(res.msg);
				setTimeout(() => {
					this.$u.route({
						url: "/pages/userPages/login/login",
					});
				}, 1500);
			});
		},
		judge() {
			if (!this.agree) {
				this.$u.toast(this.$t("reg.tip1"));
				return false;
			}
			if (
				this.username == "" ||
				this.userPhone == "" ||
				this.password == "" ||
				this.confirmPsd == "" ||
				this.payPsd == "" ||
				this.gender == "" ||
				this.inviteCode == ""
			) {
				this.$u.toast(this.$t("reg.tip2"));
				return false;
			}
			if (!this.$u.test.enOrNum(this.username)) {
				this.$u.toast(this.$t("reg.tip4"));
				return false;
			}
			if (!this.$u.test.enOrNum(this.userPhone)) {
				this.$u.toast(this.$t("reg.tip5"));
				return false;
			}
			if (this.password != this.confirmPsd) {
				this.$u.toast(this.$t("reg.tip3"));
				this.password = "";
				this.confirmPsd = "";
				return false;
			}
			return true;
		},
		checkboxChange(e) {
			let values = e.detail.value;
			if (values.length > 0) {
				this.agree = true;
			} else {
				this.agree = false;
			}
		},
		jumpTerm() {
			this.$u.route("/pages/userPages/agreement/agreement");
		},
		jumpToLogin() {
			this.resetForm();
			this.$u.route("/pages/userPages/login/login");
		},
		jumpToBack() {
			let canNavBack = getCurrentPages();
			if (canNavBack && canNavBack.length > 1) {
				uni.navigateBack();
			} else {
				history.back();
			}
		},
		selGender() {
			uni.showActionSheet({
				itemList: ["Female", "Male"],
				success: function (res) {
					if (res.tapIndex == 0) {
					} else {
					}
				},
				fail: function (res) {
					console.log(res.errMsg);
				},
			});
		},
	},
};
</script>
<style lang="scss" scoped>
.content {
	background-image: url("/static/images/common/outsider1-bg.png");
	background-size: 100% 100%;
	background-repeat: no-repeat;
	min-height: 100vh;

	.back-icon {
		width: 18px;
		height: 19px;
	}
	.logo-tips {
		// font-weight: 500;
		// color: #FFFFFF;
		// line-height: 90rpx;
		// font-size: 64rpx;
		text-align: center;
		margin-top: 30rpx;
		margin-bottom: 38rpx;
		image {
			width: 348rpx;
			height: 100rpx;
		}
	}

	.login-form {
		padding: 44rpx 34rpx;
		margin-top: 30rpx;
		position: relative;
		color: white;

		.blur-bg {
			border-radius: 24rpx 24rpx 0 0;
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			backdrop-filter: blur(0.53333rem);
			background-color: hsla(0, 0%, 100%, 0.267);
		}

		.input-item {
			background-color: #fff;
			padding: 3px 32rpx;
			border-radius: 20rpx;
			backdrop-filter: blur(0.53333rem);
			background-color: hsla(0, 0%, 100%, 0.267);
		}

		.input-label {
			font-size: 28rpx;
			color: #9c9c9c;
			margin-bottom: 16rpx;
		}

		.reg-btn {
			margin-top: 82rpx;
			height: 100rpx;
			line-height: 100rpx;
			background: #1675de;
			border-radius: 20rpx;
			font-size: 32rpx;
			color: #ffffff;
			image {
				width: 40rpx;
				height: 24rpx;
				margin-left: 28rpx;
			}
		}

		.reg-tips {
			font-size: 28rpx;
			margin-top: 40rpx;
			text-align: center;
		}
	}

	::v-deep.u-btn--bold-border {
		border: none;
	}

	::v-deep.u-input__input {
		color: #000;
	}

	::v-deepuni-checkbox .uni-checkbox-input {
		background-color: transparent;
	}

	.footer-copyright {
		font-size: 22rpx;
		color: #9c9c9c;
		margin-top: 100rpx;
		text-align: center;
		z-index: 999;
	}
}
</style>
