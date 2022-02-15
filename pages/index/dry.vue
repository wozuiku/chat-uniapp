<template>
	<view>
		<scroll-view :scroll-y="true" class="page">
			<view v-for="(typeItem, typeIndex) in typeList">
				<view class="cu-bar bg-white solid-bottom margin-top">
					<view class="action">
						<text class="cuIcon-title text-orange"></text> {{typeItem.name}}
					</view>
				</view>

				<view class="cu-list menu" v-for="(articleItem, articleIndex) in typeItem.code">
					<view class="cu-item arrow" @tap="jump(articleItem._id)">
						<view class="content">
							<text class="cuIcon-tagfill text-grey"></text>
							<text class="text-grey">{{articleItem.title}}</text>
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
				const type = db.collection('dry-type').field('code, name').getTemp() 
				const article = db.collection('dry-article').field('_id, article_type, title').getTemp()
				db.collection(type, article) // 注意collection方法内需要传入所有用到的表名，用逗号分隔，主表需要放在第一位
				  .get()
				  .then(res => {
				    console.log(res);
					this.typeList = res.result.data
				  }).catch(err => {
				    console.error(err)
				  })
				
				// db.collection('dry-type')
				// 	.field('code, name, order')
				// 	.get()
				// 	.then(res => {
				// 		this.typeList = res.result.data
				// 		console.log(this.typeList)
				// 	}).catch(err => {
				// 		console.error(err)
				// 	})
			},
			
			jump(articleId){
				
				uni.navigateTo({
					url:"/pages/dry/article?articleId=" + articleId
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
