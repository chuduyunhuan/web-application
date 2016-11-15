/**
 * 公共方法
 * @authors Kerry W (wangxuan@eastcom-sw.com)
 * @date    2016-11-04 17:09:05
 * @version $Id$
 */

 //对象数组去重
 Array.prototype.unique = function(field){
 	var n = {},r=[]; //n为hash表，r为临时数组
 	for(var i = 0, len = this.length; i < len; i++){
 		if (!n[this[i][field]]){
 			n[this[i][field]] = true; //存入hash表
 			r.push(this[i][field]); //把当前数组的当前项push到临时数组里面
 		}
 	}
 	return r;
 };
 exports.unique = function(arr,field){
 	var n = {},r=[]; //n为hash表，r为临时数组
 	for(var i = 0, len = arr.length; i < len; i++){
 		if (!n[arr[i][field]]){
 			n[arr[i][field]] = true; //存入hash表
 			r.push(arr[i][field]); //把当前数组的当前项push到临时数组里面
 		}
 	}
 	return r;
 }
 //设置时间
 function date2str(x,y) {
	var z = {M:x.getMonth()+1,d:x.getDate(),h:x.getHours(),m:x.getMinutes(),s:x.getSeconds()};
	y = y.replace(/(M+|d+|h+|m+|s+)/g,function(v) {return ((v.length>1?"0":"")+eval('z.'+v.slice(-1))).slice(-2)});
	return y.replace(/(y+)/g,function(v) {return x.getFullYear().toString().slice(-v.length)});
 }
 exports.printTime = function(){
 	var myDate = new Date();
 	var result = date2str(myDate,'yyyy-MM-dd hh:mm:ss');
 	console.log('-------------------------------START NEW QUERY-------------------------------');
 	console.log('查询时间: ' + result);
 };