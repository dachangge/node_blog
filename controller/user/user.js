import UserModel from '../../models/user/user'
import {BaseResult} from "../../prototype/baseResult";
import CommentModel from "../../models/comment/comment";
class User {
    constructor() {
        this.createUser = this.createUser.bind(this);
    }
    async saveUser (req, res, next) {
        try {
            if (!req.body.user_name)
                throw new Error('用户名不能为空');
            else if (!req.body.true_name)
                throw new Error('真实姓名不能为空');
            let user = await UserModel.findOneAndUpdate({_id: req.session.userid},{
                user_name: req.body.user_name,
                true_name: req.body.true_name,
                phone: req.body.phone,
                autograph: req.body.autograph,
            });
            res.send(new BaseResult({code: 1, description: '用户信息修改成功', result: user}));
        }catch(err){
            res.send(new BaseResult({code: 0, description: err.message}));
        }

    }
    async changePsd(req, res, next) {
        try {
            if (!req.body.old_psd)
                throw new Error('必须输入当前密码');
            else if (!req.body.new_psd)
                throw new Error('必须输入新密码');
        }catch(err){
            res.send(new BaseResult({code: 0, description: err.message}));
        }
        UserModel.update({_id: req.session.userid,pass_word: req.body.old_psd},{pass_word: req.body.new_psd},(err,docs) => {
            if(err){
                res.send(new BaseResult({code: 0, description: '修改用户信息失败'}));
            }else{
                console.log(docs);
                if(docs.n === 0){
                    res.send(new BaseResult({code: 0, description: '原密码不正确'}))
                }
                else if(docs.n === 1){
                    res.send(new BaseResult({code: 1, description: '修改密码成功', result: docs}))
                }
            }
        });

    }
    async checkUser (req, res, next) {
        if(req.session && req.session.userid){
            let user = await UserModel.findOne({_id: req.session.userid});
            if(user){
                res.send(new BaseResult({code: 1, description: '当前已经登陆',result: user}));
            }else{
                res.send(new BaseResult({code: 400, description: '当前未登陆'}));
            }
        }
        else{
            res.send(new BaseResult({code: 400, description: '当前未登陆'}));
        }
    }
    async createUser (req, res, next) {
        try{
            if(!req.body.user_name){
                throw new Error('用户名必须输入');
            }
            else if(!req.body.true_name){
                throw new Error('密码必须输入');
            }
            else if(req.body.pass_word != req.body.pass_word_confirm)
                throw new Error('两次密码输入不一致');
        }
        catch(error){
            res.send(new BaseResult({code: 0, description: error.message}));
            return
        }
        try{
            let user = await UserModel.findOne({user_name: req.body.user_name});
            if(user){
                res.send(new BaseResult({code: 0, description: '用户名已被注册'}));
            }
            else {
                UserModel.create({
                    user_name: req.body.user_name,
                    true_name: req.body.true_name,
                    pass_word: req.body.pass_word,
                    phone: req.body.phone,
                    create_time: new Date()
                }, (err, docs) => {
                    if (err) {
                        res.send(new BaseResult({code: 0, description: '服务器异常'}));
                    } else {
                        req.session.userid = docs._id;
                        res.send(new BaseResult({code: 1, description: '注册成功', result: docs}));
                    }
                })
            }
        }catch(err){
            console.log('注册失败',err);
            res.send(new BaseResult({code: 0, description: '注册失败'}))
        }
        //
    }
    async userLogin(req, res, next) {
        console.log(req.body)
        try{
            if(!req.body.user_name)
                throw new Error('用户名不能为空');
            if(!req.body.pass_word)
                throw new Error('密码不能为空');
        }catch(err){
            res.send(new BaseResult({code: 0, description: err.message}))
        }
        try{
            UserModel.findOne({user_name: req.body.user_name, pass_word: req.body.pass_word},(err,doc) => {
                if(err){
                    res.send(new BaseResult({code: 0, description: err.message}))
                }else{
                    console.log(doc)
                    if(doc){
                        req.session.userid = doc._id;
                        res.send(new BaseResult({code: 1, description: '成功登录'}))
                    }else{
                        res.send(new BaseResult({code: 0, description: '用户名或密码不正确'}))
                    }

                }
            });
        }catch(err){
            res.send(new BaseResult({code: 0, description: '服务器异常'}))

        }
    }
    async userLoginOut(req, res, next){
        try{
            req.session.destroy(function () {
                res.clearCookie('SID',{});
                res.send(new BaseResult({code: 1,description: '退出登录'}));
            })
        }catch (e) {
            res.send(new BaseResult({code: 0, description: '系统异常'}))
        }

    }

}
export default new User();