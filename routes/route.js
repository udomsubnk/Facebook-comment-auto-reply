var express = require('express');
var router = express.Router();
var routerfn = require('../models/routerfn')

router.get('/', routerfn.index );
router.get('/dashboard', routerfn.dashboard );
router.get('/newproject', routerfn.newproject );
router.get('/project/:page_id', routerfn.project );
router.get('/commentsbot', routerfn.commentsbot );


router.post('/login', routerfn.login )
router.post('/logout', routerfn.logout );
router.post('/callaccounts', routerfn.callaccounts );
router.post('/choosedpage', routerfn.choosedpage );
router.post('/createbot', routerfn.createbot );
router.post('/getposts', routerfn.getposts );
router.post('/createCommentBot', routerfn.createCommentBot );
router.post('/changeCmStatus', routerfn.changeCmStatus );

module.exports = router;
