/**
 * 代理接口
 * @authors Kerry W (wangxuan@eastcom-sw.com)
 * @date    2016-11-11 16:51:07
 * @version $Id$
 */

 //公共方法加载
 var METHODS = require('../public/javascripts/common');

 var express = require('express');
 var router = express.Router();
 var superagent = require('superagent');
 

 //CORS跨域
 router.all('*',function (req, res, next) {
 	res.header('Access-Control-Allow-Origin', '*');
 	res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
 	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
 	// console.log('all methods captured');
 	METHODS.printTime();
 	if (req.method == 'OPTIONS') {
 		//让options请求快速返回
 		res.send(200);
 	}
 	else {
 		next();
 	}
 });
//代理百度地址编码接口
router.get('/baidu/geolocation', function(req, res, next) {
	var city = decodeURIComponent(req.query.city),
		address = decodeURIComponent(req.query.address),
		sk = '21qSfheyMUwsE7qVSRUOvqLh1fHX1GaE';
	superagent.get('http://api.map.baidu.com/geocoder/v2/')
		.query({city: city})
		.query({address: address})
		.query({output: 'json'})
		.query({ak: sk})
		.end(function(err, result) {
			if (err) {
				console.log('err:', err);
				res.send(err);
				return;
			}
			res.send(JSON.parse(result.text));
		});
});
//代理移动服务器,测试用
router.get('/services/ws/fast_query/area/re/re_cellByHotname',function(req,res,next){
	var hotSpot = decodeURIComponent(req.query.hotspot);
	superagent.get('http://10.221.247.7:8080/services/ws/fast_query/area/re/re_cellByHotname')
		.query({hotspot: hotSpot})
		.end(function(err,result){
			if (err) {
				console.log('err:', err);
				res.send(err);
				return;
			}
			res.send(JSON.parse(result.text));
		});
});
 module.exports = router;
