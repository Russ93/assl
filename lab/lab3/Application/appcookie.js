var express = require('express');
var http = require('http');
var uuid = require('node-uuid');
var Hashids = require('hashids');
var MongoStore = require('connect-mongo')(express);

var sessionStore = MongoStore({
	'db':'mongosession',
	'auto_reconnect': true
})

hashids = new Hashids('hello');


var collections = ["users", "docs"]
var db = require("mongojs").connect("mongodb://localhost/docs", collections);

var app = express()
var httpServer = http.createServer(app);

// Set ejs as your render engine
app.set('view engine', 'ejs')

// Mongo model

// Pull the post request
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use('/views', express.static('/views'));
app.use(express.static('public'))
app.use(express.session({
	'secret': 'doclove',
	'store': sessionStore
}))

// Index
app.get('/', function(req, res){
	// res.send(req.signedCookies.id)
	if(!!req.cookies.id){
		db.docs.findOne({userId:req.cookies.id},function(err, result){
			if(!!result){
				res.redirect("/docz/"+result.id)
			}else{
				res.redirect("/docz")
			}
		})
	}else{
		res.render('index', {error:'', signerror:''})
	}
})

// POST request
app.post('/login', function(req, res){
	db.users.findOne({username:req.body.username},function(err, result){
		if(!!result){
			var uid = result.id
			res.cookie('id', result.id)
			res.cookie('name', result.name)
			res.redirect("/")
		}else{
			res.render('index', {error:'Username or Password is incorrect', signerror:''})
		}
	})
})

app.get('/signout', function(req, res){
	res.clearCookie('id')
	res.redirect("/")
})

app.post('/signup', function(req, res){
	var nu = {
		id: uuid.v4(),
		type: 'user',
		created: JSON.stringify(Date.now()),
		name: req.body.name,
		username: req.body.username,
		password: req.body.password,
	}
	db.users.findOne({username:nu.username},function(err, result){
		if(!!!result){
			db.users.save(nu,function(err, result){
				res.cookie('id', nu.id)
				res.cookie('name', nu.name)
				res.redirect("/docz")
			})//save
		}else{
			res.render('index', {error:'', signerror:'A user already exists with that username'})
		}
	})// .findOne
})// post

app.get('/new', function(req, res){
	var newDoc = {
		id : hashids.encrypt(Math.floor(Math.random()*(99999-10000)+10000)),
		userId : req.cookies.id,
		posted : JSON.stringify(Date.now()),
		header : "Title",
		cont : "Content"
	}
	db.users.findOne({id:req.cookies.id},function(err, result){
		db.docs.save(newDoc, function(err, result){
			if(!!err){
				res.send(err)}else{res.redirect("/docz/"+newDoc.id)
			}
		})
	})
})

// URL params
app.get('/docz/:id', function(req, res){
	db.docs.findOne({id:req.params.id},function(err, doc){
		db.docs.find({userId:req.cookies.id}, function(er, docs){
			// res.render('users',{docs: docs, doc: result})
			res.render('user', {name: req.cookies.name, docs: docs, doc: doc})
			console.log(docs)
		})
	})// fineOne
})// get

app.get('/docz', function(req, res){
	res.render('user', {name:req.cookies.name,docs:{},doc:{}})
})

app.post('/save', function(req, res){
	db.docs.update({id:req.body.id},{$set: {header:req.body.header,cont:req.body.cont}},function(err, result){
		if(!!err){res.send(err)}else{res.status('200').send('200')}
	})
})

app.get('/delete', function(req, res){
	db.docs.remove({id:req.query.id},function(err, result){
		if(!!err){res.send(err)}else{res.redirect("/")}
	})
})

//404 Pages
app.get('/*', function(req, res){
	res.status('404').send('404')
	// res.location()
})

httpServer.listen(3000, function() {
	console.log('Express server listening on port 3000');
});