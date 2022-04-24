'use strict';

const appid = 'wx1661376701ddbb9a'
const secret = '6e2daeeb7d96e93729263fbd5565e956'

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const js_code = event.js_code
	
	
	console.log('js_code : ', js_code)
	
	const url =
		'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + js_code
	const requestOptions = {
		method: "post",
		dataType: 'json',
		header:{
			"Content-Type": "application/x-www-form-urlencoded"
		}
	}
	
	const res = await uniCloud.httpclient.request(url, requestOptions)
	
	console.log('res : ', res)
	
	//返回数据给客户端
	return res
};
