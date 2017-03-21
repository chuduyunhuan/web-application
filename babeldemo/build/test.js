/**
 * ES6练习
 * @authors Kerry W (wangxuan@eastcom-sw.com)
 * @date    2016-12-09 09:56:51
 * @version $Id$
 */
"use strict";
require('babel-polyfill');
var thunkify = require('thunkify');

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _marked = [quips].map(regeneratorRuntime.mark);

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $ = require('jquery');
var thunkify = require('thunkify');

var myClass = function () {
	function myClass(name) {
		_classCallCheck(this, myClass);

		this.name = name;
	}

	_createClass(myClass, [{
		key: 'getName',
		value: function getName() {
			return this.name;
		}
	}]);

	return myClass;
}();

var person = function (_myClass) {
	_inherits(person, _myClass);

	function person(name) {
		_classCallCheck(this, person);

		var _this = _possibleConstructorReturn(this, (person.__proto__ || Object.getPrototypeOf(person)).call(this, name));

		_this.getName();
		return _this;
	}

	_createClass(person, [{
		key: 'say',
		value: function say() {
			return '我的名字叫:' + this.name;
		}
	}, {
		key: 'getName',
		value: function getName() {
			console.log(this.name + '被重写了');
		}
	}]);

	return person;
}(myClass);

var Jack = new person('Jack');
var Hellen = new myClass('Hellen');
console.log(Hellen.getName());
//生成器generators
function quips(name) {
	return regeneratorRuntime.wrap(function quips$(_context) {
		while (1) {
			switch (_context.prev = _context.next) {
				case 0:
					_context.next = 2;
					return "你好 " + name + "!";

				case 2:
					_context.next = 4;
					return "希望你能喜欢这篇介绍ES6的译文";

				case 4:
					if (!name.startsWith("X")) {
						_context.next = 7;
						break;
					}

					_context.next = 7;
					return "你的名字 " + name + "  首字母是X，这很酷！";

				case 7:
					_context.next = 9;
					return "我们下次再见！";

				case 9:
				case 'end':
					return _context.stop();
			}
		}
	}, _marked[0], this);
}

var iter = quips("jorendorff");
console.log(iter.next());
console.log(iter.next());
// for(let val of iter) {
// 	console.log(val);
// }

//测试map是否编译
[1, 2, 43, 56, 78, 879, 9].reduce(function (val) {
	console.log(val * 2);
});

var test = Array.from('wo cao niu bi');
console.log(test);
//THUNK,异步生成器调用
function run(fn) {
	var gen = fn();

	function next(err, data) {
		var result = gen.next(data);
		console.log(data);
		if (result.done) return;
		result.value(next);
	}

	next();
}
function timer(time, callback) {
	setTimeout(callback(), time);
}
var timerDemo = thunkify(timer);
var a = 'fuck';
var testGen = regeneratorRuntime.mark(function testGen() {
	return regeneratorRuntime.wrap(function testGen$(_context2) {
		while (1) {
			switch (_context2.prev = _context2.next) {
				case 0:
					_context2.next = 2;
					return timerDemo(5000)(function () {
						a = 10;
					});

				case 2:
					_context2.next = 4;
					return timerDemo(10)(function () {
						console.log(a);
					});

				case 4:
				case 'end':
					return _context2.stop();
			}
		}
	}, testGen, this);
});
// for(let val of testGen()) {

// }
var run1 = testGen();
// run(run1);
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
	for (var _iterator = run1[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
		var val = _step.value;
	}
	// function f(a, b, callback){
	//   var sum = a + b;
	//   callback();
	// }

	// var ft = thunkify(f);
	// timerDemo(500)(() => {
	// 	a = 50;
	// 	console.log(a);
	// });
} catch (err) {
	_didIteratorError = true;
	_iteratorError = err;
} finally {
	try {
		if (!_iteratorNormalCompletion && _iterator.return) {
			_iterator.return();
		}
	} finally {
		if (_didIteratorError) {
			throw _iteratorError;
		}
	}
}