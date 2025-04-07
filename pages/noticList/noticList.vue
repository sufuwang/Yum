<template>
	<view class="content">
		<back-header :title="$t('navtitle.txt1')"></back-header>
		<view class="list" v-if="noticList.length>0">
			<view class="list-item u-flex u-row-between" @click="goDetail(item)" v-for="(item,index) in noticList" :key="index">
				<view class="un-read" v-if="item.status==0"></view>
				<view class="notic-info">
					<view class="desc">
						{{item.content}}
					</view>
					<view class="u-flex px-m-t-30">
						<view class="time u-flex px-m-r-30">
							<image src="/static/images/common/time.png" mode=""></image>
							<text>{{item.create_time}}</text>
						</view>
						<view class="time u-flex">
							<image src="/static/images/common/author.png" mode=""></image>
							<text>ADMIN</text>
						</view>
					</view>
				</view>
			</view>
			<u-loadmore :status="loadStatus" :load-text="loadText" />
		</view>
		<view class="px-m-t-100" v-else>
			<u-empty :text="$t('common.empty')" src="/static/images/common/empty.png" icon-size="600rpx"></u-empty>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				noticList:[],
				/* 分页相关 */
				totalPage: "", //数据总页数
				pageNum: 1,
				loadStatus: 'loadmore',
				loadText: {
					loadmore: this.$t('loadmore.tip1'),
					loading: this.$t('loadmore.tip2'),
					nomore: this.$t('loadmore.tip3'),
				}
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
			this.getNoticList()
		},
		methods: {
			/* 重置分页数据 */
			resetPage() {
				this.pageNum = 1;
				this.loadStatus = 'loadmore';
				this.noticList = [];
				this.getNoticList()
			},
			goDetail(msg) {
				this.$u.route('/pages/noticDetail/noticDetail', {msg:encodeURIComponent(JSON.stringify(msg))})
			},
			getNoticList() {
				let time=Date.parse(new Date())/1000;
				let nowTime=this.$u.timeFormat(time, 'yyyy/mm/dd hh:MM:ss');
				this.$u.api.msgList({
					page: this.pageNum,
					web_time: nowTime,
				}).then(res => {
					// console.log(res)
					this.noticList = this.noticList.concat(res.data);
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
	.content {
		color: #fff;
		padding: 15px;
		
		.read-all{
			font-size: 12px;
			color: #CED0DE;
		}
		.num-tips {
			text-align: center;
			margin-bottom: 5px;
			color: #999;
			font-size: 16px;
		}

		.list {
			.list-item {
				padding: 20px 15px;
				background: #FFFFFF;
				box-shadow: 0rpx 0rpx 24rpx 0rpx rgba(9,44,76,0.1);
				border-radius: 24rpx;
				margin-bottom: 18px;
				position: relative;
				.un-read{
					position: absolute;
					right: 9px;
					top: 9px;
					width:6px;
					height: 6px;
					background: #FF7957;
					border-radius: 50%;
				}
				.notic-info {
					// width: 75%;
					
					.desc {
						font-size: 16px;
						color: #092C4C;
						text-overflow: -o-ellipsis-lastline;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						line-clamp: 2;
						-webkit-box-orient: vertical;
						
					}

					.time {
						font-size: 12px;
						color: #ABB3BB;
						image{
							width: 12px;
							height: 12px;
							margin-right: 7px;
						}
					}
				}

				.icon-r {
					margin-right: 3%;
				}
			}
		}
	}
</style>
