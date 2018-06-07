import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchma = new Schema({
    user_name: String,
    pass_word: String,
    create_time: Date,
    true_name: String,
    phone: String,
    autograph: String //个性签名
});

const User = mongoose.model('User', userSchma,'user');

export default User;