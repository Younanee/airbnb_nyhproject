var mongoose = require('mongoose'),
    moment = require('moment'),
    Schema = mongoose.Schema;

var revervationSchema = new Schema({
    postId:{type: Schema.Types.ObjectId, index: true, required: true},
    postTitle:{type: String, require: true},
    postCity:{type: String, require: true},
    hostId:{type: Schema.Types.ObjectId, index: true, required: true},
    userId: {type: Schema.Types.ObjectId, index: true, required: true},
    username:{type: String, require: true},
    createdAt:{type: Date, default: Date.now},
    checkIn:{type: String, require: true, trim: true},
    checkOut:{type: String, require: true, trim: true},
    persons:{type: String, require: true},
    req_state:{type: Boolean, default: true},
    permission:{type: Boolean, default: false},
    cancel:{type: Boolean, default: false}
});
//req_state가 true면 호스트의 승인/거부 요청대기 중
//permission이 true가되면 승인

//permission이 false가 되면 여행자에게 삭제버튼만 생기며 리스트에서 삭제는 여행자에게 달림.



//cancel은 여행자의 예약 취소 요청
//cancel이 true가되면 호스트는 취소 승인 버튼만 띄워짐. 취소승인이 곧 삭제버튼
//여행자는 


var Revervation = mongoose.model('Revervation', revervationSchema);

module.exports = Revervation;