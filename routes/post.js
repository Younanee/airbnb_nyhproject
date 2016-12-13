var express = require('express'),
    User = require('../models/User'),
    Post = require('../models/Post'),
    Reservation = require('../models/Reservation'),
    Favorite = require('../models/Favorite'),
    PostScript = require('../models/PostScript');
var router = express.Router();


//검색 결과
router.post('/list', function(req, res, next){
    if(req.body.city){
        Post.find({city: req.body.city}).sort({'meta.favs':-1}).exec(function(err, posts){
            res.render('posts/post-list', {
                posts: posts
            });
        });
    } else {
        Post.find({}).sort({'meta.favs':-1}).exec(function(err, posts){
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
        post.meta.views++;
        post.save(function(err){
            if(err){
                return next(err);
            }
        });
        PostScript.find({postId: req.params.id}, function(err, postScripts){
            var comment_permission = false;
            if(err){
                return next(err);
            }
            if(req.user){
                if(req.user.id == post.hostId){
                    comment_permission = true;
                }
            }
            res.render('posts/show',{
                comment_permission: comment_permission,
                post: post,
                postScripts: postScripts
            });

        });

    });
});
//호스트의 코멘트 쓰기
router.put('/:id/comment', function(req, res, next){
    console.log('코멘트 컨트롤 접근');
    if(!req.body.comment){
        req.flash('danger', '코멘트 내용이 비어있습니다.');
        res.redirect('back');
    } else {
        PostScript.findById(req.params.id, function(err, postScript){
            if(err){
                return next(err);
            }
            postScript.comment = req.body.comment;
            postScript.save(function(err){
                req.flash('success', '후기에 대한 코멘트를 달았습니다.');
                res.redirect('back');
            });
        });
    }
});
//후기 쓰기
router.post('/:id/postscript',function(req, res, next){
    if(!req.user){
        req.flash('danger', '로그인이 필요합니다.');
        res.redirect('back');
    } else if(!req.body.content){
        req.flash('danger', '후기 내용이 비어있습니다.');
        res.redirect('back');
    } else {
        Post.findById({_id: req.params.id}, function(err, post){
            if(err){
                return next(err);
            }
            var postScript = new PostScript({
                    postId: post.id,
                    hostId: post.hostId,
                    username: req.user.name,
                    userId: req.user.id,
                    content: req.body.content
            });
            postScript.save(function(err){
                if(err){
                    return next(err);
                }
                req.flash('success', '후기작성이 완료되었습니다.');
                res.redirect('back');
            });
            
        });
    }
});

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

//숙소 예약하기
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
            post.meta.reservs++;
            post.save(function(err){
                if(err){
                    return next(err);
                }
            });
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

    if(!req.user){
        req.flash('danger', '로그인이 필요합니다.');
        res.redirect('back');
    } else {
        Post.findById({_id: req.params.id}, function(err, post){
            if(err){
                return next(err);
            }
            post.meta.favs++;
            post.save(function(err){
                if(err){
                    return next(err);
                }
            });
            var favorite = new Favorite({
                postId: req.params.id,
                userId: req.user.id,
                postTitle: post.title,
                postAddress: post.address,
                postCity: post.city
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
