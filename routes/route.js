var express = require('express');
var router = express.Router();
var model = require('../models/model')

var session;
/* GET home page. */
router.get('/', function(req, res, next) {
	session = req.session;
	if(session.userId){
		res.redirect('/dashboard');
	}else{
	  	res.render('index', { title: 'Facebook Assister',layout:'layout/layout',name:'index' });
	}
});
router.get('/dashboard',function(req,res,next){
	session = req.session;
	if(session.userId){
		res.render('dashboard',{title:'Dashboard',layout:'layout/dashboard',name:'dashboard',session});
	}else{
		res.redirect('/');
	}
});
router.get('/newproject',function(req,res,next){
	session = req.session;
	console.log(session.pages)
	if(session.userId && session.pages.length){
		res.render('newproject',{title:'New project',layout:'layout/newproject',name:'newproject',session});
	}else{
		res.redirect('/dashboard');
	}
});
router.post('/setPages',function(req,res,next){
	session = req.session;
	if(session.userId){
		session.pages = JSON.parse(req.body.res).data;
		console.log(session.pages)
		res.send("success");
	}else{
		res.send("fail")
	}

});
router.post('/login',function(req,res,next){
	data = req.body;
	session = req.session;
	model.createSession(data)
	.then(function(row){
		session.userId = row.userId;
		session.email = row.email;
		session.first_name = row.first_name;
		session.last_name = row.last_name;
		session.picture = row.picture;
		session.access_token = data.accessToken
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
router.post('/callaccounts',function(req,res,next){
	session = req.session;
	model.callaccounts(session.access_token)
		.then(function(data){
			session.pages = data.accounts.data;
			res.send("success")
		})
});
router.post('/choosedpage',function(req,res,next){
	let page_id = req.body.page_id;
	let page_name = req.body.page_name;
	let page_access_token = req.body.page_access_token;
	model.choosedpage(page_id,page_name,page_access_token)
		.then((page_id)=>{res.send('success'+','+page_id)})
		.catch(()=>{res.send('fail')})
});
module.exports = router;
