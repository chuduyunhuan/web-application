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
 // router.all('*',function (req, res, next) {
 // 	res.header('Access-Control-Allow-Origin', '*');
 // 	res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
 // 	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
 // 	// console.log('all methods captured');
 // 	METHODS.printTime();
 // 	if (req.method == 'OPTIONS') {
 // 		//让options请求快速返回
 // 		res.send(200);
 // 	}
 // 	else {
 // 		next();
 // 	}
 // });
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
//代理聚合API接口
router.get('/juhe/civicism', function(req, res, next) {
	var name = decodeURIComponent(req.query.name),
		type = decodeURIComponent(req.query.type),
		sk = '62318d50db80483fc33977c90a1ab604';
	superagent.get('http://op.juhe.cn/shanghai/' + name)
		.query({key: sk})
		.end(function(err, result) {
			if (err) {
				console.log('err:', err);
				res.send(err);
				return;
			}
			res.send(JSON.parse(result.text));
		});
});

//代理移动数据管理
router.get('/INAS/sml/query/lsc-cfg-kpiCalculater', function(req, res, next) {
	superagent.get('http://10.221.247.7:8080/INAS/sml/query/lsc-cfg-kpiCalculater')
		.end(function(err, result) {
			if (err) {
				console.log('err:', err);
				res.send(err);
				return;
			}
			res.send(JSON.parse(result.text));
		});
});
router.post('/INAS/sml/query/lsc-cfg-kpiTrend',function(req,res,next){
	var paras = req.body;
	superagent.post('http://10.221.247.7:8080/INAS/sml/query/lsc-cfg-kpiTrend')
		.send(paras)
		.set('Accept', 'application/json')
		.end(function(err,result){
			if (err) {
				console.log('err:', err);
				res.send(err);
				return;
			}
			res.send(JSON.parse(result.text));
		});
});
//测试INAS依赖
router.post('/INAS/loginExtension/getCurrentUserTreeResources',function(req,res,next){
	var paras = JSON.stringify(req.body);
	superagent.post('http://10.221.247.7:8080/INAS/pages/login.jsp?userName=f44c493daf75554ce0126ea66e6971cd')
		.end(function(errLogin,resultLogin){
			if(errLogin){
				console.log('err:', errLogin);
				res.send(errLogin);
				return;
			}
			// res.send(resultLogin);
			superagent.post('http://10.221.247.7:8080/INAS/loginExtension/getCurrentUserTreeResources')
				.send(paras)
				.set('Accept', 'application/json')
				.end(function(err,result){
					if (err) {
						console.log('err:', err);
						res.send(err);
						return;
					}
					res.send(JSON.parse(result.text));
				});
		});
});
//修改用户密码
router.post('/sml/update/inas-cfg-pwd-update',function(req,res,next){
	var paras = req.body;
	superagent.post('http://10.221.235.17:8080/INAS/sml/update/inas-cfg-pwd-update')
		.send(paras)
		.set('Accept', 'application/json')
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
