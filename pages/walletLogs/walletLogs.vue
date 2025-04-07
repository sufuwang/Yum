<template>
	<view class="content">
		<back-header :title="$t('navtitle.txt9')"></back-header>
		<view class="balance-box">
			<view class="px-font-14">{{$t('withdraw.txt3')}}</view>
			<view class="px-font-18 px-m-t-10 balance-num">{{balance}} SGD</view>
		</view>
		<view class="lists px-p-30" v-if="logs.length>0">
			<view class="list-item" v-for="(item,index) in logs" :key="index">
				<image class="icon" src="/static/images/common/income.png" mode="" v-if="item.status == 1"></image>
				<image class="icon" src="/static/images/common/out.png" mode="" v-if="item.status == 2"></image>
				<view class="info u-flex u-row-between u-col-top">
					<view class="title">
						<!-- [{{ statusTxt[item.type - 1] }}]{{item.explain}} -->
						{{item.title}}
					</view>
					<view class="txt-right">
						<text class="money red" v-if="item.status == 2">{{item.price}}</text>
						<text class="money green" v-if="item.status == 1">+{{item.price}}</text>
						<view class="create_time">{{item.create_time}}</view>
					</view>
				</view>
			</view>
			<u-loadmore :status="loadStatus" :load-text="loadText" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				/* 余额 */
				balance:0,
				logs:[],
				/* 分页相关 */
				totalPage: "", //数据总页数
				pageNum: 1,
				loadStatus: 'loadmore',
				loadText: {
					loadmore: this.$t('loadmore.tip1'),
					loading: this.$t('loadmore.tip2'),
					nomore: this.$t('loadmore.tip3'),
				},
				statusTxt:[this.$t('wdlogs.txt1'),this.$t('wdlogs.txt2'),this.$t('wdlogs.txt3'),this.$t('wdlogs.txt4'),this.$t('wdlogs.txt5'),this.$t('wdlogs.txt6'),this.$t('wdlogs.txt7'),this.$t('wdlogs.txt8')]
			};
		},
		onShow() {
			this.resetPage()
		},
		onPullDownRefresh() {
			this.resetPage();
			uni.stopPullDownRefresh()
		},
		onReachBottom() {
			if (this.pageNum >= this.totalPage) return;
			this.loadStatus = 'loading';
			this.pageNum = ++this.pageNum;
			this.getLogs()
		},
		methods:{
			/* 重置分页数据 */
			async resetPage() {
				this.pageNum = 1;
				this.loadStatus = 'loadmore';
				this.logs = [];
				let userRes = await this.$u.api.userInfo();
				this.balance = userRes.data.balance;
				this.getLogs()
			},
			getLogs(){
				let time=Date.parse(new Date())/1000;
				let nowTime=this.$u.timeFormat(time, 'yyyy/mm/dd hh:MM:ss');
				this.$u.api.walletLogs({
					page: this.pageNum,
					web_time: nowTime,
				}).then(res => {
					// console.log(res)
					this.logs = this.logs.concat(res.data);
					this.totalPage = res.last_page;
					if (this.pageNum >= this.totalPage) {
						this.loadStatus = 'nomore';
					} else {
						this.loadStatus = 'loading';
					}
				})
			}
		}
	}
</script>
<style>
	@import url("@/static/common/css/bg.css");
</style>
<style lang="scss" scoped>
	.lists{
		.list-item{
			border-radius: 12px;
			background: #fff;
			box-shadow: 0rpx 0rpx 20rpx 0rpx rgba(91,147,212,0.1);
			color: #092C4C;
			padding: 10px;
			display: flex;
			justify-content: flex-start;
			flex-wrap: nowrap;
			align-items: center;
			margin-bottom: 10px;
			.info{
				flex: 1;
			}
			.icon{
				width: 40px;
				height: 40px;
				border-radius: 12px;
				margin-right: 16px;
			}
			.title{
				font-size: 14px;
			}
			.txt-right{
				text-align: right;
			}
			.create_time{
				font-size: 12px;
				color: #808080;
				margin-top: 2px;
				// text-wrap: nowrap;
			}
			.money{
				font-size: 14px;
				font-weight: 600;
			}
			.red{
				color: #FF7957;
			}
			.green{
				color: #43CF7C;
			}
		}
	}
	.balance-box{
		background: url('/static/images/common/balance-bg.png') no-repeat;
		background-size: cover;
		border-radius: 24rpx;
		height: 220rpx;
		padding: 52rpx 48rpx;
		color: #98C3F5;
		margin: 70rpx 30rpx 30rpx;
		.balance-num{
			color: #fff;
		}
		.tips{
			color: #BBBFF4;
		}
	}
</style>
