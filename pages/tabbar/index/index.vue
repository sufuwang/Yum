<template>
	<view class="content u-flex-col u-col-center">
		<!-- 自定义头部 -->
		<h-header :logo="homeData.config && homeData.config.app_logo" :scrollTop="scrollDis"></h-header>
		<!-- 用户信息 -->
		<view class="width-688 user-info u-flex u-row-between" @click="lookUser">
			<view class="u-flex">
				<image class="avatar" src="/static/images/common/headimg.jpg" mode=""></image>
				<view class="u-m-l-36">
					<view class="u-flex u-font-40">
						<view>{{userInfo.username}}</view>
						<image class="user-level-icon u-m-l-36" :src="userInfo.level && userInfo.level.img" mode=""></image>
					</view>
					<view class="u-font-32 u-m-t-10">Balance：{{userInfo.balance}} SGD</view>
				</view>
			</view>
			<u-icon name="arrow-right" color="#FFFFFF" size="28"></u-icon>
		</view>
		<!-- 新闻 -->
		<view class="width-688 news-box">
			<view class="u-flex u-row-between">
				<view class="gradual-color">
					{{$t('home.txt15')}}
				</view>
				<view class="px-font-14 more-color" @click="goNewsList">
					<text class="px-m-r-10">{{$t('home.txt12')}}</text>
				</view>
			</view>
			<view class="news-grid u-flex u-row-between" v-if="newsBannerList.length>0">
				<view class="img-box" @click="jumpDetail(newsBannerList[0].id)">
					<image class="big-img" :src="newsBannerList[0].img" mode="aspectFill" :style="{width:newsBannerList.length<3?'width-688':'454rpx'}"></image>
					<view class="pos-desc px-p-l-30 px-p-b-20">
						<view class="px-font-16 text-line1">{{newsBannerList[0].title}}</view>
						<view class="px-font-12">{{newsBannerList[0].author}}</view>
					</view>
				</view>
				<view class="small-img u-flex-col u-row-between" v-if="newsBannerList.length>2">
					<view class="img-box" @click="jumpDetail(newsBannerList[1].id)">
						<image :src="newsBannerList[1].img" mode="aspectFill"></image>
						<view class="pos-desc px-p-l-18 px-p-b-10">
							<view class="px-font-12 text-line1">{{newsBannerList[1].title}}</view>
						</view>
					</view>
					<view class="img-box" @click="jumpDetail(newsBannerList[2].id)">
						<image :src="newsBannerList[2].img" mode="aspectFill"></image>
						<view class="pos-desc px-p-l-18 px-p-b-10">
							<view class="px-font-12 text-line1">{{newsBannerList[2].title}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 功能区 -->
		<view class="width-688 flot-box u-flex u-flex-wrap u-row-between">
			<view class="flot-item u-flex" v-for="(item,index) in navList" :key="index" @click="jumpMenu(index)">
				<image :src="'/static/images/home/home-icon'+(index+1)+'.png'" mode="heightFix"></image>
				<view class="flot-name"><view>{{item.text}}</view></view>
			</view>
		</view>
		
		<!-- 等级 -->
		<view class="width-688 px-m-t-42 flex-self-center level-box">
			<view class="u-flex u-row-between">
				<view class="gradual-color">
					{{$t('home.txt11')}}
				</view>
				<view class="px-font-14 more-color" @click="goLevelDesc">
					<text class="px-m-r-10">{{$t('home.txt12')}}</text>
				</view>
			</view>
			<view class="u-flex px-m-t-30 level-switch">
				<view v-for="(item,index) in homeData.vip_list" :key="index">
					<view class="vip-title" :class="{'border-main-color':currentIndex == index}" @click="switchLev(index)">
						<text>VIP{{(index+1)}}</text>
					</view>
				</view>
			</view>
			<view class="px-m-t-30 level-content u-flex u-col-top">
				<image class="lev-img" :src="currentLev.img" mode=""></image>
				<view class="px-m-l-20 px-m-t-10 px-font-12 u-flex-1">
					<view class="title px-font-16">
						{{currentLev.name}}
					</view>
					<rich-text :nodes="currentLev.node"></rich-text>
				</view>
			</view>
		</view>
		<!-- 合作伙伴 -->
		<view class="scroll-img u-m-t-60 partner scroll-horizontal">
			<view class="partner-title">
				{{$t('home.txt13')}}
			</view>
			<scroll-view scroll-x="true" style="height: 180rpx;">
				<view class="u-flex">
					<view class="scroll-item u-flex" v-for="(item,index) in 14" :key="index">
						<image :src="'/static/images/partner/com-'+index+'.png?'+Math.random()" mode="widthFix"></image>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 内容弹窗 -->
		<u-popup mode="center" border-radius="12" v-model="showContentPop">
			<view class="pop-warp">
				<image class="poa-icon" src="/static/images/home/faq-icon.png" mode="" v-if="currentClick==5 || currentClick==6"></image>
				<image class="poa-icon" src="/static/images/home/faq-icon.png" mode="" v-if="currentClick==4 || currentClick==7"></image>
				<view class="pop-box">
					<view class="pop-type px-font-18">{{typTitle}}</view>
					<scroll-view class="height-306 scroll-con" scroll-y="true">
						<u-parse :html="popRichtxt"></u-parse>
					</scroll-view>
				</view>
				<view class="close-warp" @click="closeHandle">
					{{$t('home.txt14')}}
				</view>
			</view>
		</u-popup>
		<!-- 自定义弹窗 -->
		<view class="mask-pop" v-if="showPop">
			<view class="pop-cont" @click="laterPage">
				<image class="img" :src="homeData.config && homeData.config.pop" mode=""></image>
				<image class="close" src="/static/images/home/close_green.png" mode="" @click.stop="closePop"></image>
			</view>
		</view>
		<!-- 自定义tabbar -->
		<h-tabbar :activeIndex="0"></h-tabbar>
	</view>
</template>

<script>
	import hTabbar from "@/components/h-tabbar/h-tabbar";
	import hHeader from "@/components/h-header/h-header";
	export default {
		components: {
			hTabbar,
			hHeader
		},
		data() {
			return {
				/* 自定义弹窗展示标识 */
				showPop: false,
				mesList: [],
				nodes: "",
				navList: [{
					text: this.$t('home.txt3')
				}, {
					text: this.$t('home.txt5')
				}, {
					text: this.$t('home.txt6')
				}, {
					text: this.$t('home.txt4')
				}, {
					text: this.$t('home.txt8')
				}, {
					text: this.$t('home.txt10')
				}, {
					text: this.$t('home.txt7')
				}, {
					text: this.$t('home.txt9')
				}],
				/* 富文本弹窗相关 */
				showContentPop: false,
				popRichtxt: "",
				typTitle: "",
				/* 用户信息 */
				userInfo: {},
				/* 首页数据 */
				homeData: {},
				currentLev: {},
				currentIndex: null,
				/* 滚动距离 */
				scrollDis:0,
				/* 当前点击项 */
				currentClick:null,
				/* 新闻 */
				newsBannerList:[]
			}
		},
		onShow() {
			this.getHome();
		},
		onHide() {
			this.$u.vuex('vuex_index_pop', false);
		},
		onPageScroll(e) {
			this.scrollDis = e.scrollTop;
		},
		methods: {
			jumpDetail(id){
				this.$u.route('/pages/newsDetail/newsDetail',{id})
			},
			closeHandle(){
				this.showContentPop = false;
			},
			goNotic() {
				this.$u.route('/pages/noticList/noticList')
			},
			laterPage() {
				let lates;
				lates = encodeURIComponent(JSON.stringify(this.homeData.config.event_list))
				this.$u.route('/pages/richText/lates', {
					lates
				})
			},
			switchLev(i) {
				this.currentIndex = i;
				this.homeData.vip_list.map((item, index) => {
					if (index == i) {
						this.currentLev = item
					}
				})
			},

			/* 获取首页数据 */
			async getHome() {
				let time=Date.parse(new Date())/1000;
				let nowTime=this.$u.timeFormat(time, 'yyyy/mm/dd hh:MM:ss');
				let user = await this.$u.api.userInfo();
				let news = await this.$u.api.newsList({web_time:nowTime});
				this.newsBannerList = news.data;
				this.userInfo = user.data;
				this.$u.api.homeData().then(res => {
					let configObj = {
						app_name: res.data.config.app_name,
						operation_time: res.data.config.operation_time,
						withdraw_time: res.data.config.operation_time,
						app_logo: res.data.config.app_logo
					}
					this.$u.vuex('vuex_config', configObj);
					this.mesList = [res.data.config.tips]

					let levList = res.data.vip_list;
					
					levList.map((item, index) => {
						let str1 = `<p style='line-height: 24px;'>・Profit of ${item.order_rate_txt} per application<br>
							・Receive a set of ${item.order_num} apps data tasks<br>
							・Activate with an  ${item.ring}SGD </p>`;
						let str2 = `<p style='line-height: 24px;'>・Lợi nhuận ${item.order_rate_txt} trên mỗi giao dịch<br>
							・Có tối đa ${item.order_num} ứng dụng trên mỗi bộ cải tiến dữ liệu<br>
							・Tối đa ${item.ring} bộ nhiệm vụ cải tiến mỗi ngày</p>`;
						let str3 = `<p style='line-height: 24px;'>・每筆交易 ${item.order_rate_txt} 利潤<br>
							・每組數據改進最多 ${item.order_num} 個應用<br>
							・重置激活円$ ${item.ring} </p>`;
						let str4 = `<p style='line-height: 24px;'>アプリケーションの最適化。アプリごとに ${item.order_rate_txt} 利益,${item.order_num} のアプリケーションの任務データのセットを取得します.${item.ring} 円をリセットアクティベーションします.</p>`;
						if (this.vuex_lang == 'en') {
							item.node = str1;
						} else if (this.vuex_lang == 'vi-VN') {
							item.node = str2;
						} else if (this.vuex_lang == 'japan') {
							item.node = str4;
						} else {
							item.node = str3
						}
						if (this.userInfo.level_id == item.id) {
							this.currentLev = item;
							this.currentIndex = index;
						}
					})
					res.data.vip_list = levList;
					this.homeData = res.data;
					if (this.vuex_index_pop) {
						this.showPop = true;
					}
				})
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
			goLevelDesc() {
				this.$u.route('/pages/levelList/levelList')
			},
			goNewsList() {
				this.$u.route('/pages/newsList/newsList')
			},
			lookUser(){
				this.$u.route('/pages/userPages/userInfo/userInfo')
			},
			closePop() {
				this.showPop = false;
			},
			jumpMenu(i) {
				if (i == 0) {
					this.$u.route({
						type: 'navigateTo',
						url: '/pages/tabbar/begin/begin',
					})
				}
				if (i == 1) {
					this.$u.route('/pages/withdraw/withdraw')
				}
				if (i == 2) {
					this.$u.route('/pages/deposit/deposit')
				}
				if (i == 3) {
					let cert;
					cert = encodeURIComponent(JSON.stringify(this.homeData.config.cert_list))
					this.$u.route('/pages/richText/richText', {
						cert
					})
				}
				
				if (i >= 4) {
					this.typTitle = this.navList[i].text;
					this.currentClick = i;
					if (i == 4) {
						let str = "",
							imgList = [];
						imgList = this.homeData.config.event_list;
						imgList.map(item => {
							str += `<img src="${item}" style="max-width:100%;border:0">`
						})
						this.popRichtxt = str;
					}
					if (i == 5) {
						this.popRichtxt = this.homeData.config.about_us;
					}
					if (i == 6) {
						this.popRichtxt = this.homeData.config.rule;
					}
					if (i == 7) {
						this.popRichtxt = this.homeData.config.intro;
					}
					
					this.showContentPop = true;
				}
			}
		}
	}
</script>
<style>
	@import url("@/static/common/css/bg.css");
</style>
<style lang="scss" scoped>
	.content {
		background-image: url('/static/images/home/title-bg.png');
		background-size: 100% 802rpx;
		background-repeat: no-repeat;
		background-position: left top;
		.user-info{
			margin-top: 60rpx;
			color: #FFFFFF;
			.avatar {
				width: 106rpx;
				height: 106rpx;
				border-radius: 50%;
				border: 2px solid #fff;
			}
			.user-level-icon{
				width: 50rpx;
				height: 50rpx;
			}
		}
		.news-box{
			margin-top: 90rpx;
			.gradual-color{
				font-size: 32rpx;
				font-weight: 500;
				color: #092C4C;
			}
			
			.more-color{
				color: #FF7957;
			}
			
			.news-grid{
				margin-top: 22rpx;
				.img-box{
					position: relative;
				}
				.pos-desc{
					position: absolute;
					left: 0;
					bottom: 0;
					color: #FFFFFF;
					.text-line1{
						text-overflow: -o-ellipsis-lastline;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						line-clamp: 1;
						-webkit-box-orient: vertical;
					}
				}
				.big-img{
					width: 344px;
					height: 436rpx;
					border-radius: 24rpx;
				}
				.small-img{
					height: 436rpx;
					image{
						display: block;
						width: 204rpx;
						height: 204rpx;
						border-radius: 24rpx;
					}
				}
			}
		}
		.flot-box{
			margin-top: 66rpx;
			.flot-item{
				padding: 0 38rpx;
				width: 328rpx;
				height: 132rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 0rpx 20rpx 0rpx rgba(91,147,212,0.1);
				border-radius: 24rpx;
				margin-bottom: 20rpx;
				image{
					width: 70rpx;
					height: 60rpx;
					margin-right: 40rpx;
				}
				.flot-name{
					color: #092C4C;
					font-size: 28rpx;
				}
			}
		}
		.scroll-img{
			width: 688rpx;
			.scroll-item{
				position: relative;
				margin-left: 34rpx;
				width: 468rpx;
				background-color: #FFFFFF;
				&:first-child{
					margin-left: 0;
				}
				.pos-desc{
					position: absolute;
					left: 0;
					bottom: 0;
					color: #FFFFFF;
				}
				image{
					width: 468rpx;
					height: 360rpx;
					border-radius: 24rpx;
				}
				&:last-child{
					padding-right: 34rpx;
				}
			}
			&.partner{
				.partner-title{
					font-size: 32rpx;
					font-weight: 500;
					color: #092C4C;
					margin-left: 34rpx;
					margin-bottom: 30rpx;
				}
				.scroll-item{
					height: 160rpx;
					margin-left: 28rpx;
					box-shadow: 0rpx 0rpx 24rpx 0rpx rgba(9,44,76,0.1);
					border-radius: 24rpx;
					&:first-child{
						margin-left: 0;
					}
					image{
						width: 332rpx;
						height: 160rpx;
						border-radius: 24rpx;
					}
				}
			}
		}
	}

	.mes-icon {
		width: 20px;
		height: 20px;
	}

	.welcome {
		position: relative;

		.level-icon {
			width: 26px;
			height: 26px;
		}

		.server {
			position: absolute;
			top: 15px;
			right: 25px;
		}
	}

	.level-box {
		color: #383838;
		
		.gradual-color{
			font-size: 32rpx;
			font-weight: 500;
			color: #092C4C;
		}
		
		.more-color{
			color: #FF7957;
		}
		
		.level-switch {
			.vip-title{
				width: 120rpx;
				height: 44rpx;
				border-radius: 42rpx;
				text-align: center;
				line-height: 44rpx;
				font-size: 22rpx;
				margin-right: 30rpx;
			}
			.border-main-color {
				color: #FF7957;
				border: 2rpx solid #FF7957;
				background: rgba(255,175,26,0.1);
			}
		}

		.level-content {
			background: #FFFFFF;
			box-shadow: 0rpx 8rpx 32rpx 0rpx rgba(9,44,76,0.1);
			border-radius: 12rpx;
			padding: 30rpx 14rpx;
			.lev-img {
				width: 156rpx;
				height: 156rpx;
			}
			.title{
				color: #092C4C;
				margin-bottom: 16rpx;
			}
		}
	}
	.pop-warp{
		position: relative;
		padding-top: 30px;
		border-radius: 24px;
		.poa-icon{
			position: absolute;
			top:0px;
			left: 50%;
			width: 60px;
			height: 60px;
			transform: translateX(-50%);
			z-index: 999;
		}
		.pop-box {
			background: url('/static/images/common/pop-bg.png') no-repeat;
			background-size: cover;
			color: #808080;
			width: 314px;
			height: 410px;
			padding: 30px 24px;
			
			.pop-type {
				color: #092C4C;
				height: 61px;
				line-height: 61px;
				text-align: center;
			}
			
			.scroll-con{
				width: 266px;
			}
		}
		.close-warp{
			height: 60px;
			line-height: 60px;
			background: #ABB3BB;
			text-align: center;
			font-size: 16px;
			color: #FFFFFF;
			border-radius: 0px 0px 24px 24px;
		}
	}
	

	.mask-pop {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		color: #fff;
		background: rgba(6, 14, 41, 0.6);
		left: 0;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 99999;

		.pop-cont {
			max-width: 80vw;
			position: relative;

			.img {
				height: 440px;
				max-width: 80vw;
				border-radius: 10px;
			}

			.close {
				position: absolute !important;
				bottom: -45px;
				right: calc(50% - 18px);
				width: 36px;
				height: 36px;
			}
		}
	}

	@media screen and (min-width: 376px) and (max-width: 800px) {
		.content {
			zoom: 1.05 !important;
		}

	}
</style>