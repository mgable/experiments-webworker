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
	console.info("I received some data");
	console.info(JSON.stringify(req.body));
	res.contentType("application/json; charset=UTF-8");
	try {
		fs.writeFileSync(__dirname + "/../data/test.json", JSON.stringify(req.body) ,'utf8');
	}catch(e){console.error(e);}
	res.send({"hello": "world"});

});

module.exports = router;
