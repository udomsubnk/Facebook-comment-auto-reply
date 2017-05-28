var model = require('../models/model')
var session;

module.exports = {
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
		model.callaccounts(session.access_token).then(function(data){
			session.pages = data.accounts.data;
			res.json(data)
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
	createbot : function(req,res,next){
		session = req.session;
		if(!session.userId) {
			res.send('fail')
			return;
		}
		let page_id = session.currentProject.page_id;
		let page_access_token = session.currentProject.page_access_token;
		model.checkExpiredGetNewAndUpdate(page_id,page_access_token,'Pages').then((new_page_access_token)=>{
			model.getPosts( new_page_access_token , 10 ).then((posts_rows)=>{
				session.currentProject.page_access_token = new_page_access_token;
				res.json(posts_rows);
			}).catch(()=>res.send('fail'))
		}).catch(()=>res.send('fail'))
	},
	getposts : function(req,res,next){
		let page_access_token = req.body.page_access_token;
		model.getPosts( page_access_token , 30 ).then((posts_rows)=>{
			res.json(posts_rows);
		}).catch(()=>res.send('fail'))
	},
	createCommentBot : function(req,res,next){
		session = req.session;
		if(!session.userId){
			res.send('Please Login!')
			return;
		}
		data = req.body;
		model.createCommentBot(data,session.userId).then(()=>{
			console.log('resolve')
			res.send('resolve')
		}).catch(()=>res.send('error'))
	},
	changeCmStatus : function(req,res,next){
		session = req.session;
		if(!session.userId){
			res.send('Please Login!')
			return;
		}
		data = req.body;
		model.changeCmStatus(session.userId,data).then(()=>{
			res.send('success')
		}).catch(()=>res.send('fail'))
	}
}
