<template>
	<view class="content u-flex-col u-col-center">
		<switch-lange-header :title="$t('login.txt3')">
			<view slot="left" @click="goWel">
				<image class="back-icon" src="/static/images/common/back.png" mode=""></image>
			</view>
		</switch-lange-header>
		<view class="logo-tips width-688">
			<!-- {{$t('login.txt3')}} -->
			<image src="/static/images/common/logo.png" mode="widthFix"></image>
		</view>
		<view class="login-form width-688">
			<view class="u-flex-col" style="z-index: 9;position: relative;">
				<view class="input-label">{{$t('login.txt5')}}</view>
				<view class="px-font-14 input-item">
					<u-input type="text" height="88" v-model="account" :placeholder="$t('login.txt5')" />
				</view>
				<view class="input-label u-m-t-40">{{$t('login.txt6')}}</view>
				<view class="px-font-14 input-item">
					<u-input type="password" height="88" v-model="password" :placeholder="$t('login.txt6')" />
				</view>
				<view class="u-flex-y px-m-t-34">
					<view class="u-flex u-row-between">
						<view class="px-font-14">
							<checkbox-group @change="checkboxChange">
								<label class="u-flex" style="color: #092C4C;">
									<checkbox style="transform:scale(0.55)" value="1" color="#3F8AD1" :checked="remember" />
									{{$t('login.txt7')}}
								</label>
							</checkbox-group>
						</view>
						<view class="px-font-14 color-txt" @click="openServe">
							{{$t('login.txt8')}}
						</view>
					</view>
				</view>
				<view class="login-btn u-flex u-row-center" @click="loginHandle">
					<text>{{$t('login.txt3')}}</text>
				</view>
				
			</view>
		</view>

		<view class="footer">
			{{$t('common.copyright')}}
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
				/* 登录提交数据 */
				account: "",
				password: "",
				remember: false, //记住账号
			}
		},
		onShow() {
			this.account = this.vuex_remember_account;
			if(this.vuex_remember_account!=''){
				this.remember = true;
			}
		},
		onLoad() {},
		methods: {
			goWel(){
				this.$u.route('/pages/userPages/welcome/welcome')
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
			checkboxChange(e) {
				let values = e.detail.value;
				if (values.length > 0) {
					this.remember = true;
				} else {
					this.remember = false;
				}
			},
			judge() {
				if (this.account == "" || this.password == "") {
					this.$u.toast(this.$t('login.tip1'));
					return false
				}
				if (!this.$u.test.enOrNum(this.account)) {
					this.$u.toast(this.$t('reg.tip4'));
					return false
				}
				return true
			},
			loginHandle() {
				let pass = this.judge();
				if (!pass) return;
				let params = {
					username: this.account,
					pass: this.password,
				}
				this.$u.api.login(params).then(res => {
					if (this.remember){
						this.$u.vuex('vuex_remember_account', this.account);
					}else{
						this.$u.vuex('vuex_remember_account', '');
					}
					this.$u.vuex('vuex_authorization', res.data.authorization);
					this.$u.toast(res.msg);
					setTimeout(() => {
						this.$u.route({
							type: 'reLaunch',
							url: '/pages/tabbar/index/index',
						})
					}, 1500)
				})
			},
			jumpToReg() {
				this.account = "";
				this.password = "";
				this.$u.route('/pages/userPages/register/register')
			},

		}
	}
</script>

<style>
	page {
		background-image: url('/static/images/common/outsider-bg.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		min-height: 100vh;
		background-attachment: fixed;
	}
	@media screen and (min-width: 500px){
		page{
			/* background-image: url('/static/images/common/outsider-bg-pc.png'); */
		}
	}
</style>
<style lang="scss" scoped>
	.content {
		.back-icon {
			width: 18px;
			height: 19px;
		}
		.logo-tips {
			
			text-align: center;
			margin-top: 30rpx;
			margin-bottom: 38rpx;
			image{
				width: 348rpx;
				height: 100rpx;
			}
		}

		.login-form {
			padding: 44rpx 34rpx;
			margin-top: 30rpx;
			background-color: #FFFFFF;
			border-radius: 24rpx;
			.input-item {
				background-color: #fff;
				padding: 3px 32rpx;
				border: 2rpx solid #E9E9E9;
				border-radius: 50rpx;
			}

			.input-label {
				font-size: 28rpx;
				color: #9C9C9C;
				margin-bottom: 16rpx;
			}
			
			.login-btn{
				margin-top: 92rpx;
				height: 100rpx;
				line-height: 100rpx;
				background: #1675DE;
				border-radius: 32rpx;
				font-size: 32rpx;
				color: #FFFFFF;
				image{
					width: 40rpx;
					height: 24rpx;
					margin-left: 28rpx;
				}
			}
			.color-txt{
				color: #FF7957;
			}
			.reg-tips{
				color: #092C4C;
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
		
		::v-deepuni-checkbox .uni-checkbox-input{
			background-color:transparent;
		}

		.footer {
			font-size: 22rpx;
			color: #FFFFFF;
			line-height: 25rpx;
			position: fixed;
			bottom: 38rpx;
		}
	}
</style>
</style>