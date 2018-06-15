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
            let item = {
                user_id: req.session.userid,
                content: req.body.content,
                create_time: new Date(),
                parent_type: req.body.type,
            };
            if(req.body.type === 'topic'){
                item.authid = req.body.authid; //回复主题
            }
            if(req.body.type === 'comment'){
                item.target_id = req.body.target_id; //回复评论
            }
            let newCom = await CommentModel.create(item);
            if(newCom){
                if(req.body.type === 'topic'){
                    let top = await TopicModel.findOneAndUpdate({_id: req.body._id},{$push:{replays: newCom._id},$set:{recently_reply_time: newCom.create_time}});
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