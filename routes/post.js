var express = require('express'),
    User = require('../models/User'),
    Post = require('../models/Post');
var router = express.Router();


router.get('/:id',function(req, res, next){
    Post.findById({_id: req.params.id}, function(err, post){
        //

        //
        if(err){
            return next(err);
        }
        res.render('posts/show',{
            post: post
        });
    });
    //res.render('posts/show');
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




module.exports = router;
