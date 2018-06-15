import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const commentSchma = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User'},
    target_id: { type: Schema.Types.ObjectId, ref: 'Comment'},
    content: String,
    likes: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    create_time: Date,
    parent_type: String,
    authid: { type: Schema.Types.ObjectId, ref: 'User'},
});


const Comment = mongoose.model('Comment', commentSchma,'comment');

export default Comment;