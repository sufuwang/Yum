<template>
	<view class="content u-flex-col u-col-center">
		<back-header :title="$t('navtitle.txt11')"></back-header>
		<view class="tips width-688">
			{{$t('bind.txt1')}}
		</view>
		<view style="width: 100%;" class="u-m-b-30">
			<u-tabs bg-color="transparent" inactive-color="#8c9298" :list="tabList" :is-scroll="false"
				:current="current" @change="change"></u-tabs>
		</view>
		<!-- 已添加 -->
		<view class="bank-info px-font-14" v-if="current==0">
			<view v-if="setInfo.type==1">
				<view class="u-flex pay-minfo">
					<image src="/static/images/common/paypal.png" mode=""></image>
					<text>Paypal</text>
				</view>
				<view class="px-m-t-10 u-flex u-row-between">
					<view class="p-label">{{$t('bind.txt10')}}</view>
					<view>{{ setInfo.account_name }}</view>
				</view>
				<view class="px-m-t-10 u-flex u-row-between">
					<view class="p-label">{{$t('bind.txt9')}}</view>
					<view>{{ setInfo.card_no }}</view>
				</view>
			</view>
			<view v-if="setInfo.type==2">
				<view class="u-flex pay-minfo">
					<image src="/static/images/common/visa.png" mode=""></image>
					<text>Visa/MasterCard</text>
				</view>
				<view class="px-m-t-10 u-flex u-row-between">
					<view class="p-label">{{$t('bind.txt2')}}</view>
					<view>{{ setInfo.account_name }}</view>
				</view>
				<view class="px-m-t-10 u-flex u-row-between">
					<view class="p-label">{{$t('bind.txt3')}}</view>
					<view>{{ setInfo.name }}</view>
				</view>
				<view class="px-m-t-10 u-flex u-row-between">
					<view class="p-label">{{$t('bind.txt9')}}</view>
					<view>{{ setInfo.account_open_name }}</view>
				</view>
				<view class="px-m-t-10 u-flex u-row-between">
					<view class="p-label">{{$t('bind.txt10')}}</view>
					<view>{{ setInfo.mobile }}</view>
				</view>
				<view class="px-m-t-10 u-flex u-row-between">
					<view class="p-label">{{$t('bind.txt4')}}</view>
					<view>{{ setInfo.card_no }}</view>
				</view>
			</view>
		</view>
		<!-- 去添加 -->
		<view v-if="current==1">
			<view style="width: 100%;" class="u-m-b-30">
				<u-tabs bg-color="transparent" inactive-color="#ABB3BB" :list="payList" :is-scroll="false"
					:current="currentPay" @change="changePay"></u-tabs>
			</view>
			<view class="form-box width-688">
				<view v-if="currentPay==0">
					<view class="u-flex pay-minfo">
						<image src="/static/images/common/paypal.png" mode=""></image>
						<text>Paypal</text>
					</view>
					<view class="form-item">
						<view class="input-label">{{$t('bind.txt10')}}</view>
						<view class="px-font-14 input-item px-m-b-18">
							<u-input type="text" height="88" v-model="paypalInfo.account_name" :disabled="canChange"
								:placeholder="$t('bind.txt10')" />
						</view>
					</view>
					<view class="form-item">
						<view class="input-label">{{$t('bind.txt9')}}</view>
						<view class="px-font-14 input-item px-m-b-18">
							<u-input type="text" height="88" v-model="paypalInfo.card_no" :disabled="canChange"
								:placeholder="$t('bind.txt9')" />
						</view>
					</view>
				</view>
				<view v-if="currentPay==1">
					<view class="u-flex pay-minfo">
						<image src="/static/images/common/visa.png" mode=""></image>
						<text>Visa/MasterCard</text>
					</view>
					<view class="form-item">
						<view class="input-label">{{$t('bind.txt2')}}</view>
						<view class="px-font-14 input-item px-m-b-18">
							<u-input type="text" height="88" v-model="bankInfo.account_name" :disabled="canChange"
								:placeholder="$t('bind.txt2')" />
						</view>
					</view>
					<view class="form-item">
						<view class="input-label">{{$t('bind.txt3')}}</view>
						<view class="px-font-14 input-item px-m-b-18">
							<u-input type="text" height="88" v-model="bankInfo.name" :disabled="canChange"
								:placeholder="$t('bind.txt3')" />
						</view>
					</view>
					<view class="form-item">
						<view class="input-label">{{$t('bind.txt9')}}</view>
						<view class="px-font-14 input-item px-m-b-18">
							<u-input type="text" height="88" v-model="bankInfo.account_open_name" :disabled="canChange"
								:placeholder="$t('bind.txt9')" />
						</view>
					</view>
					<view class="form-item">
						<view class="input-label">{{$t('bind.txt10')}}</view>
						<view class="px-font-14 input-item px-m-b-18">
							<u-input type="text" height="88" v-model="bankInfo.mobile" :disabled="canChange"
								:placeholder="$t('bind.txt10')" />
						</view>
					</view>
					<view class="form-item">
						<view class="input-label">{{$t('bind.txt4')}}</view>
						<view class="px-font-14 input-item px-m-b-18">
							<u-input type="text" height="88" v-model="bankInfo.card_no" :disabled="canChange"
								:placeholder="$t('bind.txt4')" />
						</view>
					</view>
				</view>
				
				<view class="item_button">
					<view class="button" v-if="!canChange" @click="setHandle">
						{{$t('bind.txt6')}}
					</view>
					<view class="button reset-btn" v-if="canChange" @click="modifyHandle">
						{{$t('bind.txt7')}}
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
				bankInfo: {
					account_name: "", //持卡人
					name: "",
					card_no: "",
					account_open_name: "", //开户支行
					mobile: ""
				},
				paypalInfo: {
					account_name: "",
					card_no: ""
				},
				dealPass: "",
				/* 修改标识 */
				canChange: false,
				/* 设置的支付密码 */
				userPay: "",
				/* tab切换 */
				tabList: [{
					name: this.$t('bind.txt11')
				}, {
					name: this.$t('bind.txt12')
				}],
				current: 0,
				payList: [{
					name: 'paypal'
				}, {
					name: 'visa'
				}],
				currentPay: 0,
				setInfo:{}
			};
		},
		onLoad() {
			this.getBankInfo()
		},
		methods: {
			changePay(index) {
				this.currentPay = index;
			},
			change(index) {
				this.current = index;
			},
			modifyHandle() {
				this.bankInfo.account_name = "";
				this.bankInfo.name = "";
				this.bankInfo.card_no = "";
				this.bankInfo.account_open_name = "";
				this.bankInfo.mobile = "";
				this.paypalInfo.account_name = "";
				this.paypalInfo.card_no = '';
				this.dealPass = "";
				this.canChange = false;
			},
			async getBankInfo() {
				let {
					data
				} = await this.$u.api.userInfo();
				this.userPay = data.deal_pass;
				if (data.bind_card == 1) {
					this.$u.api.getBank().then(res => {
						this.canChange = true;
						this.setInfo = this.$u.deepClone(res.data);
						if(res.data.type==2){
							this.currentPay = 1;
							this.bankInfo = res.data;
							this.paypalInfo.account_name = "";
							this.paypalInfo.card_no = '';
						}else{
							this.currentPay = 0;
							this.paypalInfo = res.data;
							this.bankInfo.account_name = "";
							this.bankInfo.name = "";
							this.bankInfo.card_no = "";
							this.bankInfo.account_open_name = "";
							this.bankInfo.mobile = "";
						}
					})
				} else {
					this.canChange = false;
				}
			},
			setHandle() {
				let pass = this.judge();
				if (!pass) return;
				let parmas;
				if(this.currentPay == 1){
					parmas = {
						type:2,
						name: this.bankInfo.name,
						account_name: this.bankInfo.account_name,
						card_no: this.bankInfo.card_no,
						account_open: this.bankInfo.account_open_name,
						mobile: this.bankInfo.mobile
					}
				}else{
					parmas = {
						type:1,
						account_name: this.paypalInfo.account_name,//昵称
						card_no: this.paypalInfo.card_no,//邮箱
					}
				}
				this.$u.api.setBank(parmas).then(res => {
					this.dealPass = "";
					this.$u.toast(res.msg);
					this.getBankInfo()
				})
			},
			judge() {
				
				if(this.currentPay==1){
					if (this.bankInfo.account_name == "" || this.bankInfo.name == "" ) {
						this.$u.toast(this.$t('bank.tip1'));
						return false
					}
				}else if(this.currentPay==0){
					if (this.paypalInfo.account_name == "" ) {
						this.$u.toast(this.$t('bank.tip1'));
						return false
					}
				}
				
			
				return true
			},
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
		padding: 15px;

		.tips {
			font-size: 14px;
			color: #092C4C;
			margin: 30px 0 40px;
		}

		.bank-info {
			background: #1775DD;
			padding: 16px 21px;
			border-radius: 12px;
			width: 100%;
			color: #fff;
			.pay-minfo{
				font-size: 20px;
				padding-bottom: 15px;
				margin-bottom: 15px;
				border-bottom: 2rpx solid rgba(255,255,255,0.1);
				image{
					width: 41px;
					height: 41px;
					border-radius: 12px;
					margin-right: 15px;
				}
			}
			
			.p-label{
				color: #98C3F5;
			}
		}

		.form-box {
			background: #F2F6F7;
			padding: 16px;
			border-radius: 12px;
			
			.pay-minfo{
				font-size: 20px;
				padding-bottom: 15px;
				margin-bottom: 15px;
				border-bottom: 2rpx solid rgba(9,44,76,0.1);
				image{
					width: 41px;
					height: 41px;
					border-radius: 12px;
					margin-right: 15px;
				}
			}
			
			.form-item {
				padding: 10px 0;
				font-size: 14px;
				color: #092C4C;

				.input-label {
					font-size: 14px;
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

		.item_button {
			margin-top: 60rpx;

			.button {
				width: 100%;
				color: #fff;
				text-align: center;
				height: 50px;
				line-height: 50px;
				border-radius: 12px;
				font-size: 16px;
				background: #1775DD;
			}

			.reset-btn {
				// background: #bababa !important;
			}
		}
	}

	::v-deep.u-btn--bold-border {
		border: none;
	}

	::v-deep.u-input__input {
		color: #092C4C;
	}
</style>