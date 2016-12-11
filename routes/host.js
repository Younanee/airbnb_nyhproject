var express = require('express'),
    User = require('../models/User'),
    Post = require('../models/Post');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('host/hosting');
});


//테스트 페이지
router.get('/test',function(req,res,next){
  res.render('host/test');
});



router.post('/:id', function(req, res, next){
  if(!req.user){
    req.flash('danger', '호스팅 전 로그인하십시요.');
    res.redirect('/');
  }
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
    console.log(newPost);
    res.redirect('/');
  });
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