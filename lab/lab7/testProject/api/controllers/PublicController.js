var uuid = require('node-uuid');
/**
 * PublicController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

index: function(req,res){
	if(!!req.session.user){
		
	}else{
		req.session.user = false
		return res.view({error:'', signerror:''})
	}
},
docz: function(req,res){
	Document.findOne({docid:req.param('id')},function(err, doc){
		return res.view({name: 'Guest', doc: doc})
	})
},
update: function(req,res){
	// Document.update({id:req.body.id},{$set: {header:req.body.header,cont:req.body.cont}},function(err, result){
	// 	if(!!err){res.send(err)}else{res.status('200').send('200')}
	// })
	Document.findOne({id:req.param('id')}).done(function(err, doc) {
		if(!!doc){
			doc.header = req.param('header');
			doc.cont = req.param('cont');
			doc.save(function(err){if(!!err){res.send(err)}else{res.status('200').send('200')}})
		}else{
			res.send("That Document doesn't exist")
		}
	})
},
get: function(req,res){
	Document.findOne({id:req.param('id')}).done(function(err, doc) {
		if(!!doc){
			res.send(doc)
		}else{
			res.send("That Document doesn't exist")
		}
	})
},
login: function(req,res){
	User.findOne({username:req.body.username},function(err, result){
		if(!!result){
			req.session.user = {}
			req.session.user.id = result.id
			req.session.user.name = result.name
			res.redirect("/User")
		}else{
			return res.view({error:'Username or Password is incorrect', user:req.body.username, pass:req.body.password})
		}
	})
},
signup: function(req,res){
	var nu = {
		userid: uuid.v4(),
		created: JSON.stringify(Date.now()),
		name: req.body.name,
		username: req.body.username,
		password: req.body.password
	}
	User.findOne({username:nu.username},function(err, result){
		if(!result){
			User.create(nu).exec(function(err, result){
				req.session.user = {}
				req.session.user.id = result.id
				req.session.user.name = result.name
				res.redirect("/User")
			})//save
		}else{
			return res.view({error:'A user already exists with that username', name:req.body.name, user:req.body.username, pass:req.body.password})
		}
	})// .findOne
}

  
};
