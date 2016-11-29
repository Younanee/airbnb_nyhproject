var express = require('express'),
    User = require('../models/User');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/hosting', function(req, res, next){
  res.render('hosting/hosting');
});

// router.get('/login', function(req, res, next) {
//   res.render('users/login');
// });



module.exports = router;
