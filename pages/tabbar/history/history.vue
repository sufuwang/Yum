<template>
	<l-base
		defaultBg="#798DA3"
		:logo="vuex_config.app_logo"
		:activeIndex="2"
		:scrollDis="scrollDis"
	>
		<view class="content">
			<!-- 分类tab -->
			<view class="tab-box u-flex u-row-between">
				<view
					class="tab-item"
					:class="{ active: selIndex == index }"
					v-for="(item, index) in tabList"
					:key="index"
					@click="typeChange(index)"
				>
					{{ item.txt }}
				</view>
			</view>
			<!-- 记录列表 -->
			<view class="list">
				<view v-if="orderList.length > 0">
					<view
						class="list-item"
						v-for="(item, index) in orderList"
						:key="index"
					>
						<view class="u-flex u-row-between bottom-info">
							<view class="time">
								{{ item.create_time }}
							</view>
							<view class="u-flex">
								<text class="status status_0" v-if="item.status == 1">{{
									$t("history.txt1")
								}}</text>
								<text class="status status_1" v-if="item.status == 2">{{
									$t("history.txt2")
								}}</text>
							</view>
						</view>
						<view class="info u-flex u-row-between">
							<view class="goods">
								<image class="logo" :src="item.goods_img" mode=""></image>
								<view class="title">{{ item.goods_name }}</view>
							</view>
							<view class="u-text-right px-font-14">
								<view>SGD{{ item.price }}</view>
								<view class="profit">SGD{{ item.commission }}</view>
							</view>
						</view>
						<u-button
							v-if="item.status == 1"
							hover-class="none"
							:disabled="showLoading"
							:hair-line="false"
							:loading="showLoading"
							class="btn"
							@click="subOrder(item.id)"
							>{{ $t("history.txt3") }}</u-button
						>
					</view>
					<u-loadmore :status="loadStatus" :load-text="loadText" />
				</view>
				<view class="px-m-t-100" v-else>
					<u-empty
						:text="$t('common.empty')"
						src="/static/images/common/empty.png"
						icon-size="518"
					></u-empty>
				</view>
			</view>
			<!-- 自定义loading -->
			<view class="cus-loading" v-if="showLoading">
				<image src="/static/images/common/loading.svg" mode=""></image>
			</view>
			<!-- modal -->
			<h-modal
				ref="HModal"
				:tipsContent="$t('history.txt6')"
				:logo="vuex_config.app_logo"
				@confirm="submissionHandle"
			></h-modal>
		</view>
	</l-base>
</template>

<script>
import lBase from "@/layout/l-base";

