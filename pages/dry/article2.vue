<template>
	<view>
	    <button @tap="addArticle">新增</button>
	    <mp-html :content="content" />
	  </view>
</template>

<script>
	export default {
		data() {
			return {
				html: '<div>Hello World!</div>',
				html_content: '<div>Hello World 4</div>',
				
				articleList:'',
				article: {},
				content: ''
			}
		},
		
		onLoad() {
		  this.init()
		  let html2 = encodeURIComponent(this.html)
		  let html3 = decodeURIComponent(html2)
		  console.log('html:', this.html);
		  console.log('html2:', html2);
		  console.log('html3:', html3);
		},

		methods: {
			init() {
				// 客户端联表查询
				const db = uniCloud.database()
				db.collection('dry-article')
					.field('article_id, html_content, order')
					.get()
					.then(res => {
						this.articleList = res.result.data
						this.content = decodeURIComponent(this.articleList[4].html_content)
						//console.log('articleList[0]:',this.articleList[0])
					}).catch(err => {
						console.error(err)
					})
			},
			
			
			addArticle(){
				this.article.article_id = '2'
				this.article.html_content = encodeURIComponent(this.html_content)
				this.article.order = '2'
				console.log('addArticle article:', this.article);
				
				const db = uniCloud.database()
				db.collection('dry-article')
				.add(this.article)
				.then(e => {
					console.log('addArticle e:', e);
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	
	.article-wrap{
		
	}
	
</style>
