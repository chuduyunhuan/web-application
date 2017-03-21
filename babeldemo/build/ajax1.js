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

var ajax = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var url, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = 'http://10.221.247.7:8080/services/ws/fast_query/area/re/re_cellByHotname?hotspot=' + encodeURIComponent('迪士尼');
            _context.next = 3;
            return $.ajax({
              url: url,
              type: 'get'
            });

          case 3:
            data = _context.sent;

            console.log(data);
            return _context.abrupt('return', data);

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function ajax() {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var data = ajax();
// console.log(data);
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
