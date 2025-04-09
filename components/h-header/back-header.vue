<template>
	<view class="">
		<view class="h-header">
			<view
				class="h-status-bar"
				:style="{ height: statusBarHeight + 'px' }"
			></view>
			<view class="cus-header u-flex u-row-between">
				<view @click="goBack">
					<image
						class="back-icon"
						src="/static/images/common/back.png"
						mode=""
					/>
				</view>
				<!-- <view class="u-navbar-content-title" v-if="title" :style="[titleStyle]"> -->
				<view class="h-nav-title u-line-1" v-if="title">
					{{ title }}
				</view>
				<view class="u-slot-content" v-else>
					<slot></slot>
				</view>
				<view class="u-slot-right" @click="goNotic">
					<image
						class="notic-icon"
						src="/static/images/common/alert.png"
						mode=""
					></image>
				</view>
			</view>
		</view>
		<!-- 解决fixed定位后导航栏塌陷的问题 -->
		<view
			class="u-navbar-placeholder"
			:style="{ width: '100%', height: 58 + statusBarHeight + 'px' }"
		></view>
	</view>
</template>

<script>
// 获取系统状态栏的高度
let systemInfo = uni.getSystemInfoSync();
/**
 * navbar 自定义导航栏
 * @description 此组件一般用于在特殊情况下，需要自定义导航栏的时候用到，一般建议使用uniapp自带的导航栏。
 * @tutorial https://www.uviewui.com/components/navbar.html
 * @property {String} title 导航栏标题，如设置为空字符，将会隐藏标题占位区域
 * @property {String Number} title-width 导航栏标题的最大宽度，内容超出会以省略号隐藏，单位rpx（默认250）
 * @property {String} title-color 标题的颜色（默认#606266）
 * @property {String Number} title-size 导航栏标题字体大小，单位rpx（默认32）
 * @property {Function} custom-back 自定义返回逻辑方法
 * @property {String Number} z-index 固定在顶部时的z-index值（默认980）
 * @property {Boolean} is-back 是否显示导航栏左边返回图标和辅助文字（默认true）
 * @property {Boolean} is-fixed 导航栏是否固定在顶部（默认true）
 * @property {Boolean} border-bottom 导航栏底部是否显示下边框，如定义了较深的背景颜色，可取消此值（默认true）
 */
export default {
	name: "back-header",
	props: {
		// 导航栏标题
		title: {
			type: String,
			default: "",
		},
		// 标题的宽度，如果需要自定义右侧内容，且右侧内容很多时，可能需要减少这个宽度，单位rpx
		titleWidth: {
			type: [String, Number],
			default: "580",
		},
		// 自定义返回逻辑
		customBack: {
			type: Function,
			default: null,
		},
	},
	computed: {
		// 导航中间的标题的样式
		titleStyle() {
			let style = {};
			// #ifndef MP
			style.left =
				(systemInfo.windowWidth - uni.upx2px(this.titleWidth)) / 2 + "px";
			style.right =
				(systemInfo.windowWidth - uni.upx2px(this.titleWidth)) / 2 + "px";
			// #endif
			// #ifdef MP
			// 此处是为了让标题显示区域即使在小程序有右侧胶囊的情况下也能处于屏幕的中间，是通过绝对定位实现的
			let rightButtonWidth = systemInfo.windowWidth - menuButtonInfo.left;
			style.left =
				(systemInfo.windowWidth - uni.upx2px(this.titleWidth)) / 2 + "px";
			style.right =
				rightButtonWidth -
				(systemInfo.windowWidth - uni.upx2px(this.titleWidth)) / 2 +
				rightButtonWidth +
				"px";
			// #endif
			style.width = uni.upx2px(this.titleWidth) + "px";
			return style;
		},
	},
	data() {
		return {
			statusBarHeight: systemInfo.statusBarHeight,
		};
	},
	methods: {
		goBack() {
			// 如果自定义了点击返回按钮的函数，则执行，否则执行返回逻辑
			if (typeof this.customBack === "function") {
				// 在微信，支付宝等环境(H5正常)，会导致父组件定义的customBack()函数体中的this变成子组件的this
				// 通过bind()方法，绑定父组件的this，让this.customBack()的this为父组件的上下文
				this.customBack.bind(this.$u.$parent.call(this))();
			} else {
				uni.navigateBack();
			}
		},
		goNotic() {
			this.$u.route("/pages/noticList/noticList");
		},
	},
};
</script>

<style scoped lang="scss">
.h-header {
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	max-width: var(--max-width);
	width: 100%;
	margin: 0 auto;
	z-index: 999;
}

.h-status-bar {
	width: 100%;
}

.cus-header {
	height: var(--header-height);
	background: #798da3;
	padding: 0 42rpx;
	display: flex;
	justify-content: space-between;

	.back-icon {
		width: 18px;
		height: 19px;
	}

	.u-navbar-centent-slot {
		flex: 1;
	}

	.h-nav-title {
		font-size: 18px;
		color: #fff;
	}

	.notic-icon {
		width: 42rpx;
		height: 42rpx;
	}
}
</style>
