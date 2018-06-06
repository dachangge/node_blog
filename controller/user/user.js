import UserModel from '../../models/user/user'
import {BaseResult} from "../../prototype/baseResult";
class User {
    constructor() {
        this.createUser = this.createUser.bind(this);
    }
    async getAdminInfo (req, res, next) {
        console.log(req.session.user_id)
        if(req.body && req.body._id) {
            let info = await UserModel.findOne({_id: req.params._id});
            res.send(info);
            return
        }
        res.send({code : 1})
        // }
        // else
        //     res.send({code: '0000', description: 'success'})
    }
    async queryAdmins (req, res, next){
        try{
            let admins = await UserModel.find();
            res.send(new BaseResult({
                code: 1,
                description: '查询成功',
                result: {
                    count: admins.length,
                    list: admins
                }
            }));
        }
        catch (e) {
            console.log(e);
            res.send(new BaseResult({
                code: 0,
                description: '获取数据失败',
            }))
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
            if(user)
                res.send(new BaseResult({code: 0, description: '用户名已被注册'}))
            else {
                UserModel.create({
                    user_name: req.body.user_name,
                    true_name: req.body.true_name,
                    pass_word: req.body.pass_word,
                    phone: req.body.phone,
                    create_time: new Date()
                }, (err, docs) => {
                    if (err) {
                        console.log(err);
                        res.send(new BaseResult({code: 0, description: '服务器异常'}));
                    } else {
                        req.session.user_id = docs._id;
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

}
export default new User();