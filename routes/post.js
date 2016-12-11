var express = require('express'),
    User = require('../models/User'),
    Post = require('../models/Post');
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

router.get('/:id',function(req, res, next){
    Post.findById({_id: req.params.id}, function(err, post){
        if(err){
            return next(err);
        }
        res.render('posts/show',{
            post: post
        });
    });

});


router.get('/:id', function(req, res, next){
    Post.findById({_id: req.params.id}, function(err, post){
        post.read++;//페이지를 클릭해서 해당 게시물이 뜰때 마다 db에 read를 1씩 증가시킴.
        post.save(function(err){
            if(err){
                return next(err);
            }
        });
        if(err){
            return next(err);
        }
        res.render('posts/show', {post: post});
    });
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




module.exports = router;
