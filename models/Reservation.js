var mongoose = require('mongoose'),
    moment = require('moment'),
    Schema = mongoose.Schema;

var revervationSchema = new Schema({
    postId:{type: Schema.Types.ObjectId, index: true, required: true},
    hostId:{type: Schema.Types.ObjectId, index: true, required: true},
    userId: {type: Schema.Types.ObjectId, index: true, required: true},
    username:{type: String, require: true},
    createdAt:{type: Date, default: Date.now},
    checkIn:{type: String, require: true, trim: true},
    checkOut:{type: String, require: true, trim: true},
    persons:{type: String, require: true},
    permission:{type: boolean, default: false}
});


var Revervation = mongoose.model('Revervation', revervationSchema);

module.exports = Revervation;