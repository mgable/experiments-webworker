var express = require('express'),
	fs = require("fs"),
	_ = require('underscore');

var status = "waiting",
	activeTask = null,
	completedTasks = [];

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/tasks', function(req, res, next) {
	console.log("hello");
	res.render('index', { title: 'tasks engine' });
});

router.post('/tasks', function(req, res, next) {
	try {
	console.log("the headers");
	console.log(JSON.stringify(req.headers));


	var taskNo = req.body.taskNumber,
		timeout = parseInt(req.body.time) * 1000 * 60;

	if (status === "waiting" && _canRunThisTask(req.headers["x-aws-sqsd-attr-pre-requisites"])){
		
		activeTask =  taskNo;
		//status = "busy";
		res.contentType("application/json; charset=UTF-8");
		try {
			fs.writeFileSync(__dirname + "/../data/test_" + taskNo + ".json", JSON.stringify(req.body) ,'utf8');
		}catch(e){console.error(e);}
		res.send({"status": "processing job " + activeTask});
		completedTasks.push(taskNo);
		console.info("the complete tasks are now");
		console.info(completedTasks);
	} else {
		console.log("waiting to stark task: " + taskNo + " because I am busy with job: " +  activeTask)
		res.status(404).send({"status":"Current busy with " + taskNo + ". Please try again later . . ."});
	}

	//setTimeout(function(){status = "waiting"}, timeout);
}catch(e){console.info("there was an error");console.error(e)}

});

function _canRunThisTask(prereq){
	console.info("checking to see if I can run this task");
	console.info(prereq);
	if (!prereq) {
		console.info("no prereq - can run");
		return true
	} else {
		if (_.indexOf(completedTasks, prereq) > -1){
			console.info("prereq satisfied can run");
			return true
		} else {
			console.info("still waiting for " + prereq);
			return false;
		}
	}
}

module.exports = router;
