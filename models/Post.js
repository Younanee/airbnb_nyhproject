var mongoose = require('mongoose'),
    moment = require('moment'),
    Schema = mongoose.Schema;

//후기에 다는 댓글
var commentSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, index: true, required: true},
    content: {type: String, require: true},
    createdAt:{type: Date, default: Date.now}
});

//숙소 포스트에 다는 후기
var postScriptSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, index: true, required: true},
    title:{type: String, require: true},
    content: {type: String, require: true},
    comments: [commentSchema],
    createdAt:{type: Date, default: Date.now}
});

//숙소 포스트
var postSchema = new Schema({
    hostEmail:{type: String, require: true},
    hostName:{type: String, require: true},
    hostId:{type: Schema.Types.ObjectId, index: true, required: true},
    title:{type: String, require: true},
    simpleComment:{type: String},
    city:{type: String, require: true, trim: true},
    postcode:{type: String, require: true},
    address: {type: String, require: true},
    cost: {type: Number, require: true, trim: true},
    facilities: {type: String},
    usingRule: {type: String},
    createdAt:{type: Date, default: Date.now},
    postScript:[postScriptSchema],
    meta      : {
        reservations : Number,
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