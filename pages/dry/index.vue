<template>
	<view>
		<scroll-view :scroll-y="true" class="page">
			<view v-for="(typeItem, typeIndex) in typeList">
				<view class="cu-bar bg-white solid-bottom margin-top">
					<view class="action">
						<text class="cuIcon-title text-orange"></text> {{typeItem.name}}
					</view>
				</view>

				<view class="cu-list menu">
					<view class="cu-item arrow">
						<view class="content" @tap="jump">
							<text class="cuIcon-circlefill text-grey"></text>
							<text class="text-grey">图标 + 标题</text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

				typeList: [],

			}
		},

		onLoad() {
			this.init()
		},

		methods: {
			init() {
				// 客户端联表查询
				const db = uniCloud.database()
				db.collection('dry-type')
					.field('code, name, order')
					.get()
					.then(res => {
						this.typeList = res.result.data
						console.log(this.typeList)
					}).catch(err => {
						console.error(err)
					})
			},
			
			jump(){
				
				uni.navigateTo({
					url:"/pages/dry/article"
				})
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		height: 100Vh;
		width: 100vw;
	}
</style>
