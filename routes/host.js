var express = require('express'),
    User = require('../models/User'),
    Post = require('../models/Post'),
    Reservation = require('../models/Reservation');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('host/hosting');
});


//프로필 > 호스트 > 숙소 예약 요청 관리
router.get('/:id/host', function(req, res, next) {
  if(!req.session.user || (req.params.id!= req.user.id) ){
      req.flash('danger', '다시 로그인 해주세요.');
      res.redirect('/');
  } else {

    User.findById(req.params.id, function(err, user) {
      if (err) {
        return next(err);
      }
      Reservation.find({hostId: req.params.id}, function(err, reserv_reqs){
        if(err){ 
          return next(err);
        }
        res.render('users/profile_host', {
          user: user,
          reserv_reqs: reserv_reqs
        });
      });
    });
  }
});

//프로필 > 호스트 > 호스팅 리스트 관리
router.get('/:id/host/list', function(req, res, next) {
  if(!req.session.user || (req.params.id!= req.user.id) ){
      req.flash('danger', '다시 로그인 해주세요.');
      res.redirect('/');
  } else {
    User.findById(req.params.id, function(err, user) {
      if (err) {
        return next(err);
      }
      Post.find({hostId: user._id},function(err, posts){
        res.render('users/profile_host_list', {
          user: user,
          posts: posts
        });   
      });
    });
  }
});

//호스팅 하기
router.post('/:id', function(req, res, next){
  if(!req.user){
    req.flash('danger', '호스팅 전 로그인하십시요.');
    res.redirect('/');
  } else {
    var newPost = new Post({
      //호스트정보
      hostName: req.user.name,
      hostEmail: req.user.email,
      hostId: req.user.id,
      //숙소 정보
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
      req.flash('success', '성공적으로 호스팅했습니다.');
      res.redirect('/');
    });
  }
});



module.exports = router;


// router.post('/:id', function(req, res, next){
//   // console.log('find 전 req.user는'+req.user);
//   // console.log('find 전 req.user.name은'+req.user.name);
//   // console.log('find 전 req.user.email은'+req.user.email);
//   // console.log('find 전 req.session.user은'+req.session.user);
//   // console.log('find 전 req.session.user.name은'+req.session.user.name);

//   User.findById({_id: req.params.id},function(err, host){
//     if(err){
//       return next(err);
//     }
//     var newPost = new Post({
//       //호스트정보
//       hostName: host.name,
//       hostEmail: host.email,
//       hostId: host.id,
//       //숙소 정보
//       title: req.body.title,
//       simpleComment: req.body.simpleComment,
//       city: req.body.city,
//       address: req.body.address,
//       cost: req.body.cost,
//       usingRule: req.body.usingRule,
//       facilities: req.body.facilities
//     });
//     // console.log(req.params.id);
//     // console.log(newPost.hostName);
//     // console.log(newPost.hostEmail);
//     // console.log("newPost.hostId는 "+ newPost.hostId);
//     // console.log("host.id는 "+host.id);
//     // console.log("host._id는 "+host._id);
//     newPost.save(function(err){
//       if(err){
//         return next(err);
//       }
//       res.redirect('/');
//     });

//   });

// });