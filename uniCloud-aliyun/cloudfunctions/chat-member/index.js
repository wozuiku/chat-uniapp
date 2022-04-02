'use strict';

const appid = 'wx1661376701ddbb9a'
const secret = '6e2daeeb7d96e93729263fbd5565e956'

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	
	let obj = {}
	
	const code = event
	
	const URL =
		`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`
	const requestOptions = {
		method: 'GET',
		dataType: 'json'
	}
	
	const res = await uniCloud.httpclient.request(URL,requestOptions)
	
	obj.code = event
	obj.res = res
	
	
	//返回数据给客户端
	return obj
};
