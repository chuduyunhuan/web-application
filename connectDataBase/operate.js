/**
 * 
 * @authors Kerry W (wangxuan@eastcom-sw.com)
 * @date2016-11-01 13:32:01
 * @version $Id$
 */
var mysql= require('mysql');

var connection = mysql.createConnection({
	host : 'localhost', //主机
	user : 'root', //MySQL认证用户名
	password : '650600',//MySQL认证用户密码
	port: '3306' //端口号
}); 

connection.connect();
var TEST_DATABASE = 'nodesample';
var TEST_TABLE = 'userinfo';
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
		'(id INT(11) AUTO_INCREMENT, '+
		'name VARCHAR(255), '+
		'PRIMARY KEY (id))';
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
function addRecord(dbName,tableName){
	connection.query('USE ' + dbName);
	var userAddSql = 'INSERT INTO ' + tableName + '(id,name) VALUES(?,?)';
	var userAddSql_Params = [100, 'abcd'];
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
	var userDelSql = 'DELETE FROM ' + tableName + ' where id=?';
	var userDelSql_Params = [1];
	connection.query(userDelSql,userDelSql_Params,function (err, result) {
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
	var userGetSql = 'SELECT * FROM ' + tableName;
	connection.query(userGetSql,function (err, result) {
		if(err){
			console.log('[QUERY ERROR] - ',err.message);
			return;
		}
		console.log('--------------------------QUERY FINISHED----------------------------');
		console.log(result);
	});
}
createDB(TEST_DATABASE);
createTable(TEST_DATABASE,TEST_TABLE);
// addRecord(TEST_DATABASE,TEST_TABLE);
// deleteRecord(TEST_DATABASE,TEST_TABLE);
// modifyRecord(TEST_DATABASE,TEST_TABLE);
// queryRecord(TEST_DATABASE,TEST_TABLE);
// deleteDB(TEST_DATABASE);
// deleteTable(TEST_DATABASE,TEST_TABLE);

connection.end();


