import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const commentSchma = new Schema({
   create_time: Date,
    content: String,
    user_id: ObjectId,
    tags:[String],
    likes:[ObjectId],
    replays:[ObjectId],
    type: [Stirng]
});


const Topic = mongoose.model('Topic', userSchma,'topic');

export default Topic;