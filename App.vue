<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			let lan = uni.getLocale();
			console.log(lan)
			/* 系统默认语言或日文设为日文环境 */
			if(lan == 'zh-Hans'){
				uni.setLocale('japan');
				this.$u.vuex('vuex_lang','japan')
			}else{
				this.$u.vuex('vuex_lang',lan)
			}
			
			// if(this.vuex_authorization == ""){
			// 	uni.reLaunch({
			// 		url:'/pages/userPages/login/login',
			// 	})
			// }
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	page{
		background: #EDF5FF;
	}
	::v-deep uni-modal{
		z-index:999999 !important;
	}
	::v-deep .uni-modal .uni-modal__bd {
		word-break: normal!important;
	}
	::v-deep .uni-modal .uni-modal__hd{
		padding: 16px 26px 5px !important;
	}
	
	::v-deep uni-actionsheet .uni-actionsheet__menu{
		background-color: #1775DD !important;
		border-radius:12px;
	}
	::v-deep .uni-actionsheet__cell{
		color: #FFFFFF !important;
	}
	::v-deep uni-actionsheet .uni-actionsheet__action{
		background-color: #FFFFFF !important;
		margin-top: 25px;
		border-radius:12px;
		color: #092C4C;
	}
	::v-deep .uni-actionsheet__action .uni-actionsheet__cell{
		color: #092C4C !important;
	}
	::v-deep uni-actionsheet .uni-actionsheet{
		left: 18px;
		right: 18px;
		bottom: 25px;
	}
	::v-deep@media screen and (min-width: 500px) and (min-height: 500px){
		uni-actionsheet .uni-actionsheet{
			left: 50%;
			right: auto;
		}
	}
</style>
<style lang="scss">
	@import "uview-ui/index.scss";
</style>