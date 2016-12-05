var express = require('express'),
    User = require('../models/User'),
    Post = require('../models/Post');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('host/hosting');
});

router.post('/', function(req, res, next){

  var newPost = new Post({
    title: req.body.title,
    simpleComment: req.body.simpleComment,
    city: req.body.city,
    address: req.body.address,
    cost: req.body.cost,
    usingRule: req.body.usingRule,
    facilities: req.body.facilities
  });
  newPost.save(function(err){
    if(err){
      return next(err);
    }
    res.redirect('/');
  });
  //res.render('/');
});





module.exports = router;
