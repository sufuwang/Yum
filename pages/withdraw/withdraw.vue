<template>
	<view class="content">
		<back-header :title="$t('navtitle.txt7')"></back-header>
		<view class="box1">
			<view class="balance">
				<view class="px-font-14">{{$t('withdraw.txt3')}}</view>
				<view class="px-font-18 px-m-t-10 balance-num">{{userInfo.balance}} SGD</view>
				<!-- <view class="tips px-m-t-40 px-font-13">
					*{{$t('withdraw.txt4')}}
				</view> -->
			</view>
		</view>
		<view class="top-switch u-flex">
			<view class="tab-item" :class="{'active':tabIndex==0}" @click="setTab(0)">{{$t('withdraw.txt1')}}</view>
			<view class="tab-item" :class="{'active':tabIndex==1}" @click="setTab(1)">{{$t('withdraw.txt2')}}</view>
		</view>
		<view v-if="tabIndex==0">
			<view class="box2">
				<view class="form-box">
					<view class="form-item">
						<view class="input-label">{{$t('withdraw.txt6')}}</view>
						<view class="px-font-14 input-item px-m-b-28">
							<u-input type="text" height="88" v-model="amount" :placeholder="$t('withdraw.txt6')" />
						</view>
					</view>
					<view class="form-item">
						<view class="input-label">{{$t('withdraw.txt7')}}</view>
						<view class="px-font-14 input-item px-m-b-28">
							<u-input type="password" height="88" v-model="payPsd" :placeholder="$t('withdraw.txt7')" />
						</view>
					</view>
				</view>
				<view class="recharge u-flex u-row-center">
					<view class="button" @click="subHandle">
						{{$t('withdraw.txt8')}}
					</view>
				</view>
			</view>
		</view>
		<view class="lists" v-else>
			<view v-if="applyList.length>0">
				<view class="list-item u-flex u-row-between" v-for="(item,index) in applyList" :key="index">
					<view class="u-flex" style="width: 100%;">
						<image class="icon" src="/static/images/common/ok.png" mode="" v-if="item.status==2"></image>
						<image class="icon" src="/static/images/common/reject.png" mode="" v-if="item.status==3"></image>
						<image class="icon" src="/static/images/common/looking.png" mode="" v-if="item.status==1"></image>
						<view class="u-flex-1">
							<view class="u-flex u-row-between" style="width: 100%;flex: 1;">
								<view class="u-flex">
									<view class="money u-m-r-10">{{item.price}}</view>
									<text class="status status_1" :class="{'status_2':item.status==3}">{{ statusTxt[item.status - 1] }}</text>
								</view>
								<view class="create_time">{{item.create_time}}</view>
							</view>
							<view class="px-font-12 px-m-t-8" v-if="item.remark">
								{{$t('withdraw.txt9')}}{{item.remark}}
							</view>
						</view>
					</view>
					
				</view>
				<u-loadmore :status="loadStatus" :load-text="loadText" />
			</view>
			<view v-else>
				<u-empty :text="$t('common.empty')" src="/static/images/common/empty.png" icon-size="600rpx"></u-empty>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabIndex: 0,
				userInfo:{},
				/* 记录列表 */
				applyList:[],
				/* 提交数据 */
				amount:"",
				payPsd:"",
				/* 分页相关 */
				totalPage: "", //数据总页数
				pageNum: 1,
				loadStatus: 'loadmore',
				loadText: {
					loadmore: this.$t('loadmore.tip1'),
					loading: this.$t('loadmore.tip2'),
					// nomore: this.$t('loadmore.tip3'),
				},
				/* 审核中-成功-失败 */
				statusTxt:[this.$t('withdraw.status1'),this.$t('withdraw.status2'),this.$t('withdraw.status3')]
			};
		},
		onShow() {
			this.getUser()
		},
		onReachBottom() {
			if(this.tabIndex == 0) return;
			if (this.pageNum >= this.totalPage) return;
			this.loadStatus = 'loading';
			this.pageNum = ++this.pageNum;
			this.getApplyList()
		},
		methods: {
			/* 重置获取记录 */
			resetList(){
				this.pageNum = 1;
				this.applyList = [];
				this.getApplyList()
			},
			/* 获取申请记录 */
			getApplyList() {
				let time=Date.parse(new Date())/1000;
				let nowTime=this.$u.timeFormat(time, 'yyyy/mm/dd hh:MM:ss');
				this.$u.api.applyLogs({
					page: this.pageNum,
					web_time: nowTime,
				}).then(res => {
					// console.log(res)
					this.applyList = this.applyList.concat(res.data);
					this.totalPage = res.last_page;
					if (this.pageNum >= this.totalPage) {
						this.loadStatus = 'nomore';
					} else {
						this.loadStatus = 'loading';
					}
				})
			},
			setTab(i) {
				if (this.tabIndex == i) return;
				this.tabIndex = i;
				if(this.tabIndex == 1){
					this.resetList()
				}
			},
			/* 获取用户信息 */
			getUser(){
				this.$u.api.userInfo().then(res => {
					this.userInfo = res.data;
				})
			},
			subHandle(){
				if(this.userInfo.bind_card == 0){
					this.showHandle()
				}else{
					this.confirm()
				}
			},
			/* 二次确认 */
			confirm(){
				let pass = this.judge();
				if(!pass) return;
				const that = this;
				uni.showModal({
					title: that.vuex_config.app_name,
					content: that.$t('withdraw.txt10'),
					confirmText:that.$t('common.confirm'),
					confirmColor:'#1775DD',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
							that.subApply()
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			/* 提交申请 */
			subApply(){
				let time=Date.parse(new Date())/1000;
				let nowTime=this.$u.timeFormat(time, 'yyyy/mm/dd hh:MM:ss');
				let params = {
					web_time: nowTime,
					price:this.amount,
					pass:this.payPsd
				}
				this.$u.api.apply(params).then(res=>{
					console.log(res)
					this.amount = '';
					this.payPsd = '';
					this.$u.toast(res.msg);
					setTimeout(()=>{
						this.getUser();
					},1500)
				})
			},
			judge(){
				if(this.amount == ''){
					uni.showToast({
						title: this.$t('withdraw.tip1'),
						image:"/static/images/common/reject.png",
						icon:"none",
						duration: 2000
					});
					return false
				}
				if(this.payPsd == ''){
					uni.showToast({
						title: this.$t('password.tip1'),
						image:"/static/images/common/reject.png",
						icon:"none",
						duration: 2000
					});
					return false
				}
				return true
			},
			/* 跳转设置卡信息 */
			showHandle(){
				const that = this;
				uni.showModal({
					title: that.vuex_config.app_name,
					content: that.$t('withdraw.txt11'),
					confirmText: that.$t('withdraw.txt12'),
					confirmColor:'#1775DD',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
							that.$u.route('/pages/bindAccount/bindAccount')
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
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
		padding: 0px 30rpx;
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
				.tips{
					color: #BBBFF4;
				}
			}
		}
		.box2{
			background: #F2F6F7;
			padding: 30px 20px;
			border-radius: 12px;
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
				margin-top: 30px;
				margin-bottom: 10px;
				.button{
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
		.lists{
			.list-item{
				background: #fff;
				color: #808080;
				box-shadow: 0rpx 0rpx 20rpx 0rpx rgba(91,147,212,0.1);
				padding: 10px;
				border-radius: 12px;
				margin-bottom: 10px;
				.icon{
					display: block;
					width: 40px;
					height: 40px;
					border-radius: 12px;
					margin-right: 16px;
				}
				.title{
					font-size: 14px;
					font-weight: 600;
				}
				.status{
					font-size: 14px;
				}
				.status_1{
					color:#1775DD;
				}
				.status_2{
					color:#43CF7C;
				}
				.status_3{
				    color:#FF7957;
				}
				.create_time{
					font-size: 12px;
					color: #808080;
				}
				.money{
					font-size: 14px;
					color: #092C4C;
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
	::v-deep.u-btn--bold-border {
		border: none;
	}
	
	::v-deep.u-input__input {
		color: #092C4C;
	}
</style>
