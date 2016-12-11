var express = require('express');
//var User = require('../models/User');
var Post = require('../models/Post');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  Post.find({},function(err, posts){
    res.render('index', {
      posts: posts
    });
  }).limit(3);
});

// router.post('/', function(req, res, next) {
//   User.findOne({email: req.body.email}, function(err, user) {
//     if (err) {
//       res.render('error', {message: "Error", error: err});
//     } else if (!user) {
//       req.flash('danger', '존재하지 않는 사용자 입니다.');
//       res.redirect('back');
//     } else if (user.password !== req.body.password) {
//       req.flash('danger', '비밀번호가 일치하지 않습니다.');
//       res.redirect('back');
//     } else {
//       req.session.user = user;
//       req.flash('success', '로그인 되었습니다.');
//       res.redirect('/');
//     }
//   });
// });
// router.get('/signout', function(req, res, next) {
//   delete req.session.user;
//   req.flash('success', '로그아웃 되었습니다.');
//   res.redirect('/');
// });

module.exports = router;
