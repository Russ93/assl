// runs node to restart itself when the file is saved
// node-dev app.js 

// --------------- Imports
var express = require('express');
var http = require('http');

// --------------- Instances and syncs
var app = express()
var httpServer = http.createServer(app);

// --------------- Set ejs as your render engine
app.set('view engine', 'ejs')

// --------------- Mongo Connection
var databaseUrl = "mydb"; // "username:password@example.com/mydb"
var collections = ["users", "reports"]
var db = require("mongojs").connect(databaseUrl, collections);

// --------------- Sessions
app.use(express.cookieSession());

// --------------- Pull the post request
app.use(express.bodyParser());

// --------------- Static directories
app.use(express.directory('public'))

// --------------- Routes
app.get('/', function(req, res){
	res.send('<form method="post" action="/login"><input name="msg" type="text" /><button>Send</button></form>');
})

// --------------- Rendering agent
app.get('/', function(req, res){
	res.render('index', { title: 'The index page!' })
})

// --------------- Find using Mongo
app.get('/getUsers', function(req, res){
	db.find({name:'Russell Schlup'}, function(err, results){
		res.send(results)
	});
})

// --------------- Update using Mongo
app.get('/save', function(req, res){
	db.findOne({name:'Russell Schlup'}, function(err, result){
		result.name = "Whatever";
		result.save(function(err, results){});
	});
})

// --------------- POST request
app.post('/login', function(req, res){
	// req.body.username
	res.send(req.body.msg)
	res.send("hello")
	// res.send('hello world');
})

// --------------- GET request
app.get('/login', function(req, res){
	res.send(req.query.hello)
})

// --------------- URL params
app.get('/users/:id', function(req, res){
	res.send(req.params.id);
})

// --------------- 404 Pages
app.get('/*', function(req, res){
	res.send('404')
	// res.location()
})

// --------------- Choosing your port
httpServer.listen(3000, function() {
	console.log('Express server listening on port 3000');
});

// ---------------  ---------------//