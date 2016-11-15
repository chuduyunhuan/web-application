//公共方法加载
var METHODS = require('../public/javascripts/common');
//express加载
var express = require('express');
var router = express.Router();

//首页渲染，可以忽略
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//后添加
// var users = {
// 	age: 20,
// 	country: 'China'
// };
// router.all('/user/:username', function(req, res, next) {
// 	console.log('all methods captured');
// 	next();
// });
// router.get('/user/:username', function(req, res,next) {
// 	//res.send('user: ' + req.params.username);
// 	users.name = req.params.username;
// 	res.send(users);
// 	next();
// });

// router.get('/from/:country', function(req, res,next) {
// 	res.send('country: ' + req.params.country);
// 	next();
// });
// //获取页面参数req.query,req.body获取post提交的内容
// router.get('/test', function(req, res) {
// 	console.log(req.query.name);
// 	console.log(req.query.tel);
// 	res.send('name=' + req.query.name);
// });

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
var COMMON_VARIABLE = {
	defaultDB: 'disney',
	defaultTable: 'resources'
};
//迪士尼基站小区相关接口
router.get('/disney/resources',function(req,res,next){
	var hotSpot = decodeURIComponent(req.query.hotSpot);
	var tableName = COMMON_VARIABLE.defaultTable;
	var dbName = COMMON_VARIABLE.defaultDB;
	var connection = connectDB();
	var querySql = 'SELECT * FROM ' + tableName + ' WHERE HOTSPOT=\"' + hotSpot + '\"';
	var callback = function (err, result) {
		if(err){
			console.log('[QUERY ERROR] - ',err.message);
			res.send(err);
			return;
		}
		console.log('-------------------------------QUERY FINISHED-------------------------------');
		// console.log(result);
		res.send(result);
	};
	queryRecord(dbName,connection,querySql,callback);
});
router.get('/disney/resources/hotspots',function(req,res,next){
	var connection = connectDB();
	var tableName = COMMON_VARIABLE.defaultTable;
	var dbName = COMMON_VARIABLE.defaultDB;
	
	var querySql = 'SELECT HOTSPOT FROM ' + tableName;
	var callback = function(err,result){
		if(err){
			console.log('[QUERY ERROR] - ',err.message);
			res.send(err);
			return;
		}
		console.log('--------------------------QUERY FINISHED----------------------------');
		var temArr = JSON.stringify(result);
		// res.send(METHODS.unique(JSON.parse(temArr),'HOTSPOT'));
		res.send(JSON.parse(temArr).unique('HOTSPOT'));
	};
	queryRecord(dbName,connection,querySql,callback);
});

//geolocation的相关接口
router.post('/shanghai/civicism/insert',function(req,res,next){
	var tableName = 'address';

	var result = req.body;
	var dataArr;
	for(var name in result){
		dataArr = JSON.parse(name);
	}
	// console.log(dataArr);
	var connection = connectDB();
	var insertSql = 'INSERT INTO ' + tableName + '(name,address) VALUES ?';
	var callback = function(err,result){
		if(err){
			console.log('[QUERY ERROR] - ',err.message);
			res.send(err);
			return;
		}
		console.log('--------------------------INSERT FINISHED----------------------------');
		res.send(dataArr);
	};
	addRecord(connection,insertSql,[dataArr],callback);
});
router.get('/civicism/address',function(req,res,next){
	var type = decodeURIComponent(req.query.type);
	var tableName = 'address';
	var dbName = 'civicism';
	var connection = connectDB();
	var querySql = 'SELECT * FROM ' + tableName + ' WHERE TYPE=\"' + type + '\"';
	var callback = function (err, result) {
		if(err){
			console.log('[QUERY ERROR] - ',err.message);
			res.send(err);
			return;
		}
		console.log('-------------------------------QUERY FINISHED-------------------------------');
		// console.log(result);
		res.send(result);
	};
	queryRecord(dbName,connection,querySql,callback);
});
function connectDB(){
	var mysql= require('mysql');
	var connection = mysql.createConnection({
		host : 'localhost', //主机
		user : 'root', //MySQL认证用户名
		password : '650600',//MySQL认证用户密码
		port: '3306' //端口号
	}); 
	return connection;
}
function queryRecord(dbName,connection,userGetSql,fn){
	connection.query('USE ' + dbName);
	connection.query(userGetSql,fn);
	connection.end();
}
//添加记录
function addRecord(connection,userAddSql,userAddSql_Params,fn){
	var dbName = 'civicism';
	connection.query('USE ' + dbName);
	connection.query(userAddSql,userAddSql_Params,fn);
	connection.end();
}
module.exports = router;
