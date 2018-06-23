import {BaseComponent} from "../../prototype/baseComponent";
import {BaseResult} from "../../prototype/baseResult";
import CommentModel from "../../models/comment/comment"
import TopicModel from "../../models/topic/topic";
import UserModel from "../../models/user/user";
import {so,sockets} from './../../app'

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
                topic_id: req.body._id,
                authid: req.body.authid,  //回复的人的id
                status: false
            };
            if(req.body.type === 'comment'){
                item.target_id = req.body.target_id; //回复的评论的id
            }
            let newCom = await CommentModel.create(item);
            if(newCom){
                let top = await TopicModel.findOneAndUpdate({_id: req.body._id},{$push:{replays: newCom._id},$set:{recently_reply_time: newCom.create_time}});
                if(top){
                    let socket = sockets.find(it => it.session === req.body.authid);
                    console.log(socket, so.sockets);
                    if(socket){
                        so.sockets[socket.socket].emit('sendComment',{commentid: newCom._id})
                    }
                    res.send(new BaseResult({code: 1, description:'回复成功', result: newCom}));
                }
            }
        }catch(err){
            res.send(new BaseResult({code: 0, description: err.message}))
        }
    }
    async queryCommentByUserId(req, res, next) {
        try{
            let comments = await CommentModel.find({authid: req.session.userid},'authid topic_id user_id status parent_type').populate('authid').populate('topic_id','title _id').populate('user_id');
            console.log(comments);
            res.send(new BaseResult({code: 1, description:'查询成功', result: comments}));
        }
        catch(error){
            res.send(new BaseResult({code: 0, description:error.message}));
        }

    }
}
export default new Comment();