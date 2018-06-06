import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const commentSchma = new Schema({
    user_id: ObjectId,
    target_id: ObjectId,
    content: String,
    likes: [ObjectId],
    create_time: Date,
    parent_id: Object_id,
    parent_type: String
});


const Comment = mongoose.model('Comment', userSchma,'comment');

export default Comment;