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
						<view class="tag-item cu-tag" @tap="select_1" :style="tag_style_1">内容功能</view>
						<view class="tag-item cu-tag" @tap="select_2" :style="tag_style_2">售后服务</view>
						<view class="tag-item cu-tag" @tap="select_3" :style="tag_style_3">交易问题</view>
						<view class="tag-item cu-tag" @tap="select_4" :style="tag_style_4">其他</view>
					</view>
					
					<view class="suggestion-box">
						<textarea v-model="suggestionInfo.suggestionText" class="suggestion" placeholder="请输入您的意见反馈详情内容" maxlength=140></textarea>
					</view>
					<view class="limit-box">
						<view class="limit">
							{{wordCount}}/140
						</view>
					</view>
					
					<view class="image-box">
						<uni-file-picker  :imageStyles="imageStyles" @success="uploadSuccess" ></uni-file-picker>
					</view>
				</view>
				
				<view class="suggestion-submit-btn-box">
					<button class="cu-btn bg-orange lg suggestion-submit-btn" :loading="submitLoading" @tap="suggestionSubmit">提交</button>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	
	const db = uniCloud.database();
	const dbCmd = db.command;
	
	
	export default {
		data(){
			return {
				userInfo: {},
				
				imageStyles: {
					width: 90,
					height: 90
				},
				
				
				tag_select_1: false,
				tag_style_1: '',
				tag_select_2: false,
				tag_style_2: '',
				tag_select_3: false,
				tag_style_3: '',
				tag_select_4: false,
				tag_style_4: '',
				
				
				
				wordCount: 0,
				
				suggestionInfo: {
					userId: '',
					suggestionType: '',
					suggestionText: '',
					suggestionImages: [],
				},
				
				submitLoading: false
				
			}
		},
		
		
		onLoad(){
			this.init()
		},
		
		onShow(){
			
		},
		
		watch: {
			"suggestionInfo.suggestionText":{
				deep:false,
				handler(newVal, oldVal){
					this.wordCount = newVal.length
				}
				
				
			}
		},
		
		methods:{
			init() {
				this.userInfo = uni.getStorageSync('userInfo')
				console.log('this.userInfo:', this.userInfo);
				this.suggestionInfo.userId = this.userInfo._id
			},
			
			select_1(){
				this.suggestionInfo.suggestionType = '内容功能'
				this.tag_style_1 = "background-color: #30BEB8; color: #FFFFFF;"
				this.tag_style_2 = ""
				this.tag_style_3 = ""
				this.tag_style_4 = ""
			},
			
			select_2(){
				this.suggestionInfo.suggestionType = '售后服务'
				this.tag_style_1 = ""
				this.tag_style_2 = "background-color: #30BEB8; color: #FFFFFF;"
				this.tag_style_3 = ""
				this.tag_style_4 = ""
			},
			
			select_3(){
				this.suggestionInfo.suggestionType = '交易问题'
				this.tag_style_1 = ""
				this.tag_style_2 = ""
				this.tag_style_3 = "background-color: #30BEB8; color: #FFFFFF;"
				this.tag_style_4 = ""
			},
			
			select_4(){
				this.suggestionInfo.suggestionType = '其他'
				this.tag_style_1 = ""
				this.tag_style_2 = ""
				this.tag_style_3 = ""
				this.tag_style_4 = "background-color: #30BEB8; color: #FFFFFF;"
			},
			
			uploadSuccess(e){
				
				console.log('uploadSuccess: ', e);
				e.tempFilePaths.forEach((item, index) => {
					this.suggestionInfo.suggestionImages.push(item)
				})
				
				
			},
			
			async suggestionSubmit(){
				console.log('suggestionInfo:', this.suggestionInfo);
				
				this.submitLoading = true
				
				
				if(this.suggestionInfo.suggestionType == ''){
					uni.showToast({
						title: '请选择类型',
						icon: 'none'
					})
					
					return
				}
				if(this.suggestionInfo.suggestionText == ''){
					uni.showToast({
						title: '请填写内容',
						icon: 'none'
					})
					
					return
				}
				
				let res = await db.collection('member-suggestion').add(this.suggestionInfo)
				
				console.log('suggestionSubmit res:', res);
				
				if(res.result.code == 0){
					
					this.submitLoading = false
					
					uni.switchTab({
						url:'/pages/index/my'
					})
					
					uni.showToast({
						title: '提交成功',
						icon: 'none',
						duration: 2000
					})
					
				}
				
				
			}
			
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
