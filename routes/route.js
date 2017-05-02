var express = require('express');
var router = express.Router();
var routerfn = require('../models/routerfn')

router.get('/', routerfn.index );
router.get('/dashboard', routerfn.dashboard );
router.get('/newproject', routerfn.newproject );
router.post('/setPages', routerfn.setPages );
router.post('/login', routerfn.login )
router.post('/logout', routerfn.logout );
router.post('/callaccounts', routerfn.callaccounts );
router.post('/choosedpage', routerfn.choosedpage );
module.exports = router;
