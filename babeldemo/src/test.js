/**
 * ES6练习
 * @authors Kerry W (wangxuan@eastcom-sw.com)
 * @date    2016-12-09 09:56:51
 * @version $Id$
 */
 "use strict";
 var $ = require('jquery');
 var thunkify = require('thunkify');
class myClass {
	constructor(name) {
		this.name = name;
	}
	getName() {
		return this.name;
	}
}
class person extends myClass {
	constructor(name) {
		super(name);
		this.getName();
	}
	say() {
		return '我的名字叫:' + this.name;
	}
	getName() {
		console.log(this.name + '被重写了');
	}
}

const Jack = new person('Jack');
const Hellen = new myClass('Hellen');
console.log(Hellen.getName());
//生成器generators
function* quips(name) {
	yield "你好 " + name + "!";
	yield "希望你能喜欢这篇介绍ES6的译文";
	if (name.startsWith("X")) {
		yield "你的名字 " + name + "  首字母是X，这很酷！";
	}
	yield "我们下次再见！";
}

var iter = quips("jorendorff");
console.log(iter.next());
console.log(iter.next());
// for(let val of iter) {
// 	console.log(val);
// }



const test = Array.from('wo cao niu bi');
console.log(test);
//THUNK,异步生成器调用
function timer(time, callback) {
	setTimeout(callback(), time);
}
var timerDemo = thunkify(timer);
var a = [];
var testGen = function* (){
	yield timerDemo(5000)(() => {
		a.push(23);
		a.push(343);
		a.push('fdsdf');
		a.push({name: 'ewre', val: 'sfdsd', sex: {name: 'guess'}});
	});
	yield timerDemo(10)(() => {
		console.log(a);
	});
}

var run1 = testGen();
run1.next();
run1.next();
// for(let val of run1) {
	
// }






