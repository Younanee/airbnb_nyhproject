var mongoose = require('mongoose'),
    moment = require('moment'),
    Schema = mongoose.Schema;

var favoriteSchema = new Schema({
    postId:{type: Schema.Types.ObjectId, index: true, required: true},
    userId: {type: Schema.Types.ObjectId, index: true, required: true},
    createdAt:{type: Date, default: Date.now},

    postTitle:{type: String, require: true},
    postAddress:{type: String, require: true},
    postCity:{type: String, require: true}

});


var Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;