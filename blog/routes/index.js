var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//后添加
var users = {
	age: 20,
	country: 'China'
};
router.all('/user/:username', function(req, res, next) {
	console.log('all methods captured');
	next();
});
router.get('/user/:username', function(req, res,next) {
	//res.send('user: ' + req.params.username);
	users.name = req.params.username;
	res.send(users);
	next();
});

router.get('/from/:country', function(req, res,next) {
	res.send('country: ' + req.params.country);
	next();
});
//获取页面参数req.query
router.get('/test', function(req, res) {
	console.log(req.query.name);
	console.log(req.query.tel);
	res.send('name=' + req.query.name);
});

module.exports = router;
