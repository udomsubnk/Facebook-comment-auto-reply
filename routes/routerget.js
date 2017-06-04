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
	// dashboard : function(req,res,next){
	// 	session = req.session;
	// 	if(session.userId){
	// 		model.getPersonalProjects(session.userId).then((projects)=>{
	// 			res.render('dashboard',{title:'Dashboard',layout:'layout/layout',name:'dashboard',session,projects});
	// 		}).catch(()=>{
	// 			res.redirect('/');
	// 		})
	// 	}else{
	// 		res.redirect('/');
	// 	}
	// },
	// newproject : function(req,res,next){
	// 	session = req.session;
	// 	if(session.userId && session.pages.length){
	// 		model.getPersonalProjects(session.userId).then((projects)=>{
	// 			for(let i=0;i<projects.length;i++){
	// 				for(let j=0;j<session.pages.length;j++){
	// 					if(projects[i].page_id == session.pages[j].id){
	// 						session.pages[j].is_personal_page = true;
	// 						break;
	// 					}
	// 				}
	// 			}
	// 			res.render('newproject',{title:'New project',layout:'layout/layout',name:'newproject',session});
	// 		})
	// 	}else{
	// 		res.redirect('/dashboard');
	// 	}
	// },
	// project : function(req,res,next){
	// 	session = req.session;
	// 	if(session.userId){
	// 		let page_id = req.params.page_id;
	// 		model.isProjectHasAccessByRealOwner(session.userId,page_id)
	// 			.then((project)=>{
	// 				session.currentProject = project;
	// 				res.render('project',{title:'project',layout:'layout/layout',name:'project',session}) 
	// 			})
	// 			.catch(()=> res.send("Don't try it again!") )
	// 	}else res.redirect('/')
	// },
	// commentsbot : function(req,res,next){
	// 	session = req.session;
	// 	if(session.userId){
	// 		model.getPersonalCommentsBot(session.userId).then((personal_comments_bot)=>{
	// 		  	res.render('commentsbot', { title: 'Comments bot',layout:'layout/layout',name:'commentsbot',session,personal_comments_bot });
	// 		})
	// 	}else{
	// 		res.redirect('/');
	// 	}
	// },
	// messagesbot : function(req,res,next){
	// 	session = req.session;
	// 	if(session.userId){
	// 		model.getPersonalMessagesBot(session.userId).then((personal_comments_bot)=>{
	// 		  	res.render('messagesbot', { title: 'Messages Bot',layout:'layout/layout',name:'messagesbot',session,personal_comments_bot });
	// 		})
	// 	}else{
	// 		res.redirect('/');
	// 	}
	// }
	all : function(req, res){
	  res.render('dashboard',{title:'Facebook Assister',layout:'layout/layout',name:'dashboard'});
	}
}