export default {
	components: {
		lBase,
	},
	data() {
		return {
			showLoading: false,
			selIndex: 0,
			tabList: [
				{
					val: "",
					txt: this.$t("history.txt7"),
				},
				{
					val: "2",
					txt: this.$t("history.txt1"),
				},
				{
					val: "1",
					txt: this.$t("history.txt2"),
				},
			],
			/* 分页相关 */
			totalPage: "", //数据总页数
			pageNum: 1,
			loadStatus: "loadmore",
			loadText: {
				loadmore: this.$t("loadmore.tip1"),
				loading: this.$t("loadmore.tip2"),
				nomore: this.$t("loadmore.tip3"),
			},
			/* 订单列表 */
			orderList: [],
			/* 提交订单ID */
			subOrderId: "",
		};
	},
	onShow() {
		this.resetPage();
	},
	onPullDownRefresh() {
		this.resetPage();
		uni.stopPullDownRefresh();
	},
	onReachBottom() {
		if (this.pageNum >= this.totalPage) return;
		this.loadStatus = "loading";
		this.pageNum = ++this.pageNum;
		this.getLogs();
	},
	methods: {
		getLogs() {
			let status;
			if (this.selIndex == 0) {
				status = "";
			} else if (this.selIndex == 1) {
				status = "1";
			} else {
				status = "2";
			}

			let time = Date.parse(new Date()) / 1000;
			let nowTime = this.$u.timeFormat(time, "yyyy/mm/dd hh:MM:ss");
			this.$u.api
				.orderList({
					page: this.pageNum,
					web_time: nowTime,
					status,
				})
				.then((res) => {
					// console.log(res)
					this.orderList = this.orderList.concat(res.data);
					this.totalPage = res.last_page;
					if (this.pageNum >= this.totalPage) {
						this.loadStatus = "nomore";
					} else {
						this.loadStatus = "loading";
					}
				});
		},
		/* 重置分页数据 */
		resetPage() {
			this.pageNum = 1;
			this.loadStatus = "loadmore";
			this.orderList = [];
			this.getLogs();
		},
		typeChange(i) {
			if (this.selIndex == i) return;
			this.selIndex = i;
			this.resetPage();
		},
		subOrder(id) {
			this.subOrderId = id;
			// this.$refs.HModal.open();
			const that = this;
			uni.showModal({
				title: that.vuex_config.app_name,
				content: that.$t("history.txt6"),
				confirmText: that.$t("common.confirm"),
				confirmColor: "#86FC7C",
				success: function (res) {
					if (res.confirm) {
						console.log("用户点击确定");
						that.submissionHandle();
					} else if (res.cancel) {
						console.log("用户点击取消");
					}
				},
			});
		},
		/* 提交订单 */
		submissionHandle() {
			this.showLoading = true;
			let params = {
				order_id: this.subOrderId,
			};
			this.$u.api
				.subOrder(params)
				.then((res) => {
					// console.log(res)
					this.$u.toast(res.msg);
					this.showLoading = false;
					this.resetPage();
				})
				.catch((err) => {
					this.showLoading = false;
				});
		},
	},
};
</script>
<style>
@import url("@/static/common/css/bg.css");
</style>
<style lang="scss" scoped>
.content {
	// color: #fff;
}
.tab-box {
	width: 100%;
	color: #acacac;
	padding-top: 20rpx;

	.tab-item {
		width: 33.333%;
		text-align: center;
		font-size: 30rpx;
		padding-bottom: 18rpx;
		&.active {
			color: #1775dd;
			position: relative;
			&::after {
				content: "";
				position: absolute;
				bottom: 0;
				right: calc(50% - 20rpx);
				width: 40rpx;
				height: 4rpx;
				background: #1775dd;
			}
		}
	}
}

.list {
	padding: 40rpx 30rpx;

	.list-item {
		margin-bottom: 40rpx;
		background: #ffffff;
		box-shadow: 0rpx 0rpx 24rpx 0rpx rgba(9, 44, 76, 0.1);
		border-radius: 30rpx;
		padding: 0rpx 34rpx 30rpx;
		.info {
			padding: 28rpx 0 0;
			.goods {
				font-size: 28rpx;
				display: flex;
				justify-content: flex-start;
				align-items: center;

				.logo {
					width: 84rpx;
					height: 84rpx;
					border-radius: 50%;
					margin-right: 30rpx;
				}

				.title {
					color: #808080;
					width: 300rpx;
					overflow: hidden;
					-webkit-line-clamp: 1;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
				}
			}
			.profit {
				font-weight: 500;
				color: #1775dd;
				margin-top: 2rpx;
			}
		}
		.bottom-info {
			height: 80rpx;
			font-size: 28rpx;
			border-bottom: 1px solid #e5e5e5;
		}
		.time {
			color: #092c4c;
		}

		.status {
			padding: 8rpx 26rpx;
			border-radius: 8rpx;
		}

		.status_0 {
			color: #1775dd;
			background: #f2f8ff;
		}

		.status_1 {
			color: #01bfa3;
			background: #ebfaf8;
		}

		.status_2 {
			color: #ff7957;
			background: #ffefeb;
		}

		.btn {
			margin-top: 28rpx;
			background: #1775dd;
			color: #fff;
			font-size: 32rpx;
			height: 100rpx;
			border: none;
			border-radius: 24rpx;
		}
	}
}
.cus-loading {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	color: #fff;
	background: rgba(0, 0, 0, 0.4);
	left: 0;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 99999;
}
</style>
