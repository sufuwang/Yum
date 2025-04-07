<template>
	<view class="content u-flex-col u-col-center">
		<back-header :title="$t('navtitle.txt6')"></back-header>
		<view class="tips width-688">
			{{$t('pwd.txt5')}}
		</view>
		<view class="form-box width-688">
			<view class="form-item">
				<view class="input-label">{{$t('pwd.txt1')}}</view>
				<view class="px-font-14 input-item px-m-b-18">
					<u-input type="text" height="88" v-model="oldPsd" :placeholder="$t('common.plc')" />
				</view>
			</view>
			<view class="form-item">
				<view class="input-label">{{$t('pwd.txt2')}}</view>
				<view class="px-font-14 input-item px-m-b-18">
					<u-input type="text" height="88" v-model="newPsd" :placeholder="$t('common.plc')" />
				</view>
			</view>
			<view class="form-item">
				<view class="input-label">{{$t('pwd.txt3')}}</view>
				<view class="px-font-14 input-item px-m-b-18">
					<u-input type="text" height="88" v-model="confirmPsd" :placeholder="$t('common.plc')" />
				</view>
			</view>
			<view class="item_button">
				<view class="button" @click="resetHandle">
					{{$t('pwd.txt4')}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				/* 提交数据 */
				oldPsd:"",
				newPsd:"",
				confirmPsd:""
			};
		},
		methods:{
			judge(){
				if(this.oldPsd == "" || this.newPsd == "" || this.confirmPsd == "") {
					this.$u.toast(this.$t('pwd.txt7'));
					return false
				}
				if(this.newPsd != this.confirmPsd){
					this.$u.toast(this.$t('reg.tip3'));
					return false
				}
				return true
			},
			resetHandle(){
				let pass = this.judge();
				if(!pass) return;
				let params = {
					old_pass:this.oldPsd,
					new_pass:this.newPsd,
					type:'1',
				}
				this.$u.api.resetPsd(params).then(res => {
					// console.log(res);
					this.oldPsd = "";
					this.newPsd = "";
					this.confirmPsd = "";
					this.$u.toast(res.msg);
					setTimeout(()=>{
						this.$u.route({
							type:'back'
						})
					},1500)
				})
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
		color: #fff;
		.form-box {
			background: #F2F6F7;
			padding: 30px 20px;
			border-radius: 12px;

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

		.item_button {
			margin-top: 41px;
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
		}

		.tips {
			font-size: 14px;
			color: #092C4C;
			margin: 30px 0 40px;
		}
	}
	::v-deep.u-btn--bold-border {
		border: none;
	}
	
	::v-deep.u-input__input {
		color: #092C4C;
	}
</style>
