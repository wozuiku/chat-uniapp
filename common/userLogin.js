const db = uniCloud.database();
const dbCmd = db.command;

export default async function() {

	console.log('userLogin.js')


	uni.login({
		//provider: 'weixin',
		success: async function(loginRes) {
			console.log('loginRes:', loginRes);
			let js_code = loginRes.code
			console.log('js_code:', js_code);
			
			let callFuncRes = await uniCloud.callFunction({
				name: 'user-login',
				data: {
					js_code: js_code
				}
			})
			
			console.log('callFuncRes:', callFuncRes);
			
			let openid = callFuncRes.result.data.openid
			let session_key = callFuncRes.result.data.session_key
			
			uni.setStorageSync('openid', openid)
			uni.setStorageSync('session_key', session_key)
			
			let memberList = await getMember(openid)
			let memberCount = memberList.length
			console.log('memberCount:', memberCount);
			
			//如果数据库不存在该用户openid，说明是第一次登录
			if(memberCount == 0){
				console.log('不存在');
				//跳转到授权登录页面
				uni.navigateTo({
					url: '/pages/login/login'
				})
			}else{
				let member = memberList[0]
				uni.setStorageSync('userInfo', member)
			}
			
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
