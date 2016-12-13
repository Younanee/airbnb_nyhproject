var mongoose = require('mongoose'),
    moment = require('moment'),
    Schema = mongoose.Schema;




var postScriptSchema = new Schema({
    postId: {type: Schema.Types.ObjectId, index: true, required: true},
    hostId: {type: Schema.Types.ObjectId, index: true, required: true},
    userId: {type: Schema.Types.ObjectId, index: true, required: true},
    username: {type: String, require: true},
    content: {type: String, require: true},
    createdAt:{type: Date, default: Date.now},
    comment:{type: String}
});




var PostScript = mongoose.model('PostScript', postScriptSchema);

module.exports = PostScript;