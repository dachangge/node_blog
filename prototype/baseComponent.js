import {BaseResult} from "./baseResult";
import UserModel from '../models/user/user'

export class BaseComponent{
    async checkUser(req, res, next){
        const userid = req.session.userid;
        console.log(userid)
        if (!userid) {
            res.send(new BaseResult({code : 9999, description: '请先登录'}))
            return
        }else{
            const user = await UserModel.findOne({_id: userid});
            if (!user) {
                res.send(new BaseResult({code : 9999, description: '请先登录'}));
                return
            }
        }
        next()
    }
}
