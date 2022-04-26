<template>
	<view>
		<!-- <view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 我的邀请
			</view>
		</view> -->
		
		<view class="cu-list menu card-menu margin-top">
			<view class="cu-item">
				<view class="content">
					<!-- <text class="cuIcon-btn text-green"></text> -->
					<text class="text-grey">我的邀请码：</text>
					<text class="text-grey">{{invitationInfo.invitationCode}}</text>
				</view>
				<view class="action">
					<button class="cu-btn round bg-orange shadow">
						<text class="cuIcon-qrcode"></text> 生成邀请海报</button>
				</view>
			</view>
			
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">已邀请人数：</text>
					<text class="text-grey">{{invitationInfo.invitationCount}}个好友</text>
				</view>
				
			</view>
			
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">已获得权益：</text>
					<text class="text-grey">{{(invitationInfo.invitationCount) * 10}}天使用时间</text>
				</view>
				
			</view>
			
			
		</view>
		
		<view class="prompt-text">规则说明</view>
		<view class="prompt-text-line">每邀请1个好友可获取10天的使用时间，依次累加</view>
		<view class="prompt-text-line">好友使用你的邀请码在小程序激活，表示邀请成功</view>
		
	</view>
</template>

<script>
	
	const db = uniCloud.database();
	const dbCmd = db.command;
	
	export default {
		data(){
			return {
				userInfo: {},
				invitationInfo: {}
			}
		},
		
		onLoad() {
			this.init()
		},
		
		methods: {
			
			async init(){
				this.userInfo = uni.getStorageSync('userInfo')
				//this.invitationInfo = uni.getStorageSync('invitationInfo')
				
				
				await this.getInvitationInfo(this.userInfo.openid)
				
				console.log('this.invitationInfo:', this.invitationInfo);
			},
			
			async getInvitationInfo(openId){
				
				let res = await db.collection('chat-member-activation')
					.where('openId=="' + openId + '"')
					.get()
					
				//console.log('getInvitationInfo res:', res);
				this.invitationInfo = res.result.data[0]
				
			}
			
			
			
		}
	}
</script>

<style lang="scss" scoped>
	
	.prompt-text{
		padding-left: 30px;
		padding-top: 20px;
		font-size: 26rpx;
		font-weight: 400;
		color: #999999;
	}
	
	.prompt-text-line{
		padding-left: 30px;
		padding-top: 6px;
		font-size: 26rpx;
		font-weight: 400;
		color: #999999;
	}
	
</style>
