<template>
	<view class="my-wrap">
		<view class="user-info">
			<block v-if="!isLogin">
				<view class="user-image-box" @tap="login">
					<view class="user-image">
						<u-avatar mode="circle" size="160" src="/static/images/index/defaultAvatar.jpeg"></u-avatar>
					</view>
				</view>

				<view class="no-user-message-box" @tap="login">
					<view class="login-prompt">
						请登录~
					</view>
				</view>
			</block>

			<block v-if="isLogin">
				<view class="user-image-box">
					<view class="user-image">
						<u-avatar mode="circle" size="160" :src = "userInfo.avatarUrl"></u-avatar>
					</view>
				</view>

				<view class="user-message-box">
					<view class="user-name">
						<view class="user-name-label">昵称：</view>
						<view class="user-name-value">{{userInfo.nickName}}</view>
					</view>
					<view class="member-id">
						<view class="member-id-label">会员ID：</view>
						<view class="member-id-value">{{memberId}}</view>
					</view>
					<view class="member-level">
						<view class="member-level-label">会员等级：</view>
						<view class="member-level-value">{{memberLevel}}</view>
					</view>
					<view class="valid-date">
						<view class="valid-date-label">有效期至：</view>
						<view class="valid-date-value">{{validDate}}</view>
					</view>
				</view>

			</block>





		</view>

		<view class="func-area">
			<view class="cu-list menu">
				<view class="cu-item arrow">
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
				<view class="cu-item arrow">
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
	
	export default {
		data() {
			return {
				isLogin: false,
				userInfo: {},
				memberId: '',
				memberLevel: '普通会员',
				validDate: '',
				wechatNumber: ''
			}
		},

		onLoad() {
			this.init()
		},

		methods: {
			init(){
				const db = uniCloud.database()
				db.collection('chat-member')
					.field('max(memberId) as maxMemberId')
					.get()
					.then(res => {
						console.log('chat-member:', res)
						//表chat-member的memberId字段当前最大值
						let dbMaxMemberId = res.result.data[0].maxMemberId
						this.memberId = parseInt(dbMaxMemberId) + 1
						console.log(this.maxMemberId)
					}).catch (err => {
					console.error(err)
				})
				
				// 使用uni-clientDB
				db.collection('chat-config')
				  .where('config_type=="weixin" && item_code=="'+ APP_OWNER + '" && enable=="Y"')
				  .get()
				  .then((res)=>{
					  this.wechatNumber = res.result.data[0].item_content
				    console.log('chat-config:', res)
					console.log('wechatNumber:', this.wechatNumber)
				  }).catch((err)=>{
				    console.log(err.code); // 打印错误码
				        console.log(err.message); // 打印错误内容
				  })
				
				//今天
				let currentData = new Date()
				//下个月的今天
				let nextMonthDate = this.$formatter.addMonth(currentData, 1)
				this.validDate = this.$formatter.timeFormat(nextMonthDate, 'yyyy-mm-dd')
				console.log('validDate:', this.validDate);
				
			},
			
			login() {
				console.log('login');
				let _this = this
				uni.showModal({
					title: '温馨提示',
					content: '授权微信登录后才能正常使用小程序功能',
					success(res) {
						console.log('login res:', res);
						if (res.confirm) {
							uni.getUserProfile({
								desc: "注册用户信息使用",
								lang: "zh_CN",
								success: (userProfileRes) => {
									console.log('userProfileRes', userProfileRes)
									uni.login({
										provider: 'weixin',
										success: function(loginRes) {
											console.log('loginRes',loginRes);
											uniCloud.callFunction({
												name: 'chat-member',
												data: { 
													code: loginRes.code
												}
											  })
											  .then(res => {
												  console.log('callFunction res',res);
												  console.log('callFunction openid',res.result.data.openid);
												  console.log('callFunction session_key',res.result.data.session_key);
												  
												  _this.userInfo.nickName = userProfileRes.userInfo.nickName
												  _this.userInfo.gender = userProfileRes.userInfo.gender
												  _this.userInfo.avatarUrl = userProfileRes.userInfo.avatarUrl
												  _this.userInfo.memberId = _this.memberId
												  _this.userInfo.memberLevel = _this.memberLevel
												  _this.userInfo.validDate = _this.validDate
												 
												  
												  _this.userInfo.code = loginRes.code
												  _this.userInfo.openid = res.result.data.openid
												  _this.userInfo.session_key = res.result.data.session_key
												  
												  console.log('userInfo:', _this.userInfo);
												  
												  uni.setStorageSync('userInfo', _this.userInfo)
												  
												  _this.isLogin = true
												  
												  _this.createMember()
												  
												  
											  });
										}
									});
								},
								fail:(res) => {
									console.log('fail res:', res);
								}
							})
						} else {
							uni.showToast({
								title: '您取消了授权',
								duration: 2000
							});
						}
					}
				})
			},
			
			createMember(){
				console.log('createMember userInfo:', this.userInfo);
				const db = uniCloud.database()
				db.collection('chat-member').add(this.userInfo).then(e => {
					console.log('createMember e:', e);
				})
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
