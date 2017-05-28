var mysql = require('mysql');
var request = require('request');
//Database setup
let host = 'localhost'
let user = 'root'
let password = ''
let database = 'FacebookAssister'
//Facebook App setup
let app_id = '106886806531561'
let app_secret = 'c85c9ccd03cc7460d5cadb5dcdfc7078'

module.exports = {
	createSession,
	callaccounts,
	choosedpage,
	getPersonalProjects,
	isProjectHasAccessByRealOwner,
	getPosts,
	checkExpiredGetNewAndUpdate,
	createCommentBot,
	getPersonalCommentsBot,
	changeCmStatus
}

async function changeCmStatus(userId,data){
	return await new Promise(function(resolve,reject){
		let queryCommand = `UPDATE comments_bot SET status = '${data.new_status}' WHERE cmbot_id = '${data.cmbot_id}' AND create_by_user_id = '${userId}'`;
		var connection = mysql.createConnection({host,user,password,database});
		connection.connect(function(err,callback){
			connection.query(queryCommand, function (errr, rows, fields) {
		  		connection.end()
		  		if (errr) {
		  			return reject(errr);
		  		}
		  		else if(rows.affectedRows < 1)
		  			reject();
		  		else{
		  			resolve(rows)
		  		}
			})
		})
	})
}
async function getPersonalCommentsBot(user_id){
	return await new Promise(function(resolve,reject){
		let queryCommand = `SELECT * FROM comments_bot WHERE create_by_user_id = '${user_id}'`;
		var connection = mysql.createConnection({host,user,password,database});
		connection.connect(function(err,callback){
			connection.query(queryCommand, function (errr, rows, fields) {
		  		connection.end()
		  		if (errr) {
		  			return reject(errr);
		  		}
	  			resolve(rows)
			})
		})
	})
}
async function createCommentBot(data,userId){
	return await new Promise(function(resolve,reject){
		let contrain = data.contrain;
		let cm_reply = data.cm_reply;
		let page_id = data.page_select;
		let post_id = data.post_select;
		let is_hide_comment = data.is_hide_comment;
		let is_ms_reply = data.is_ms_reply;
		let ms_reply = data.ms_reply;

		let queryCommand = `INSERT INTO comments_bot VALUES ('','${page_id}','${post_id}','${userId}','${contrain}','${is_hide_comment}','${cm_reply}','${is_ms_reply}','${ms_reply}','on')`;
		var connection = mysql.createConnection({host,user,password,database});
		connection.connect(function(err,callback){
			connection.query(queryCommand, function (errr, rows, fields) {
		  		connection.end()
		  		if (errr) {
		  			return reject(errr);
		  		}
	  			resolve()
			})
		})
	});
}
async function checkExpiredGetNewAndUpdate(id,token,table){
	return await new Promise(function(resolve,reject){
		checkExpiredToken(token).then(()=>{
			console.log('yes')
			resolve(token)
		}).catch(()=>{
			console.log('no')
			getLongLiveToken(token).then((long_live_token)=>{
				updateToken(id,long_live_token,table).then((long_live_token)=>{
					resolve(long_live_token);
				}).catch(()=>{
					reject();
				})
			})
		})
	})
}
async function checkExpiredToken(token){
	return await new Promise(function(resolve,reject){
		let url = "https://graph.facebook.com/v2.9/me?access_token="+token
		request(url,function(err,res,body){
			body = JSON.parse(body)
			if(body.error){
				reject();
			}
			else{
				resolve()
			}
		})
	});
}
async function getLongLiveToken(temporaryToken){
	return await new Promise(function(resolve,reject){
		let url = `https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id=${app_id}&client_secret=${app_secret}&fb_exchange_token=${temporaryToken}`
		request(url,function(err,res,body){
			if(err) return reject()
			let long_live_token = JSON.parse(body).access_token
			resolve(long_live_token)
		});
	});
}
async function getPosts(access_token,n){
	return await new Promise(function(resolve,reject){
 		let url = `https://graph.facebook.com/v2.9/me?fields=posts.limit(${n}){picture,message,attachments}&access_token=`+access_token;
 		request(url,function(err,res,body){
 			if(err) return reject();
			let posts_rows = body
			resolve(posts_rows);
 		});
	});
}
async function isProjectHasAccessByRealOwner(user_id,page_id){
	return await new Promise(function(resolve,reject){
		let queryCommand = `SELECT * FROM Pages WHERE page_id = '${page_id}' AND user_id = '${user_id}';`;
		var connection = mysql.createConnection({host,user,password,database});
		connection.connect(function(err,callback){
			connection.query(queryCommand, function (errr, rows, fields) {
		  		connection.end()
		  		if (errr) {
		  			return reject(errr);
		  		}
	  			if(rows.length) resolve(rows[0])
	  			else reject()
			})
		})
	});
}
async function getPersonalProjects(user_id){
	return await new Promise(function(resolve,reject){
		let queryCommand = `SELECT * FROM Pages WHERE user_id = '${user_id}'`;
		var connection = mysql.createConnection({host,user,password,database});
		connection.connect(function(err,callback){
			connection.query(queryCommand, function (errr, rows, fields) {
		  		connection.end()
		  		if (errr) {
		  			return reject(errr);
		  		}else{
			  		resolve(rows);
		  		}
			})
		})
	});
}
async function choosedpage(page_id,page_name,page_access_token,user_id,page_picture){
	return await new Promise(function(resolve,reject){
		let queryCommand = `INSERT INTO Pages VALUES ('${page_id}','${page_name}','${page_access_token}','${user_id}','${page_picture}');`;
		var connection = mysql.createConnection({host,user,password,database});
		connection.connect(function(err,callback){
			connection.query(queryCommand, function (errr, rows, fields) {
		  		connection.end()
		  		if (errr) {
		  			return reject(errr);
		  		}
		  		console.log('insert Page To DB Success!')
		  		resolve(page_id);
			})
		})
	});
}
async function callaccounts(user_token){
	return await new Promise(function(resolve,reject){
		let url = "https://graph.facebook.com/v2.9/me?fields=accounts%7Bname%2Cid%2Cperms%2Cpicture%2Caccess_token%7D&access_token="+user_token;
		request(url,function(err,res,body){
			if(err) reject()
			resolve(JSON.parse(body))
		});
	});
}
async function updateToken(userOrPageId,token,table){
	return await new Promise(function(resolve,reject){
		let id_column = (table=='Users')?'userId':'page_id'
		let token_column = (table=='Users')?'access_token':'page_access_token'
		let queryCommand = `UPDATE ${table} SET ${token_column} = '${token}' WHERE ${id_column} = '${userOrPageId}';`
		var connection = mysql.createConnection({host,user,password,database});
		connection.connect(function(err,callback){
			connection.query(queryCommand, function (err, rows, fields) {
		  		connection.end()
		  		if (err) {
		  			return reject(err)
		  		}
		  		console.log("updated access_token")
		  		resolve(token);
			})
		})
	});
}
async function createSession(data){
	return await new Promise(function(resolve,reject){
		is_newMember(data.userID)
		.then(function(row){
			console.log("is member")
			updateToken(data.userID,data.accessToken,'Users')
			.then(()=>resolve(row))
		})
		.catch(function(){
			getProfile(data.userID,data.accessToken)
			.then(function(row){
				console.log("not member")
				resolve(row)
			})
			.catch(function(){
				console.log("error!")
				reject()
			})
		})
	});
}
async function is_newMember(userId){
	return await new Promise(function(resolve,reject){
		let queryCommand = `SELECT * FROM Users WHERE userId='${userId}'`;
		var connection = mysql.createConnection({host,user,password,database});
		connection.connect(function(err,callback){
			connection.query(queryCommand, function (err, rows, fields) {
		  		connection.end()
		  		if (err) {
		  			return reject(err)
		  		}
		  		if(rows.length){
		  			resolve(rows[0])
		  		}else{
		  			reject()
		  		}
			})
		})
	});
}
async function getProfile(userId,token){
	return await new Promise(function(resolve,reject){
		let url = "https://graph.facebook.com/v2.9/me?fields=id%2Cemail%2Cfirst_name%2Clast_name%2Cgender%2Cpicture%2Clink&access_token="+token;
		request(url,function (error, response, body){
	  		let data = JSON.parse(body);

	  		let id = data.id;
	  		let email = data.email;
	  		let first_name = data.first_name;
	  		let last_name = data.last_name;
	  		let gender = (data.gender=='male')?'M':'F';
	  		let picture = data.picture.data.url;
	  		let link = data.link;
	  		let signup_time = 'CURRENT_TIMESTAMP';
	  		let access_token = token;
	  		insertToDB(id,email,first_name,last_name,gender,picture,link,signup_time,access_token)
	  		.then(function(row){
	  			var data = {
	  				userId:id,email,first_name,last_name,gender,picture,link,signup_time
	  			}
	  			resolve(data)
	  		})
	  		.catch(function(err){
	  			reject();
	  			throw err;
	  		})
		})
	})	
}
async function insertToDB(id,email,first_name,last_name,gender,picture,link,signup_time,access_token){
	return await new Promise(function(resolve,reject){	
		let queryCommand = `INSERT INTO Users VALUES ('${id}','${email}','${first_name}','${last_name}','${gender}','${picture}','${link}',${signup_time},'${access_token}');`;
		var connection = mysql.createConnection({host,user,password,database});
		connection.connect(function(err,callback){
			connection.query(queryCommand, function (errr, rows, fields) {
		  		connection.end()
		  		if (errr) {
		  			return reject(errr);
		  		}
		  		console.log('insertToDB Success!')
		  		resolve(rows[0]);
			})
		})
	});
}