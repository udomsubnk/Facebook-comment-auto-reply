var express = require('express');
var router = express.Router();
var createSession = require('../models/model')

var session;
/* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('index', { title: 'Facebook Assister',layout:'layout/layout' });
});
router.get('/dashboard',function(req,res,next){
	session = req.session;
	if(session.userId){
		res.render('dashboard',{title:'Dashboard',layout:'layout/dashboard'});
	}else{
		res.redirect('/');
	}
});
router.post('/login',function(req,res,next){
	data = req.body;
	session = req.session;
	createSession(data)
	.then(function(row){
		session.userId = row.userId;
		session.email = row.email;
		session.first_name = row.first_name;
		session.last_name = row.last_name;
		session.picture = row.picture;
		console.log(session)
		res.send("success")
	})
	.catch(function(){
		res.send("fail")
	})
})
//Logout for detroy session
router.post('/logout',function(req,res,next){
	req.session.destroy(function(err){
		if(err)
			console.log(err);
		res.send('destroyed');
	});
});
module.exports = router;
