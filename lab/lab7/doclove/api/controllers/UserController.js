var Hashids = require('hashids');
hashids = new Hashids('hello');
/**
 * UserController
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
		uName = req.session.user.name
		Document.find({userId:req.session.user.id}, function(er, docs){
			return res.view({name:uName,docs:docs})
		})
	},
	new: function(req,res){
		var newDoc = {
			docid : hashids.encrypt(Math.floor(Math.random()*(99999-10000)+10000)),
			userId : req.session.user.id,
			posted : JSON.stringify(Date.now()),
			header : "Title",
			cont : "Content"
		}
		User.findOne({userid:req.session.user.name},function(err, result){
			Document.create(newDoc).exec(function(err, result){
				if(!!err){res.send(err)}else{res.redirect("/User/docz/"+newDoc.docid+'?')}
			})
		})
	},
	docz: function(req,res){
		if(!!req.session.user){
			Document.findOne({docid:req.param('id')},function(err, doc){
				Document.find({userId:req.session.user.id}, function(er, docs){
					return res.view({name: uName, docs: docs, doc: doc})
				})
			})
		}else{
			res.redirect("/Public/docz/"+req.param('id'))
		}
	},
	delete: function(req,res){
		Document.findOne({docid:req.param('id')}).done(function(err, doc) {
		  doc.destroy(function(err) {if(!!err){res.send(err)}else{res.redirect("/User")}});
		})
	},
	signout: function(req,res){
		req.session.user = false
		res.redirect("/")
	}


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
  // _config: {}

  
};
