/**
 * 
 * @authors Kerry W (wangxuan@eastcom-sw.com)
 * @date2016-11-01 13:32:01
 * @version $Id$
 */
var mysql= require('mysql');
var XLSX = require('xlsx');

var connection = mysql.createConnection({
	host : 'localhost', //主机
	user : 'root', //MySQL认证用户名
	password : '650600',//MySQL认证用户密码
	port: '3306' //端口号
}); 

connection.connect();
var TEST_DATABASE = 'disney';
var TEST_TABLE = 'resources';
//创建数据库
function createDB(dbName){
	var createDataBaseSql = 'CREATE DATABASE IF NOT EXISTS ' + dbName + ' CHARACTER SET UTF8'
	connection.query(createDataBaseSql, function(err) {
		if (err && err.number != mysql.ERROR_DB_CREATE_EXISTS) {
			throw err;
			return;
		}
		console.log('CREATE DB: ' + dbName + ' FINISHED');
	});
}
function deleteDB(dbName){
	var dropDataBaseSql = 'DROP DATABASE IF EXISTS ' + dbName;
	connection.query(dropDataBaseSql,function(err,result){
		if(err){
			console.log('[DROP ERROR] - ',err.message);
			return;
		}
		console.log('DROP DB: ' + dbName + ' FINISHED');
	});
}
//创建数据表
function createTable(dbName,tableName){
	deleteTable(dbName,tableName);
	connection.query('USE ' + dbName);
	var createTableSql = 'CREATE TABLE '+tableName+
		'(LACCI int(10), '+
		'HOTSPOT VARCHAR(255), '+
		'CELL_NAME VARCHAR(255), '+
		'CELL_TYPE VARCHAR(255), '+
		'LAC VARCHAR(255), '+
		'CI VARCHAR(255), '+
		'LNG VARCHAR(255), '+
		'LAT VARCHAR(255), '+
		'DIRECTION VARCHAR(255), '+
		'FRE_NUM VARCHAR(255), '+
		'PRIMARY KEY (LACCI))';
	connection.query(createTableSql,function(err,result){
		if(err){
			console.log('[CREATE ERROR] - ',err.message);
			return;
		}
		console.log('CREATE TABLE: ' + tableName + ' FINISHED');
	});
}
//删除数据表
function deleteTable(dbName,tableName){
	connection.query('USE ' + dbName);
	var dropTableSql = 'DROP TABLE IF EXISTS ' + tableName;
	connection.query(dropTableSql,function(err,result){
		if(err){
			console.log('[DROP ERROR] - ',err.message);
			return;
		}
		console.log('DROP TABLE: ' + tableName + ' FINISHED');
	});
}
//添加记录
function addRecord(dbName,tableName,dataArr){
	connection.query('USE ' + dbName);
	var userAddSql = 'INSERT INTO ' + tableName + '(LACCI,HOTSPOT,CELL_NAME,CELL_TYPE,LAC,CI,LNG,LAT,DIRECTION,FRE_NUM) VALUES(?,?,?,?,?,?,?,?,?,?)';
	var userAddSql_Params = dataArr;
	connection.query(userAddSql,userAddSql_Params,function (err, result) {
		if(err){
			console.log('[INSERT ERROR] - ',err.message);
			return;
		}
		console.log('--------------------------INSERT FINISHED----------------------------');
		console.log('INSERT ID:',result);
	});
}
//删除记录
function deleteRecord(dbName,tableName){
	connection.query('USE ' + dbName);
	var userDelSql = 'DELETE FROM ' + tableName ;
	//var userDelSql_Params = [1];
	connection.query(userDelSql,function (err, result) {
		if(err){
			console.log('[DELETE ERROR] - ',err.message);
			return;
		}
		console.log('--------------------------DELETE FINISHED----------------------------');
		console.log('DELETE ID:',result);
	});
}
//更新记录
function modifyRecord(dbName,tableName){
	connection.query('USE ' + dbName);
	var userModSql = 'UPDATE ' + tableName + ' SET name = ? WHERE Id = ?';
	var userModSql_Params = ['钟慰', 1];
	connection.query(userModSql,userModSql_Params,function (err, result) {
		if(err){
			console.log('[UPDATE ERROR] - ',err.message);
			return;
		}
		console.log('--------------------------UPDATE FINISHED----------------------------');
		console.log('UPDATE ID:',result);
	});
}
//查询记录
function queryRecord(dbName,tableName){
	connection.query('USE ' + dbName);
	var name = '迪士尼小镇和酒店';
	var userGetSql = 'SELECT * FROM ' + tableName + ' WHERE HOTSPOT=\"' + name + '\"';
	console.log(userGetSql);
	connection.query(userGetSql,function (err, result) {
		if(err){
			console.log('[QUERY ERROR] - ',err.message);
			return;
		}
		console.log('--------------------------QUERY FINISHED----------------------------');
		console.log(result);
	});
}
//读取文件夹
function readDirFile(path){
	var fs = require('fs');
	fs.readdir(path,function(err,files){
		files.map(function(fileName){
			readFile(path + '/' + fileName, fileName);
		});
	});
}
//读取文件
function readFile(path,fileName){
	var workbook = XLSX.readFile(path);
	var sheet_name_list = workbook.SheetNames;
	//用到的列号
	var colNumArr = ['A','B','C','D','E','F','G','H','I']
	var lacciVal = 0;
	sheet_name_list.map(function(sheetName){
		var worksheet = workbook.Sheets[sheetName];
		//计算总条数
		var length = 0;
		var rowBreak = 0;
		for(var z in worksheet){
			var rowNum = z.substring(1);
			if(rowNum !== rowBreak){
				length++;
				rowBreak = rowNum;
			}
		}
		var i = 2;
		while(i < length){
			var dataArr = [];
			lacciVal++;
			dataArr.push(lacciVal);
			colNumArr.map(function(field){
				if(!worksheet[field + i]) return;
				var colVal = worksheet[field + i].v;
				//if(colVal.toString().indexOf('-') != -1) colVal = 0;
				dataArr.push(colVal.toString());
			});
			i++;
			//console.log(dataArr);
			//写入数据库
			addRecord(TEST_DATABASE,TEST_TABLE,dataArr);
		}
	});
	connection.end();
}
// createDB(TEST_DATABASE);
// createTable(TEST_DATABASE,TEST_TABLE);
// addRecord(TEST_DATABASE,TEST_TABLE);
// deleteRecord(TEST_DATABASE,TEST_TABLE);
// modifyRecord(TEST_DATABASE,TEST_TABLE);
queryRecord(TEST_DATABASE,TEST_TABLE);
// deleteDB(TEST_DATABASE);
// deleteTable(TEST_DATABASE,TEST_TABLE);
// readDirFile('files');
// addRecord(TEST_DATABASE,TEST_TABLE,['12','12','12','12','12','12','12','12','12','12']);
// connection.end();


