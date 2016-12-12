var express = require('express'),
    User = require('../models/User'),
    Post = require('../models/Post'),
    Reservation = require('../models/Reservation'),
    Favorite = require('../models/Favorite');
var router = express.Router();



router.post('/list', function(req, res, next){
    if(req.body.city){
        Post.find({city: req.body.city},function(err, posts){
            res.render('posts/post-list', {
                posts: posts
            });
        });
    } else {
        Post.find({},function(err, posts){
            res.render('posts/post-list', {
                posts: posts
            });
        });
    }
});

//상세보기
router.get('/:id',function(req, res, next){
    Post.findById({_id: req.params.id}, function(err, post){
        if(err){
            return next(err);
        }
        console.log('상세보기 접근중');
        res.render('posts/show',{
            post: post
        });
    });

});

// router.get('/:id', function(req, res, next){
//     Post.findById({_id: req.params.id}, function(err, post){
//         post.read++;//페이지를 클릭해서 해당 게시물이 뜰때 마다 db에 read를 1씩 증가시킴.
//         post.save(function(err){
//             if(err){
//                 return next(err);
//             }
//         });
//         if(err){
//             return next(err);
//         }
//         res.render('posts/show', {post: post});
//     });
// });

//숙소 삭제하기
router.delete('/:id', function(req, res, next){
  Post.findOneAndRemove({_id: req.params.id}, function(err){
    if(err){
      return next(err);
    }
    req.flash('success', '숙소가 삭제되었습니다.');
    res.redirect('back');
  });
});

router.post('/reservation/:id', function(req, res, next){
    if(!req.user){
        req.flash('danger', '로그인이 필요합니다.');
        res.redirect('back');
    }
    if(!req.body.checkIn){
        req.flash('danger', '체크인 날짜를 선택해주세요.');
        res.redirect('back');
    } else if(!req.body.checkOut){
        req.flash('danger', '체크아웃 날짜를 선택해주세요.');
        res.redirect('back');
    } else if((!req.body.person) || (req.body.person == '0')){
        req.flash('danger', '숙박 인원을 선택해주세요.');
        res.redirect('back');
    } else {
        Post.findById({_id: req.params.id}, function(err, post){
            if(err){
                return next(err);
            }
            var reservation = new Reservation({
                postCity: post.city,
                postTitle: post.title,
                postId: req.params.id,
                hostId: post.hostId,
                userId: req.user.id,
                username: req.user.name,
                checkIn: req.body.checkIn,
                checkOut: req.body.checkOut,
                persons: req.body.person
            });
            reservation.save(function(err){
                if(err){
                    return next(err);
                }
                req.flash('success', '숙소 예약을 성공적으로 요청했습니다.');
                res.redirect('back');
            });
        });
    }

});



//좋아요 처리
router.get('/:id/favorite', function(req, res, next){
    // console.log('find 전 req.user.아이디 은' + req.user.id);
    // console.log('좋아요 접근중');
    if(!req.user){
        req.flash('danger', '로그인이 필요합니다.');
        res.redirect('back');
    } else {
        Post.findById({_id: req.params.id}, function(err, post){
            post.meta.favs++;
            post.save(function(err){
                if(err){
                    return next(err);
                }
            });
            var favorite = new Favorite({
                postId: req.params.id,
                userId: req.user.id
            });
            favorite.save(function(err){
                if(err){
                    return next(err);
                }
                req.flash('success', '내 좋아요 숙소에 등록되었습니다.');
                res.redirect('back');
            });
        });  
    }
  
});






module.exports = router;
