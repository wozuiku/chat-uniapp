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
				<button class="cu-btn bg-orange lg login-btn">
					微信一键登录</button>
			</view>
		</view>
		<view class="protocol"></view>
	</view>
</template>

<script>
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

			.login-btn{
				width: 240rpx;
				height: 68rpx;
				font-size: 26rpx;
				background-color: #30BEB8;
			}
		}
	}
</style>
