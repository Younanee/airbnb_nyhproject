var express = require('express'),
    User = require('../models/User'),
    Post = require('../models/Post');
var router = express.Router();


router.get('/',function(req, res, next){
    res.render('posts/show');
});





module.exports = router;
