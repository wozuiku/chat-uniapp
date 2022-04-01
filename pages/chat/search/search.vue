<template>
	<view class="search-wrap">
		<view class="search-box">
			<view class="search-input-box">
				<u-icon name="search" color="#909399" :size="28"></u-icon>
				<u-input class="search-text" v-model="keyword" type="text" placeholder="输入女生说的话，获取高情商回复"></u-input>
			</view>
			<view class="search-btn-box">
				<button class="search-btn" @tap="search">搜索</button>
			</view>
		</view>

		<view class="tag-box">
			<view class="tag-title">
				<text style="color: #30BEB8;">热门搜索：</text>
			</view>
			<view class="tag-items">
				<view class='cu-tag line-orange round sm' style="color: #F889AB;" @click="clickTag('开场白')">开场白</view>
				<view class='cu-tag line-orange round sm' style="color: #F889AB;" @click="clickTag('表白')">表白</view>
				<view class='cu-tag line-orange round sm' style="color: #F889AB;" @click="clickTag('套路')">套路</view>
				<view class='cu-tag line-orange round sm' style="color: #F889AB;" @click="clickTag('话题')">话题</view>
				<view class='cu-tag line-orange round sm' style="color: #F889AB;" @click="clickTag('在干嘛')">在干嘛</view>
				<view class='cu-tag line-orange round sm' style="color: #F889AB;" @click="clickTag('你是谁')">你是谁</view>
			</view>
		</view>

		<view class="result-box">
			<view class="cu-list result-items">
				<view class="cu-item result-item" v-for="(item,index) in resultList" :key="index">
					<view class="cu-chat bg-white">
						<view class="cu-item ">
							<view class="cu-avatar radius"
								style="background-image:url(../../static/images/search/girl.png); background-color: #FFF;">
							</view>
							<view class="main">
								<view class="content shadow" style="background-color: #F889AB; color: #FFF;">
									<text>{{item.girl_message}}</text>
								</view>
							</view>
						</view>

						<view class="cu-item self" @longpress="longPress(item.boy_message)">
							<view class="main">
								<view class="content shadow" style="background-color: #4EB5B2; color: #FFF;">
									<text>{{item.boy_message}}</text>
								</view>
							</view>
							<view class="cu-avatar radius"
								style="background-image:url(../../static/images/search/boy.png); background-color: #FFF;">
							</view>
						</view>
					</view>
				</view>

			</view>
		</view>
		
		<view class="share-box">
			<button class="cu-btn block bg-orange lg share-btn" open-type="share">
				<text class="cuIcon-share"></text>分享给朋友</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				resultList: []
			}
		},

		methods: {
			search() {
				console.log('search keyword:', this.keyword);
				const db = uniCloud.database()
				db.collection('chat-message-item')
					.where(`${new RegExp(this.keyword, 'i')}.test(girl_message)`)
					.field('type, girl_message, boy_message')
					.get()
					.then(res => {
						this.resultList = res.result.data
						console.log(this.resultList)
					}).catch(err => {
						console.error(err)
					})
			},

			clickTag(tag) {
				this.keyword = tag
				this.search()
			},

			longPress(msg) {
				uni.setClipboardData({
					data: msg,
					success: function() {
						uni.showToast({
							title: "已经复制",
							icon: "none"
						});
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search-wrap {
		display: flex;
		flex-direction: column;
		width: 100%;
		
		.search-box {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80rpx;
			padding-left: 32rpx;
			padding-right: 32rpx;
			background-color: #FFF;
			.search-input-box {
				background-color: #f2f2f2;
				border-radius: 100rpx;
				display: flex;
				align-items: center;
				padding: 10rpx 16rpx;
				width: 80%;
				height: 60rpx;
				.search-text {
					width: 100%;
					font-size: 26rpx;
					color: $u-tips-color;
					margin-left: 10rpx;
				}
			}

			.search-btn-box {
				padding-left: 20rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				.search-btn {
					width: 120rpx;
					line-height: 60rpx;
					font-size: 26rpx;
					border-radius: 28rpx;
					background: #4EB5B2;
					color: #fff;
				}
			}
		}

		.tag-box {
			display: flex;
			padding-top: 12rpx;
			padding-bottom: 24rpx;
			padding-left: 12rpx;
			background-color: #FFF;

			.tag-title {
				display: flex;
				justify-content: center;
				align-items: center;
				padding-left: 20rpx;
				font-size: 24rpx;
				height: 60rpx;
				line-height: 60rpx;
			}

			.tag-items {
				display: flex;
				flex-wrap: wrap;
				align-items: center;
			}
		}
		
		.result-box{
			.result-items{
				display: flex;
				flex-direction: column;
				padding-left: 32rpx;
				padding-right: 32rpx;
				//background-color: #007AFF;
				
				.result-item{
					padding: 12rpx;
					background-color: #FFF;
					border-radius: 22rpx;
					margin-top: 32rpx;
				}
			}
			
		}
		
		.share-box {
			display: flex;
			justify-content: center;
			margin: 32rpx;
			.share-btn{
				width: 240rpx;
				height: 68rpx;
				font-size: 26rpx;
				background-color: #30BEB8;
			}
		}

	}
</style>
