<template>
	<view>
		<view class="header">
			<view class="line1">
				<image class="logo-image" src="/static/images/user/pic.png"></image>
			</view>
			<view class="line2">
				<view class="logo-text">让小恋更懂你</view>
			</view>
			<view class="line3">
				<view class="prompt-text">20W+恋爱聊天话术技巧，帮你提高情商，学说情话</view>
			</view>
		</view>
		<view class="content">
			<view class="login-btn-box">
				<button class='cu-btn bg-orange lg login-btn' open-type="getUserInfo" withCredentials="true"
					lang="zh_CN" @getuserinfo="getUserInfo">
					微信一键登录
				</button>
			</view>
		</view>
		<view class="protocol"></view>
	</view>
</template>

<script>
	const db = uniCloud.database();
	const dbCmd = db.command;

	export default {
		data() {
			return {
				userInfo: {
					memberId: '',
					nickName: '',
					gender: '',
					avatarUrl: '',
					openid: '',
				}
			}

		},



		methods: {
			async getUserInfo() {
				uni.showModal({
					title: "温馨提示",
					content: "授权微信登录后才能正常使用小程序功能",
					success: (e) => {
						if (e.confirm) {
							uni.getUserProfile({
								desc: "获取你的昵称、头像、地区及性别",
								success: async (res) => {
									console.log(res);

									this.userInfo.nickName = res.userInfo.nickName
									this.userInfo.avatarUrl = res.userInfo.avatarUrl
									this.userInfo.gender = res.userInfo.gender

									this.userInfo.memberId = await this.getMemberId()
									this.userInfo.memberLevel = '普通会员'
									this.userInfo.openid = uni.getStorageSync('openid')
									
									


									await this.addMember()
									uni.setStorageSync('userInfo', this.userInfo)

									uni.switchTab({
										url: '/pages/index/index'
									})


								},
								fail: (err) => {
									console.log(err);
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


			async getMemberId() {
				
				let res = await db.collection('chat-member')
					.field('max(memberId) as maxMemberId')
					.get()
					
				console.log('getMemberId res:', res);
				let dbMaxMemberId, memberId
				if(res.result.data.length > 0){
					dbMaxMemberId = res.result.data[0].maxMemberId
					memberId = parseInt(dbMaxMemberId) + 1
				}else{
					memberId = '600001'
				}
				
			    console.log('getMemberId memberId:', memberId);
				
				return memberId
			},

			async addMember() {
				console.log('addMember userInfo:', this.userInfo);
				await db.collection('chat-member').add(this.userInfo)
			},

			getCode() {
				return new Promise((resolve, reject) => {
					uni.login({
						provider: "weixin",
						success: (e) => {
							resolve(e)
						},
						fail: (err) => {
							reject(new Error("获取code失败"))
						}
					})
				})
			},

			getOpenID(code) {

				return new Promise((resolve, reject) => {
					uni.request({
						url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx1661376701ddbb9a&secret=6e2daeeb7d96e93729263fbd5565e956&js_code=' +
							code,
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						method: "post",
						success: (e) => {
							console.log('getOpenID e:', e);
							resolve(e.data)
						},
						fail: (err) => {
							reject(new Error("获取openid失败"))
						}

					})
				})



			},

			getUserProfile() {
				return new Promise((resolve, reject) => {
					uni.getUserProfile({
						desc: "获取你的昵称、头像、地区及性别",
						success: (e) => {
							resolve(e)
						},
						fail: (err) => {
							reject(new Error("getUserProfile失败"))
						}
					})
				})
			},



			async wxLogin() {
				this.getCode().then(e => {
					return this.getOpenID(e.code)
				}).then(e => {
					console.log('e:', e.openid);
					uni.showModal({
						title: "温馨提示",
						content: "授权微信登录后才能正常使用小程序功能",
						success: (e) => {
							if (e.confirm) {
								this.getUserProfile().then(e => {
									console.log(e);
									this.userInfo = e.userInfo
								})
							}
						}
					})
				})
			},

		}

	}
</script>

<style lang="scss" scoped>
	.header {
		display: flex;
		flex-direction: column;
		align-items: center;

		.line1 {
			padding-top: 180rpx;

			.logo-image {
				width: 180rpx;
				height: 180rpx;
			}
		}

		.line2 {
			padding-top: 20rpx;

			.logo-text {
				font-size: 36rpx;
				font-weight: 600;
			}
		}

		.line3 {
			padding-top: 20rpx;

			.prompt-text {
				font-size: 26rpx;
			}
		}
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;

		.login-btn-box {
			padding-top: 120rpx;

			.login-btn {
				width: 240rpx;
				height: 68rpx;
				font-size: 26rpx;
				background-color: #30BEB8;
			}
		}
	}
</style>
