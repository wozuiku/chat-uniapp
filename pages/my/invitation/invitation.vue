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
					<button class="cu-btn round bg-orange shadow" @tap="creatPoster">
						<text class="cuIcon-qrcode"></text>生成邀请海报</button>
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
		
		
		<hch-poster ref="hchPoster" @cancel="handleCancel" :posterData.sync="posterData" @previewImage="previewImage" />
		
	</view>
</template>

<script>
	
	import HchPoster from '@/components/hch-poster/hch-poster'
	
	const db = uniCloud.database();
	const dbCmd = db.command;
	
	export default {
		
		components: {
			HchPoster
		},
		
		data(){
			return {
				userInfo: {},
				invitationInfo: {},
				
				posterData: {
					poster: {
						//根据屏幕大小自动生成海报背景大小
						url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-b7a774b3-4b44-4ebe-b2a7-716565dfc8e9/08f183c3-7bdf-4da4-8fe9-de29a735ebce.jpeg', //图片地址
						r: 10, //圆角半径
						w: 300, //海报宽度
						h: 480, //海报高度
						p: 20 //海报内边距padding
					},
					mainImg: {
						//海报主商品图
						url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-b7a774b3-4b44-4ebe-b2a7-716565dfc8e9/cb5d13ad-5aaf-476c-a921-7d05abf7b29e.jpg', //图片地址
						r: 10, //圆角半径
						w: 250, //宽度
						h: 180 //高度
					},
					title: {
						//商品标题
						text: '这里有一份《聊天攻略》在等你', //文本
						fontSize: 16, //字体大小
						color: '#000', //颜色
						lineHeight: 25, //行高
						mt: 28 //margin-top
					},
					codeImg: {
						//小程序码
						url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-b7a774b3-4b44-4ebe-b2a7-716565dfc8e9/74b1a5d0-b049-4cb3-8a66-0330c5c328e9.jpg', //图片地址
						w: 100, //宽度
						h: 100, //高度
						mt: 38, //margin-top
						r: 50 //圆角半径
					},
					tips: []
				}
			}
		},
		
		onLoad() {
			this.init()
		},
		
		methods: {
			
			async init(){
				this.userInfo = uni.getStorageSync('userInfo')
				await this.getInvitationInfo(this.userInfo.openid)
				console.log('this.invitationInfo:', this.invitationInfo);
			},
			
			async getInvitationInfo(openId){
				let res = await db.collection('member-activation')
					.where('openId=="' + openId + '"')
					.get()
				this.invitationInfo = res.result.data[0]
				
				this.posterData.tips = [
						//提示信息
						{
							text: '长按识别查看', //文本
							fontSize: 14, //字体大小
							color: '#2f1709', //字体颜色
							align: 'center', //对齐方式
							lineHeight: 25, //行高
							mt: 28 //margin-top
						},
						{
							text: '邀请码：' + this.invitationInfo.invitationCode, //文本
							fontSize: 14, //字体大小
							color: '#2f1709', //字体颜色
							align: 'center', //对齐方式
							lineHeight: 25, //行高
							mt: 38 //margin-top
						}
					]
			},
			
			creatPoster(){
				this.$refs.hchPoster.posterShow()
			},
			
			handleCancel(val) {
				// this.canvasFlag = val
			},
			
			previewImage(base64) {
				// 预览图片
				uni.previewImage({
					urls: [base64]
				})
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
