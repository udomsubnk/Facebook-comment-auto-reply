var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Facebook Assister',layout:'layout/layout' });
});
router.get('/dashboard',function(req,res,next){
	res.render('dashboard',{title:'Dashboard',layout:'layout/dashboard'});
});
router.post('/login',function(req,res,next){
	data = req.authResponse;
	res.send("success")
})

module.exports = router;
