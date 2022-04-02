const db = uniCloud.database();
const dbCmd = db.command;

export default async function() {

	console.log('userLogin.js')


	uni.login({
		//provider: 'weixin',
		success: function(loginRes) {
			console.log('loginRes:', loginRes);
			let js_code = loginRes.code
			console.log('js_code:', js_code);
			
			uni.request({
				url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx1661376701ddbb9a&secret=6e2daeeb7d96e93729263fbd5565e956&js_code='+js_code,
				header:{
					"Content-Type": "application/x-www-form-urlencoded"
				},
				method: "post",
				success: async function(weixinRes){
					console.log('weixinRes:', weixinRes);
					uni.setStorageSync('openid', weixinRes.data.openid)
					uni.setStorageSync('session_key', weixinRes.data.session_key)
					
					let memberList = await getMember(weixinRes.data.openid)
					let memberCount = memberList.length
					console.log('memberCount2:', memberCount);
					
					//如果数据库不存在该用户openid，说明是第一次登录
					if(memberCount == 0){
						console.log('不存在');
						//跳转到授权登录页面
						uni.navigateTo({
							url: '/pages/login/login'
						})
					}else{
						let member = memberList[0]
						uni.setStorageSync('memberInfo', member)
					}
				}
				
			})
			
			
		}
	});

}

async function getMember(openid) {
	console.log('isMemberExists');
	console.log('openid:', openid);
	let dbRes = {}, memberList = []
	dbRes = await db.collection('chat-member').where('openid == "' + openid + '"').get()
	memberList = dbRes.result.data
	console.log('dbRes:', dbRes);
	console.log('memberList:', memberList);
	return memberList
}
