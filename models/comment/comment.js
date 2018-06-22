import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const commentSchma = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User'},
    target_id: { type: Schema.Types.ObjectId, ref: 'Comment'},  //评论id
    content: String,
    likes: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    create_time: Date,
    parent_type: String,
    authid: { type: Schema.Types.ObjectId, ref: 'User'}, //作者id
    topic_id: { type: Schema.Types.ObjectId, ref: 'Topic' }, //主题id
    status: Boolean, //false 未读  已读
});


const Comment = mongoose.model('Comment', commentSchma,'comment');

export default Comment;