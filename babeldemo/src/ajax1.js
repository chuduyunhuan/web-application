/**
 * 
 * @authors Kerry W (wangxuan@eastcom-sw.com)
 * @date    2016-12-13 11:12:58
 * @version $Id$
 */
 "use strict";
 // function callAjax(url, callback) {
 //     $.ajax({
 //         url: url,
 //         type: 'get'
 //     })
 //         .done(data => {
 //             callback(data);
 //         });
 // }
 // var commonAjax = thunkify(callAjax);
 // function timer(time, callback) {
 // 	setTimeout(callback(), time);
 // }
 // var timerDemo = thunkify(timer);
 // var gen = function* () {
	// var url = 'http://10.221.247.7:8080/services/ws/fast_query/area/re/re_cellByHotname?hotspot=' + encodeURIComponent('迪士尼');
	// var heatMap = [];
	// yield commonAjax(url) (data => {
	// 	// setTimeout(function() {
	// 		heatMap = heatMap.concat(data);
	// 		console.log(heatMap);
	// 	// }, 1000);
	// });
	// yield timerDemo(10)(() => {
	// 	console.log(heatMap);
	// });
 // };
 // co(gen);
 // for(let val of gen()) {}
 // var run1 = gen();
 // run1.next();
 // run1.next();
 //async方式同步
async function ajax() {
	var url = 'http://10.221.247.7:8080/services/ws/fast_query/area/re/re_cellByHotname?hotspot=' + encodeURIComponent('迪士尼');
	var data = await $.ajax({
		url: url,
		type: 'get'
	 });
	console.log(data);
	return data;
}
var data = ajax();
console.log(data);
// const ajax = createAsyncFunction(function* () {
// 	var url = 'http://10.221.247.7:8080/services/ws/fast_query/area/re/re_cellByHotname?hotspot=' + encodeURIComponent('迪士尼');
// 	// var heatMap = [];
// 	// var commonAjax = $.ajax({
// 	// 	url: url,
// 	// 	type: 'get'
// 	// })
// 	// 	.done(data => {
// 	// 		heatMap = heatMap.concat(data);
// 	// 	});
// 	// yield commonAjax;
// 	var heatMap = yield $.ajax({
// 		url: url,
// 		type: 'get'
// 	});
// 	console.log(heatMap);
// 	return heatMap;
// });
// var data = ajax();
// // console.log(data);