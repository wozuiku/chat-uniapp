<template>
	<view class="article-wrap">
		<view class="title">{{title}}</view>
		
		<view class="author">
			<view class="author-icon-box">
				<u-avatar class="author-icon" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-b7a774b3-4b44-4ebe-b2a7-716565dfc8e9/d85f5970-76e2-495b-a692-162b0d927819.jpeg" mode="circle" size = 68></u-avatar>
			</view>
			
			<view class="author-name-box">
				<view class="author-name">{{author_name}}</view>
				<view class="author-brief">{{author_brief}}</view>
			</view>
		</view>
		
		<view class="content">
			
			<mp-html ref="article"  :content="content_html"/>
			
			<view class="share-box">
				<button class="cu-btn bg-orange lg share-btn" open-type="share">
					<text class="cuIcon-share"></text>感觉还不错，分享给朋友</button>
			</view>
			
			<view class="wechat-box">
				<button class="cu-btn line-green lg wechat-btn" @tap="showWechatModal">
					<text class="cuIcon-weixin"></text>添加微信，领取干货资料</button>
			</view>
			
			<view class="cu-modal" :class="showWechat ? 'show' : ''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">微信</view>
						<view class="action" @tap="cancelModal">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<view class="padding-xl mar">
						车长微信：{{wechatNumber}}
					</view>
					<view class="cu-bar bg-white justify-end">
						<view class="action">
							<button class="cu-btn line-green text-green" @tap="cancelModal">取消</button>
							<button class="cu-btn bg-green margin-left" @tap="confirmModal">复制</button>
						</view>
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
				articleId: '',
				articleList:'',
				
				title: '',
				author_name: '',
				author_brief: '',
				content_html: '',
				
				showWechat: false,
				wechatNumber: ''
			}
		},
		
		onLoad(options) {
			this.articleId = options.articleId
			
			console.log('onLoad this.articleId:', this.articleId);
			
			this.init()
		},

		methods: {
			init() {
				// 客户端联表查询
				const db = uniCloud.database()
				db.collection('dry-article')
					.field('title, author_name, author_brief, content_html, order')
					.where('_id == "' + this.articleId + '"')
					.get()
					.then(res => {
						this.articleList = res.result.data
						this.title = this.articleList[0].title
						this.author_name = this.articleList[0].author_name
						//this.author_brief = this.articleList[0].author_brief
						this.content_html = decodeURIComponent(this.articleList[0].content_html)
						console.log(this.content_html);
					}).catch(err => {
						console.error(err)
					})
					
				// 使用uni-clientDB
				db.collection('chat-config')
				  .where('config_type=="weixin" && item_code=="'+ APP_OWNER + '" && enable=="Y"')
				  .get()
				  .then((res)=>{
					  this.wechatNumber = res.result.data[0].item_content
					  this.author_brief = '领取资料请加微信：' + this.wechatNumber
				  }).catch((err)=>{
				    console.log(err.code); // 打印错误码
				    console.log(err.message); // 打印错误内容
				  })
			},
			
			showWechatModal(){
				this.showWechat = true
			},
			
			cancelModal(){
				this.showWechat = false
			},
			
			confirmModal(){
				this.copy()
				this.showWechat = false
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
	
	.article-wrap{
		display: flex;
		flex-direction: column;
		background-color: #FFF;
		width: 100%;
		//height: 100vh;
		
		.title{
			font-size: 38rpx;
			font-weight: 600;
			padding: 32rpx;
		}
		
		.author{
			display: flex;
			padding-left: 32rpx;
			.author-icon-box{
				display: flex;
				align-items: center;
				.author-icon{
				}
			}
			
			.author-name-box{
				display: flex;
				flex-direction: column;
				justify-content: center;
				padding-left: 12rpx;
				.author-name{
					font-size: 28rpx;
					font-weight: 600;
					
				}
				
				.author-brief{
					font-size: 22rpx;
					
				}
				
			}
			
		}
		
		.content{
			padding: 48rpx;
			display: flex;
			flex-direction: column;
			
			.share-box {
				display: flex;
				justify-content: center;
				margin: 32rpx;
				.share-btn{
					width: 400rpx;
					height: 68rpx;
					font-size: 26rpx;
					background-color: #30BEB8;
				}
			}
			
			.wechat-box {
				display: flex;
				justify-content: center;
				margin-left: 32rpx;
				margin-right: 32rpx;
				.wechat-btn{
					width: 400rpx;
					height: 68rpx;
					font-size: 26rpx;
					
				}
			}
			
			.content-image-box{
				display: flex;
				justify-content: center;
				width: 100%;
				height: 280rpx;
				padding: 32rpx;
				
				.content-image{
					display: flex;
					justify-content: center;
					border-radius: 22rpx;
					width: 100%;
					height: 280rpx;
					background-size: 100% 280rpx;
				}
			}
			
			.paragraph{
				display: flex;
				flex-direction: column;
				padding-top: 66rpx;
				padding-left: 32rpx;
				padding-right: 32rpx;
				
				.paragraph-title{
					
				}
				
				.paragraph-content{
					
				}
				
			}
			
		}
		
	}
	
</style>
