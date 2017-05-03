var model = require('../models/model')
var session;

module.exports = {
	index : function(req, res, next) {
		session = req.session;
		if(session.userId){
			res.redirect('/dashboard');
		}else{
		  	res.render('index', { title: 'Facebook Assister',layout:'layout/layout',name:'index' });
		}
	},
	dashboard : function(req,res,next){
		session = req.session;
		if(session.userId){
			model.getPersonalProjects(session.userId).then((projects)=>{
				console.log(JSON.stringify(projects))
				res.render('dashboard',{title:'Dashboard',layout:'layout/dashboard',name:'dashboard',session,projects});
			}).catch(()=>{
				res.redirect('/');
			})
		}else{
			res.redirect('/');
		}
	},
	newproject : function(req,res,next){
		session = req.session;
		console.log(session.pages)
		if(session.userId && session.pages.length){
			res.render('newproject',{title:'New project',layout:'layout/newproject',name:'newproject',session});
		}else{
			res.redirect('/dashboard');
		}
	},
	setPages : function(req,res,next){
		session = req.session;
		if(session.userId){
			session.pages = JSON.parse(req.body.res).data;
			console.log(session.pages)
			res.send("success");
		}else{
			res.send("fail")
		}
	},
	login : function(req,res,next){
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
	},
	logout : function(req,res,next){
		req.session.destroy(function(err){
			if(err)
				console.log(err);
			res.send('destroyed');
		});
	},
	callaccounts : function(req,res,next){
		session = req.session;
		model.callaccounts(session.access_token)
			.then(function(data){
				session.pages = data.accounts.data;
				res.send("success")
			})
	},
	choosedpage : function(req,res,next){
		let page_id = req.body.page_id;
		let page_name = req.body.page_name;
		let page_access_token = req.body.page_access_token;
		let user_id = req.session.userId
		model.choosedpage(page_id,page_name,page_access_token,user_id)
			.then((page_id)=>{res.send('success'+','+page_id)})
			.catch(()=>{res.send('fail')})
	}
}
