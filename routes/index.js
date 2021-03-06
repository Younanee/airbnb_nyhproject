var express = require('express');
//var User = require('../models/User');
var Post = require('../models/Post');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   Post.find({},function(err, posts){
//     res.render('index', {
//       posts: posts
//     });
//   }).limit(3);
// });

router.get('/', function(req, res, next) {
  Post.find({}).sort({'meta.favs':-1}).limit(3).exec(function(err, posts){
    res.render('index', {posts: posts});
  });
});
module.exports = router;
