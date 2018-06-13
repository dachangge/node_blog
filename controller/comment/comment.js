import {BaseComponent} from "../../prototype/baseComponent";
import {BaseResult} from "../../prototype/baseResult";
import CommentModel from "../../models/comment/comment"
import TopicModel from "../../models/topic/topic";
import UserModel from "../../models/user/user";

class Comment extends BaseComponent{
    async addComment(req, res, next){
        try{
            if(!req.body.content){
                throw new Error('请输入回复内容');
                return
            }
            let userMsg = await UserModel.findOne({_id: req.session.userid});
            let item = {
                user_id: req.session.userid,
                target_id: req.body._id,
                content: req.body.content,
                create_time: new Date(),
                parent_type: req.body.type,
                userMsg: userMsg
            };
            if(req.body.type === 'topic'){
                item.authid = req.body.authid;
            }
            let newCom = await CommentModel.create(item);
            if(newCom){
                if(req.body.type === 'topic'){
                    let top = await TopicModel.findOneAndUpdate({_id: req.body._id},{$push:{replays: newCom._id}});
                    if(top){
                        res.send(new BaseResult({code: 1, description:'回复成功', result: newCom}));
                    }
                }
            }
        }catch(err){
            res.send(new BaseResult({code: 0, description: err.message}))
        }
    }
}
export default new Comment();