<template>
	<view>
		
		<scroll-view scroll-y="true" >
			<view class="suggestion-wrap">
				<view class="prompt-text">
					为更好解决您的意见或反馈，请您务必选择类型，并详细描述
					反馈内容。
				</view>
				<view class="suggestion-content">
					<view class="type-title">类型</view>
					<view class="type-tag">
						<view class="tag-item cu-tag">功能异常</view>
						<view class="tag-item cu-tag">产品体验</view>
						<view class="tag-item cu-tag">交易问题</view>
						<view class="tag-item cu-tag">其他</view>
					</view>
					
					<view class="suggestion-box">
						<textarea class="suggestion" placeholder="请输入您的意见反馈详情内容" maxlength=140></textarea>
					</view>
					<view class="limit-box">
						<view class="limit">
							0/140
						</view>
					</view>
					
					<view class="image-box">
						<uni-file-picker  :imageStyles="imageStyles"></uni-file-picker>
					</view>
				</view>
				
				<view class="suggestion-submit-btn-box">
					<button class="cu-btn bg-orange lg suggestion-submit-btn " @tap="suggestionSubmit">提交</button>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				imageStyles: {
					width: 90,
					height: 90
				},
			}
		},
		
		
		onLoad(){
			
		},
		
		onShow(){
			
		},
		
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>
	.suggestion-wrap{
		display: flex;
		flex-direction: column;
		.prompt-text{
			padding: 22rpx;
			font-size: 26rpx;
			font-weight: 400;
			color: #999999;
		}
		
		.suggestion-content{
			display: flex;
			flex-direction: column;
			width: 100%;
			//height: 760rpx;
			background: #FFFFFF;
			
			.type-title{
				padding-top: 36rpx;
				padding-left: 22rpx;
				font-size: 32rpx;
				font-weight: 400;
				color: #333333;
			}
			
			.type-tag{
				display: flex;
				padding-top: 16rpx;
				padding-left: 22rpx;
				font-size: 26rpx;
				font-weight: 400;
				color: #666666;
				.tag-item{
				}
			}
			
			.suggestion-box{
				width: 100%;
				padding-top: 36rpx;
				padding-bottom: 36rpx;
				padding-left: 22rpx;
				padding-right: 22rpx;
				//background-color: #007AFF;
				
				.suggestion{
					width: 100%;
					height: 320rpx;
					font-size: 26rpx;
					font-weight: 400;
					color: #999999;
				}
				
			}
			
			.limit-box{
				width: 100%;
				height: 48rpx;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				.limit{
					padding-right: 22rpx;
					font-size: 26rpx;
					font-weight: 400;
					color: #999999;
				}
			}
			
			.image-box{
				width: 100%;
				//height: 180rpx;
				background-color: #FFF;
				padding: 22rpx;
				
			}
			
		}
		
		.suggestion-submit-btn-box{
			display: flex;
			justify-content: center;
			padding-top: 80rpx;
			padding-left: 22rpx;
			padding-right: 22rpx;
			
			.suggestion-submit-btn{
				
				width: 480rpx;
				height: 80rpx;
				font-size: 26rpx;
				background-color: #30BEB8;
			}
		}
		
	}
</style>
