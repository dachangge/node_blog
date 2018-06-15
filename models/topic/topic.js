import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const topicSchma = new Schema({
    create_time: Date,
    content: String,
    user_id: {type:Schema.Types.ObjectId, ref: 'User'},
    tags:[String],
    likes:[{type: Schema.Types.ObjectId,ref: 'User'}],
    replays:[{type:Schema.Types.ObjectId,ref: 'Comment'}],
    type: String,
    looks: Number,
    title: String,
    recently_reply_time: Date
});


const Topic = mongoose.model('Topic', topicSchma,'topic');

export default Topic;