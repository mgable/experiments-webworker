var express = require('express'),
	fs = require("fs");


var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/tasks', function(req, res, next) {
	res.render('index', { title: 'tasks engine' });
});

router.post('/tasks', function(req, res, next) {
	try{
	res.contentType("application/json; charset=UTF-8");
	fs.writeFileSync(__dirname + "/../data/test.json", JSON.stringify(req.body) ,'utf8')
	res.send({"hello": "world"});
}catch(e){console.error(e);}
});

module.exports = router;
