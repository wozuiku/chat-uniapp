<template>
	<view>
		<view class="ad">
			<view class="ad-swiper">
				<u-swiper :list="adList"></u-swiper>
			</view>
		</view>
		<view class="search">
			<view class="search-box">
				<view class="search-inner">
					<u-icon name="search" color="#909399" :size="28"></u-icon>
					<input class="search-text" type="text" placeholder="输入女生说的话，获取高情商回复" @focus="jump"></input>
				</view>
			</view>
			<!-- <view class="tag-box">
				<view class="tag-title">
					热门搜索：
				</view>
				<view class="tag-items">
					<view class='cu-tag line-orange round sm'>交费</view>
					<view class='cu-tag line-orange round sm'>交费</view>
					<view class='cu-tag line-orange round sm'>办电</view>
					<view class='cu-tag line-orange round sm'>办电</view>
					<view class='cu-tag line-orange round sm'>查询</view>
					<view class='cu-tag line-orange round sm'>查询</view>
				</view>
			</view> -->
		</view>

		<view class="chat">
			<!-- <unicloud-db v-slot:default="{data, loading, error, options}" collection="chat-cate">
				<view v-if="error">{{error.message}}</view>
				<view v-else>
					<view v-for="item in data">
						<view class="cu-bar bg-white solid-bottom">
							<view class='action'>
								<text class='cuIcon-title' style="color: #30BEB8;"></text>{{item.name}}
							</view>
						</view>
						<view class='padding-sm flex flex-wrap bg-white'>
							<view class="padding-xs" v-for="(item1,index1) in ColorList" :key="index1"
								v-if="item1.name!='white'">
								<view class='cu-tag line-orange round' style="color: #F889AB;">{{item1.title}}</view>
							</view>
						</view>
					</view>
				</view>
			</unicloud-db> -->
			
			<view v-for="cate in chatList">
				<view class="cu-bar bg-white solid-bottom">
					<view class='action'>
						<text class='cuIcon-title' style="color: #30BEB8;"></text>{{cate.name}}
					</view>
				</view>
				<view class='padding-sm flex flex-wrap bg-white'>
					<view class="padding-xs" v-for="(item,index) in cate.code" :key="index">
						<view class='cu-tag line-orange round' style="color: #F889AB;" @click = "show_type(item)">{{item.name}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				adList: [{
						id: 0,
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						id: 1,
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						id: 2,
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				],

				ColorList: [{
						title: '嫣红嫣红嫣红嫣红嫣红11',
						name: 'red',
						color: '#e54d42'
					},
					{
						title: '桔橙',
						name: 'orange',
						color: '#f37b1d'
					},
					{
						title: '明黄',
						name: 'yellow',
						color: '#fbbd08'
					},
					{
						title: '橄榄',
						name: 'olive',
						color: '#8dc63f'
					},
					{
						title: '森绿',
						name: 'green',
						color: '#39b54a'
					},
					{
						title: '天青',
						name: 'cyan',
						color: '#1cbbb4'
					},
					{
						title: '海蓝',
						name: 'blue',
						color: '#0081ff'
					},
					{
						title: '姹紫',
						name: 'purple',
						color: '#6739b6'
					},
					{
						title: '木槿',
						name: 'mauve',
						color: '#9c26b0'
					},
					{
						title: '桃粉',
						name: 'pink',
						color: '#e03997'
					},
					{
						title: '棕褐',
						name: 'brown',
						color: '#a5673f'
					},
					{
						title: '玄灰',
						name: 'grey',
						color: '#8799a3'
					},
					{
						title: '草灰',
						name: 'gray',
						color: '#aaaaaa'
					},
					{
						title: '墨黑',
						name: 'black',
						color: '#333333'
					},
					{
						title: '雅白',
						name: 'white',
						color: '#ffffff'
					},
				],
				chatList:[]
			}
		},

		onLoad() {
			this.init()
		},

		methods: {
			init(){
				// 客户端联表查询
				const db = uniCloud.database()
				db.collection('chat-cate,chat-type')
					.field('code, name, category{code, name}')
					.get()
					.then(res => {
						this.chatList = res.result.data
						console.log(this.chatList)
					}).catch (err => {
					console.error(err)
				})
			},

			jump(){
				console.log('jump');
				uni.navigateTo({
					url: '/pages/chat/search/search'
				});
			},
			
			show_type(item){
				console.log(item);
				uni.navigateTo({
					url: '/pages/chat/type/type?code='+item.code + '&name='+item.name
				})
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ad {
		padding: 12rpx;
		.ad-title {
			display: flex;
			justify-content: space-between;
			.ad-title-left {
				font-weight: 900;
				color: #5D5D5D;
				font-size: 30rpx;
			}
			.ad-title-right {
				color: #C9C9CB;
				font-size: 26rpx;
			}
		}

		.ad-swiper {
			margin-top: 20rpx;
		}
	}

	.search {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 140rpx;
		
		.search-box {
			height: 160rpx;
			padding-left: 32rpx;
			padding-right: 32rpx;
			padding-top: 48rpx;
			padding-bottom: 12rpx;
			background-color: #FFF;
			//background-color: #007AFF;

			.search-inner {
				background-color: #f2f2f2;
				border-radius: 100rpx;
				display: flex;
				//justify-content: center;
				align-items: center;
				padding: 10rpx 16rpx;
				height: 68rpx;
			}

			.search-text {
				width: 100%;
				font-size: 26rpx;
				color: $u-tips-color;
				margin-left: 10rpx;
			}
		}

		.tag-box {
			display: flex;
			padding-left: 12rpx;
			padding-bottom: 12rpx;
			background-color: #FFF;

			.tag-title {
				display: flex;
				justify-content: center;
				align-items: center;
				padding-left: 20rpx;
				font-size: 24rpx;
				height: 60rpx;
				line-height: 60rpx;
			}

			.tag-items {
				display: flex;
				flex-wrap: wrap;
				align-items: center;
			}
			//padding: 20rpx;
		}
	}
</style>
