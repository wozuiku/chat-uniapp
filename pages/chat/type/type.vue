<template>
	<view class="type-wrap">
		<view class="type-title">
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> {{type}}
				</view>
			</view>
		</view>

		<view class="type-items">
			<view v-for="(item, index) in resultList" :key="index">
				<view class="type-item">
					<view class="item-line" v-for="(item1, index1) in item.demo_code" :key="index1">
						<view class="line-image">
							<image class="user-icon-m" v-if="item1.gender == 'M'" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-b7a774b3-4b44-4ebe-b2a7-716565dfc8e9/4088136a-74da-4a61-abf2-0ef7b2eabb80.png">
							</image>
							<image class="user-icon-f" v-if="item1.gender == 'F'" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-b7a774b3-4b44-4ebe-b2a7-716565dfc8e9/a5c669a2-88a4-4e74-b64a-179612c681dd.png">
							</image>
						</view>
						<view class="line-content" @longpress="longPress(item1.line_content)">
							<text>{{item1.line_content}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="share-box">
			<button class="cu-btn bg-orange lg share-btn" open-type="share">
				<text class="cuIcon-share"></text>分享给朋友</button>
		</view>



	</view>
</template>

<script>
	export default {
		data() {
			return {

				type: '',
				resultList: [],

			}
		},

		onLoad(option) {

			console.log('onLoad option:', option);

			this.type = option.name

			console.log('onLoad keyword:', this.keyword);
			const db = uniCloud.database()
			db.collection('chat-type-item-header, chat-type-item-line')
				.where(`${new RegExp(this.type, 'i')}.test(type_code)`)
				.field('type_code, demo_code, demo_name, line_no, line_content')
				.get()
				.then(res => {
					this.resultList = res.result.data
					console.log(this.resultList)
				}).catch(err => {
					console.error(err)
				})
		},

		methods: {
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
	.type-wrap {
		display: flex;
		flex-direction: column;

		.type-title {}

		.type-items {
			display: flex;
			flex-direction: column;
			padding-left: 22rpx;
			padding-right: 22rpx;
			//background-color: #007AFF;

			.type-item {
				display: flex;
				flex-direction: column;
				margin-top: 22rpx;
				padding: 22rpx;
				//width: 100%;
				background-color: #FFF;
				border-radius: 28rpx;

				.item-line {
					display: flex;
					align-items: center;
					background-color: #FFF;

					.line-image {
						padding: 12rpx;

						.user-icon-m {
							width: 48rpx;
							height: 48rpx;
						}

						.user-icon-f {
							width: 50rpx;
							height: 50rpx;
						}
					}

					.line-content {
						padding: 12rpx;
					}
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
