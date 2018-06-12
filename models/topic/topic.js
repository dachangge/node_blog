import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const topicSchma = new Schema({
   create_time: Date,
    content: String,
    user_id: Schema.Types.ObjectId,
    tags:[String],
    likes:[Schema.Types.ObjectId],
    replays:[Schema.Types.ObjectId],
    type: String
});


const Topic = mongoose.model('Topic', topicSchma,'topic');

export default Topic;