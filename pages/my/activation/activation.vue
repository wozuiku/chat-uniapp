<template>
	<view>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">激活码</view>
				<input placeholder="请输入激活码" name="input" v-model="activationCode"></input>
				<button class='cu-btn bg-orange activation-btn' @tap="activation">立即激活</button>
			</view>

			<view class="prompt-text">激活方法</view>
			<view class="prompt-text-line">方法1：添加助理微信，购买vip，获取激活码</view>
			<view class="prompt-text-line">方法2：邀请好友使用小程序，免激活即可使用</view>

		</form>
	</view>
</template>

<script>
	const db = uniCloud.database();
	const dbCmd = db.command;

	export default {
		data() {
			return {
				userInfo: {},
				invitationInfo: {},
				activationCode: '',
			}
		},

		onLoad() {
			this.init()
		},

		methods: {

			init() {
				this.userInfo = uni.getStorageSync('userInfo')

				console.log('init this.userInfo:', this.userInfo);
			},

			async activation() {
				console.log('this.activationCode:', this.activationCode);

				await this.getInvitationInfo(this.activationCode)
				console.log('activation this.invitationInfo:', this.invitationInfo);

				if (this.invitationInfo) {
					if (this.invitationInfo.openId == this.userInfo.openid) {
						uni.showToast({
							title: '不能用自己邀请码激活',
							icon: 'none'
						})
					} else {
						//更新邀请人的有效期至
						await this.updateValidDate()
						//更新邀请人的邀请次数
						await this.updateInvitationCount(this.activationCode)
						//如果激活码是ADMIN类型更新邀请码状态为N

						uni.showToast({
							title: '激活码成功',
							icon: 'none'
						})
						
						uni.switchTab({
							url:'/pages/index/my'
						})
					}

				} else {
					uni.showToast({
						title: '激活码无效',
						icon: 'none'
					})
				}
			},

			async getInvitationInfo(activationCode) {
				let res = await db.collection('chat-member-activation')
					.where('invitationCode=="' + activationCode + '" && invitationCodeStatus=="Y"')
					.get()

				this.invitationInfo = res.result.data[0]
			},


			async updateValidDate() {
				
				let newValidDateStr = this.userInfo.validDate
				console.log('newValidDate1:', newValidDateStr);
				let newValidDate = new Date(newValidDateStr)
				newValidDate = newValidDate.setDate(newValidDate.getDate() + 1 * 10)
				newValidDate = new Date(newValidDate)
				newValidDate = this.$formatter.timeFormat(newValidDate, 'yyyy-mm-dd')
				
				console.log('newValidDate2:', newValidDate);
				
				await db.collection('chat-member').where('_id=="' + this.userInfo._id + '"').update({
					validDate: newValidDate
				})
			},

			async updateInvitationCount(activationCode) {
				await db.collection('chat-member-activation').where('invitationCode=="' + activationCode +
					'" && invitationCodeStatus=="Y"').update({
					invitationCount: this.invitationInfo.invitationCount + 1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.activation-btn {
		background-color: #30BEB8;
	}

	.prompt-text {
		padding-left: 15px;
		padding-top: 12px;
		font-size: 26rpx;
		font-weight: 400;
		color: #999999;
	}

	.prompt-text-line {
		padding-left: 15px;
		padding-top: 6px;
		font-size: 26rpx;
		font-weight: 400;
		color: #999999;
	}
</style>
