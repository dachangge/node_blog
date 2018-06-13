import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TopictypeSchema = new Schema({
    type: String,
    name: String
})

const Topictype = mongoose.model('Topictype', TopictypeSchema, 'topictype');

export default Topictype;