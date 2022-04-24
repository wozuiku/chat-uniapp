'use strict';

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const js_code = event.js_code
	
	//返回数据给客户端
	return event
};
