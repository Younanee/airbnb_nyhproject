var express = require('express'),
    User = require('../models/User'),
    Post= require('../models/Post'),
    Favorite= require('../models/Favorite'),
    Reservation= require('../models/Reservation');
var router = express.Router();

function needAuth(req, res, next) {
    if (req.session.user) {
      next();
    } else {
      req.flash('danger', '로그인이 필요합니다.');
      //res.redirect('/signin');
    }
}

function validateForm(form, options) {
  var name = form.name || "";
  var email = form.email || "";
  name = name.trim();
  email = email.trim();

  if (!name) {
    return '이름을 입력해주세요.';
  }

  if (!email) {
    return '이메일을 입력해주세요.';
  }

  if (!form.password && options.needPassword) {
    return '비밀번호를 입력해주세요.';
  }

  if (form.password !== form.password_confirmation) {
    return '비밀번호가 일치하지 않습니다.';
  }

  if (form.password.length < 6) {
    return '비밀번호는 6글자 이상이어야 합니다.';
  }

  return null;
}
// router.get('/:id', function(req, res, next){
//   User.findById(req.params.id, function(err, user){
//     if(err){
//       return next(err);
//     }
//     res.render('users/userinfo',{user: user});
//   });
// });


//관리자 회원 리스트 관리
router.get('/userlist', function(req, res, next) {
  User.find({},function(err, users){
    if(err){
      return next(err);
    }
    res.render('users/userlist',{ users: users });
  });
});

//프로필 메인창 컨트롤
router.get('/:id', function(req, res, next) {
  if(!req.session.user || (req.params.id!= req.user.id) ){
      req.flash('danger', '다시 로그인 해주세요.');
      res.redirect('/');
  } else {
    User.findById(req.params.id, function(err, user) {
      if (err) {
        return next(err);
      }
      res.render('users/profile', {user: user});
    });
  }
});
//프로필 > 좋아요 숙소 관리
router.get('/:id/favorite', function(req, res, next){
  if(!req.session.user || (req.params.id!= req.user.id) ){
      req.flash('danger', '다시 로그인 해주세요.');
      res.redirect('/');
  } else {
    User.findById(req.params.id, function(err, user){
      if(err){
        return next(err);
      }
      Favorite.find({userId: req.params.id}, function(err, favorites){
        if(err){
          return next(err);
        }
        res.render('users/profile_favor', {
          user: user,
          favorites: favorites
        });
      });
    });
  }
});

//프로필 > 좋아요 숙소 삭제
router.delete('/:id/favorite', function(req, res, next){
  Favorite.findOneAndRemove({_id: req.params.id}, function(err){
    if(err){
      return next(err);
    }
    req.flash('success', '좋아요가 취소되었습니다.');
    res.redirect('back');
  });
});

//프로필 > 내가 예약한 숙소 목록
router.get('/:id/myreservation', function(req, res, next){
  if(!req.session.user || (req.params.id!= req.user.id) ){
      req.flash('danger', '다시 로그인 해주세요.');
      res.redirect('/');
  } else {
    User.findById(req.params.id, function(err, user){
      if(err){
        return next(err);
      }
      Reservation.find({userId: req.params.id}, function(err, reservations){
        if(err){
          return next(err);
        }
        res.render('users/profile_reservation', {
          user: user,
          reservations: reservations
        });
      });
    });
  }
});
//여행자의 숙소 예약 취소 요청
router.put('/:id/cancel_plz', function(req, res, next){
  Reservation.findById(req.params.id, function(err, reservation){
    if(err){
      return next(err);
    }
    if(!reservation.cancel){
      reservation.cancel = true;
    } else {
      reservation.cancel = false;
    }
    reservation.save(function(err){
      if(err){
        return next(err);
      }
      if(reservation.cancel){
        req.flash('success', '호스트에게 예약 취소를 요청했습니다.');
      } else {
        req.flash('success', '예약 취소를 요청을 취소했습니다.');
      }
      res.redirect('back');
    });
  });
});


//프로필 > 유저 정보 컨트롤
router.get('/:id/userinfo', function(req, res, next) {
  if(!req.session.user || (req.params.id!= req.user.id) ){
      req.flash('danger', '다시 로그인 해주세요.');
      res.redirect('/');
  } else {
      User.findById(req.params.id, function(err, user) {
        if (err) {
          return next(err);
        }
        res.render('users/profile_userinfo', {user: user});
      });
  }
});

//회원가입 컨트롤
router.post('/', function(req, res, next) {
  var err = validateForm(req.body, {needPassword: true});
  if (err) {
    req.flash('danger', err);
    return res.redirect('back');
  }
  User.findOne({email: req.body.email}, function(err, user) {
    if (err) {
      return next(err);
    }
    if (user) {
      req.flash('danger', '동일한 이메일 주소가 이미 존재합니다.');
      return res.redirect('back');
    } else {
      var newUser = new User({
        name: req.body.name,
        email: req.body.email,
      });
      newUser.password = newUser.generateHash(req.body.password);
      newUser.save(function(err) {
        if (err) {
          next(err);
        } else {
          req.flash('success', '가입이 완료되었습니다. 로그인 해주세요.');
          res.redirect('/');
        }
      });    
    }
  });
});

//프로필 > 유저정보관리 > 삭제
router.delete('/:id', function(req, res, next){
  User.findOneAndRemove({_id: req.params.id}, function(err){
    if(err){
      return next(err);
    }
    req.flash('success', '사용자 계정이 삭제되었습니다.');
    res.redirect('/signout');
  });
});

//회프로필 > 유저정보관리 > 수정
router.get('/:id/edit', function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if (err) {
      return next(err);
    }
    res.render('users/edit', {user: user});
  });
});

//회원정보 수정
router.put('/:id', function(req, res, next) {
  User.findById({_id: req.params.id}, function(err, user) {
      var currentid = req.params.id;
      if (err) {
        return next(err);
      }
      if (!user) {
        req.flash('danger', '존재하지 않는 사용자입니다.');
        return res.redirect('back');
      }
      if(req.body.name){
        user.name = req.body.name;
      }
      if (req.body.next_password) {
        user.password = user.generateHash(req.body.next_password);
      }
      user.save(function(err) {
      if (err) {
        return next(err);
      }
      req.flash('success', '사용자 정보가 변경되었습니다.');
      res.redirect('/');
    });
  });
});


module.exports = router;
