var express = require('express');
var router = express.Router();
var request = require('request');
var mysql = require('mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Facebook Assister',layout:'layout/layout' });
});
router.get('/dashboard',function(req,res,next){
	res.render('dashboard',{title:'Dashboard',layout:'layout/dashboard'});
});
router.post('/login',function(req,res,next){
	data = req.body;
	createSession(data)
	.then(function(){
		res.send("success")
	})
	.catch(function(){
		res.send("fail")
	})
})
module.exports = router;

async function createSession(data){
	return await new Promise(function(resolve,reject){
		is_newMember(data.userID)
		.then(function(row){
			// createsession
			console.log("is member")
			resolve()
		})
		.catch(function(){
			getProfile(data.userID,data.accessToken)
			.then(function(row){
				// createsession
				console.log("not member")
				resolve()

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
		var connection = mysql.createConnection({
			host     : 'localhost',
		  	user     : 'root',
		  	password : '',
		  	database : 'FacebookAssister'
		});
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
		let url = "https://graph.facebook.com/v2.8/me?fields=id%2Cemail%2Cfirst_name%2Clast_name%2Cgender%2Cpicture%2Clink&access_token="+token;
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
	  		insertToDB(id,email,first_name,last_name,gender,picture,link,signup_time)
	  		.then(function(row){
	  			resolve(row)
	  		})
	  		.catch(function(err){
	  			reject();
	  			throw err;
	  		})
		})
	})	
}
async function insertToDB(id,email,first_name,last_name,gender,picture,link,signup_time){
	console.log(0)
	return await new Promise(function(resolve,reject){	
		let queryCommand = `INSERT INTO Users VALUES ('${id}','${email}','${first_name}','${last_name}','${gender}','${picture}','${link}',${signup_time});`;
		var connection = mysql.createConnection({
			host     : 'localhost',
		  	user     : 'root',
		  	password : '',
		  	database : 'FacebookAssister'
		});
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