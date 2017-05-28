var express = require('express');
var router = express.Router();
var routerget = require('./routerget')
var routerpost = require('./routerpost')


router.get('/', routerget.index );
router.get('/dashboard', routerget.dashboard );
router.get('/newproject', routerget.newproject );
router.get('/project/:page_id', routerget.project );
router.get('/commentsbot', routerget.commentsbot );
router.get('/messagesbot', routerget.messagesbot );

router.post('/login', routerpost.login )
router.post('/logout', routerpost.logout );
router.post('/callaccounts', routerpost.callaccounts );
router.post('/choosedpage', routerpost.choosedpage );
router.post('/createbot', routerpost.createbot );
router.post('/getposts', routerpost.getposts );
router.post('/createCommentBot', routerpost.createCommentBot );
router.post('/changeCmStatus', routerpost.changeCmStatus );

module.exports = router;
