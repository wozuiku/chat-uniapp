<template>
	<view class="my-wrap">
		<view class="user-info">
			<view class="user-image-box">
				<view class="user-image">
					<u-avatar mode="circle" size="160" :src="userInfo.avatarUrl"></u-avatar>
				</view>
			</view>

			<view class="user-message-box">
				<view class="user-name">
					<view class="user-name-label">昵称：</view>
					<view class="user-name-value">{{userInfo.nickName}}</view>
				</view>
				<view class="member-id">
					<view class="member-id-label">会员ID：</view>
					<view class="member-id-value">{{userInfo.memberId}}</view>
				</view>
				<view class="member-level">
					<view class="member-level-label">会员等级：</view>
					<view class="member-level-value">{{userInfo.memberLevel}}</view>
				</view>
				<view class="valid-date">
					<view class="valid-date-label">有效期至：</view>
					<view class="valid-date-value">{{userInfo.validDate}}</view>
				</view>
			</view>



		</view>

		<view class="func-area">
			<view class="cu-list menu">
				<view class="cu-item arrow" @tap="jumpActivation">
					<view class="content">
						<text class="cuIcon-crown text-grey"></text>
						<text class="text-grey">填写激活码</text>
					</view>
				</view>
				
				<view class="cu-item arrow" @tap="jumpInvitation">
					<view class="content">
						<text class="cuIcon-share text-grey"></text>
						<text class="text-grey">邀请好友赚vip</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-friendfavor text-grey"></text>
						<text class="text-grey">联系客服</text>
					</view>

					<view class="action">
						<view class="item-right">
							<view class="wechat-number text-gray">微信：{{wechatNumber}}</view>
							<view class="copy-btn" @tap="copy">
								<view class="cu-tag line-orange round light">复制</view>
							</view>

						</view>

					</view>
				</view>
				<view class="cu-item arrow" @tap="jumpSuggestion">
					<view class="content">
						<text class="cuIcon-activity text-grey"></text>
						<text class="text-grey">投诉建议</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-text text-grey"></text>
						<text class="text-grey">使用协议</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-safe text-grey"></text>
						<text class="text-grey">隐私政策</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		APP_OWNER
	} from '@/env'

	const db = uniCloud.database();
	const dbCmd = db.command;

	export default {
		data() {
			return {

				userInfo: {},

				validDate: '',
				wechatNumber: ''
			}
		},

		onLoad() {
			this.init()
		},

		onShow() {
			this.getValidDate()
			this.getWechatNumber()

		},

		methods: {
			init() {

				this.userInfo = uni.getStorageSync('userInfo')
				
				console.log('this.userInfo:', this.userInfo);

				//今天
				let currentData = new Date()
				//下个月的今天
				let nextMonthDate = this.$formatter.addMonth(currentData, 1)
				this.validDate = this.$formatter.timeFormat(nextMonthDate, 'yyyy-mm-dd')
				console.log('validDate:', this.validDate);

			},
			
			async getValidDate() {
				let res = await db.collection('chat-member')
					.where('_id=="' + this.userInfo._id + '"')
					.get()
					
				this.userInfo.validDate = res.result.data[0].validDate
			},

			async getWechatNumber() {
				
				let res = await db.collection('chat-config')
					.where('config_type=="weixin" && item_code=="' + APP_OWNER + '" && enable=="Y"')
					.get()
					
				this.wechatNumber = res.result.data[0].item_content
			},

			copy() {
				uni.setClipboardData({
					data: this.wechatNumber,
					success: function() {
						uni.showToast({
							title: "已经复制",
							icon: "none"
						});
					}
				});
			},
			
			jumpActivation(){
				uni.navigateTo({
					url: "/pages/my/activation/activation"
				})
			},
			
			jumpInvitation(){
				uni.navigateTo({
					url: "/pages/my/invitation/invitation"
				})
			},
			
			jumpSuggestion(){
				uni.navigateTo({
					url: "/pages/my/suggestion/suggestion"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my-wrap {
		display: flex;
		flex-direction: column;

		.user-info {
			display: flex;
			height: 280rpx;
			background-color: #30BEB8;

			.user-image-box {
				padding-left: 80rpx;
				display: flex;
				align-items: center;

				.user-image {}
			}

			.no-user-message-box {
				display: flex;
				align-items: center;
				padding-left: 32rpx;
				width: 100%;

				.login-prompt {
					color: #FFF;
					font-size: 38rpx;

				}
			}

			.user-message-box {
				display: flex;
				flex-direction: column;
				justify-content: center;
				padding-left: 60rpx;
				color: #FFF;
				font-size: 28rpx;

				.user-name {
					display: flex;
					padding-top: 6rpx;
					align-items: center;

					.user-name-label {
						width: 140rpx;

					}

					.user-name-value {
						padding-left: 12rpx;
					}
				}

				.member-id {
					display: flex;
					padding-top: 6rpx;
					align-items: center;

					.member-id-label {
						width: 140rpx;

					}

					.member-id-value {
						padding-left: 12rpx;
					}
				}

				.member-level {
					display: flex;
					padding-top: 6rpx;
					align-items: center;

					.member-level-label {
						width: 140rpx;
					}

					.member-level-value {
						padding-left: 12rpx;
					}
				}

				.valid-date {
					display: flex;
					padding-top: 6rpx;
					align-items: center;

					.valid-date-label {
						width: 140rpx;
					}

					.valid-date-value {
						padding-left: 12rpx;
					}
				}


			}

		}

		.func-area {
			.item-right {
				display: flex;
				align-items: center;

				.wechat-number {}

				.copy-btn {
					padding-left: 22rpx;
				}

			}
		}

	}
</style>
