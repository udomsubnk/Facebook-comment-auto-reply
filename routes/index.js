var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Facebook Assister',layout:'layout/layout' });
});
router.get('/dashboard',function(req,res,next){
	res.render('dashboard',{title:'Dashboard',layout:'layout/dashboard'});
});
router.post('/login',function(req,res,next){
	data = req.authResponse;
	getProfile(data.userID,data.accessToken)
	res.send("success")
})

function getProfile(userId,token){
	let url = "https://graph.facebook.com/v2.8/me?fields=id%2Cemail%2Cfirst_name%2Clast_name%2Cgender%2Cpicture%2Clink&access_token="+token;
	request(url,function (error, response, body){
  		let data = JSON.parse(body);

  		let id = data.id;
  		let email = data.email;
  		let first_name = data.first_name;
  		let last_name = data.last_name;
  		let gender = (data.gender=='male')?'M':'F';
  		let picture = data.picture.data.url;
  		let signup_time = 'CURRENT_TIMESTAMP';
  		insertToDB(id,email,first_name,last_name,gender,picture,signup_time);
	})
}

module.exports = router;
