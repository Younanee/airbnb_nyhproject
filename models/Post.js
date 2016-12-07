var mongoose = require('mongoose'),
    moment = require('moment'),
    Schema = mongoose.Schema;

var commentsSchema = new Schema({
    username: {type: Schema.Types.ObjectId, index: true},
    content: {type: String, require: true},
    createdAt:{type: Date, default: Date.now}
});


var postSchema = new Schema({
    hostid:{type: Schema.Types.ObjectId, index: true},
    title:{type: String, require: true},
    simpleComment:{type: String},
    city:{type: String, require: true, trim: true},
    postcode:{type: String, require: true},
    address: {type: String, require: true},
    cost: {type: Number, require: true, trim: true},
    facilities: {type: String},
    usingRule: {type: String},
    createdAt:{type: Date, default: Date.now},
    comments:[commentsSchema],
    meta      : {
        votes : Number,
        favs  : Number
    }
},{
    toJSON: {
        virtuals: true,
        transform: function(post){
            return {
                id: post._id.toString(),
                title: post.title,
                simpleComment: post.simpleComment,
                city: post.city,
                address: post.address,
                cost: post.cost,
                facilities: post.facilities,
                usingRule: post.usingRule,
                comments: post.commentsSchema
            };
        }
    },
    toObject: {virtuals: true}
});

var Post = mongoose.model('Post', postSchema);

module.exports = Post;