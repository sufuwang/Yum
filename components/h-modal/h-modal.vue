<template>
	<view>
		<u-popup mode="center" v-model="showPop" @close="close">
			<view class="modal-box">
				<view class="creat-info u-flex-col u-col-center">
					<view class="modal-content u-flex u-row-center">
						{{ tipsContent }}
					</view>
					<view class="modal-btn-box u-flex u-row-between">
						<view class="btn-item cancel-btn" @click="cancel">
							{{ $t('common.cancel') }}
						</view>
						<view class="btn-item confirm-btn" @click="confirm">
							{{ $t('uinfo.txt10') }}
						</view>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default{
		name: "h-modal",
		props: {
			logo: {
				type: String,
				default: '/static/images/common/logo.png'
			},
			tipsContent:{
				type:String,
				default:""
			},
			cancelTxt:{
				type:String,
				default:""
			},
			confirmTxt:{
				type:String,
				default:""
			}
		},
		data(){
			return{
				showPop:false
			}
		},
		methods:{
			cancel() {
				this.$emit('cancel');
				this.showPop = false;
			},
			confirm(){
				this.$emit('confirm');
				this.showPop = false;
			},
			close(){
				this.showPop = false;
			},
			open(){
				this.showPop = true;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.modal-box {
		background-color: transparent;
		border-radius: 21px;
		color: #092C4C;
		width: 314px;
		height: 382px;
		background: url('/static/images/common/confirm-bg.png') no-repeat;
		background-size: cover;
		padding-top: 211px;
		.creat-info {
			width: 100%;
			.modal-content{
				width: 100%;
				font-size: 20px;
				text-align: center;
				padding-bottom: 72px;
				border-bottom: 1px solid rgba(9,44,76,0.05);;
			}
			.modal-btn-box{
				width: 100%;
				padding: 15px 20px;
				.btn-item{
					width: 132px;
					height: 42px;
					line-height: 42px;
					text-align: center;
					border-radius: 12px;
					font-size: 16px;
				}
				.cancel-btn{
					background-color: rgba(23,117,221,0);
					color: #808080;
				}
				.confirm-btn{
					background: #1775DD;
					color: #fff;
				}
			}
		}
	}
</style>