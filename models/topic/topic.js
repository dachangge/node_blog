import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const topicSchma = new Schema({
    create_time: Date,
    content: String,
    user_id: {type:Schema.Types.ObjectId, ref: 'User'},
    tags:[String],
    likes:[Schema.Types.ObjectId],
    replays:[Schema.Types.ObjectId],
    type: String,
    looks: Number,
    title: String,
});


const Topic = mongoose.model('Topic', topicSchma,'topic');

export default Topic;