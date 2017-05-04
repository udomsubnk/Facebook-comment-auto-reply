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
		if(session.userId && session.pages.length){
			model.getPersonalProjects(session.userId).then((projects)=>{
				for(let i=0;i<projects.length;i++){
					for(let j=0;j<session.pages.length;j++){
						if(projects[i].page_id == session.pages[j].id){
							session.pages[j].is_personal_page = true;
							break;
						}
					}
				}
				res.render('newproject',{title:'New project',layout:'layout/newproject',name:'newproject',session});
			})
		}else{
			res.redirect('/dashboard');
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
		let user_id = req.session.userId;
		let page_picture = req.body.page_picture;
		model.choosedpage(page_id,page_name,page_access_token,user_id,page_picture)
			.then((page_id)=>{res.send('success'+','+page_id)})
			.catch(()=>{res.send('fail')})
	},
	project : function(req,res,next){
		session = req.session;
		if(session.userId){
			let page_id = req.params.page_id;
			model.isProjectHasAccessByRealOwner(session.userId,page_id)
				.then(()=> res.render('project',{title:'project',layout:'layout/project',name:'project',session}) )
				.catch(()=> res.send("Don't try it again!") )
		}else res.redirect('/')
	}
}
