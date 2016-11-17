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
//百度地图切片下载
function downloadMap(x,y,z){
	var url = 'http://online1.map.bdimg.com/tile/';
	superagent.get(url)
		.query({qt: 'tile'})
		.query({styles: 'pl'})
		.query({x: x})
		.query({y: y})
		.query({z: z})
		.end(function(err, result) {
			if (err) {
				console.log('err:', err);
				return;
			}
			saveFile(result);
		});
}
function saveFile(result){
	var fs = require('fs');
	mkdirSync('test',0);

	fs.writeFile('test' + '/' + 'baidu.json', JSON.stringify(result), 'binary', function(err){
		if(err){
			console.log("down fail");
			return;
		}
		console.log("down success");
	});
	//创建文件夹,允许重复创建
	function mkdirSync(url,mode,cb){
		var arr = url.split("/");
		mode = mode || 0755;
		cb = cb || function(){};
		if(arr[0]==="."){
			arr.shift();
		}
		if(arr[0] == ".."){
			arr.splice(0,2,arr[0]+"/"+arr[1])
		}
		function inner(cur){
			if(!fs.existsSync(cur)){
				fs.mkdirSync(cur, mode);
			}
			if(arr.length){
				inner(cur + "/"+arr.shift());
			}else{
				cb();
			}
		}
		arr.length && inner(arr.shift());
	}
}
// downloadMap(1645,436,13);
module.exports = router;
