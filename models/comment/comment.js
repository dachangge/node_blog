import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const commentSchma = new Schema({
    user_id: Schema.Types.ObjectId,
    target_id: Schema.Types.ObjectId,
    content: String,
    likes: [Schema.Types.ObjectId],
    create_time: Date,
    parent_type: String,
    authid: Schema.Types.ObjectId,
    userMsg: Object
});


const Comment = mongoose.model('Comment', commentSchma,'comment');

export default Comment;