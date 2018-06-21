import {BaseResult} from "../../prototype/baseResult";
import TopicModel from '../../models/topic/topic'
import TopictypeModel from '../../models/topictype/topictype';
import UserModel from '../../models/user/user';
import CommentModel from '../../models/comment/comment'
import {BaseComponent} from "../../prototype/baseComponent";
class Topic extends BaseComponent{
    async queryTopicType(req, res, next){
        try{
            TopictypeModel.find(null, {name: 1, _id: 0, type: 1}, (err,docs) => {
                if(!err){
                    res.send(new BaseResult({code: 1, description: '查询成功', result: docs}));
                }else{
                    res.send(new BaseResult({code: 0, description: err.message}));
                }
            })
        }
        catch(e){
            res.send(new BaseResult({code: 0, description: e.message}));
        }
    }
    async insertTopic(req, res, next){
        try{
            if(!req.body.type){
                throw new Error('请选择模块');
            }
            else if(!req.body.title || req.body.title.length < 10){
                throw new Error('请输入标题,必须输入十字以上');
            }
            else if(!req.body.content){
                throw new Error('请输入内容');
            }
        }catch (e) {
            res.send(new BaseResult({code: 0, description: e.message}));
        }
        try{
            TopicModel.create({
                create_time: new Date(),
                content: req.body.content,
                user_id: req.session.userid,
                likes: [],
                replays: [],
                tags: [],
                looks: 0,
                title: req.body.title,
                type: req.body.type,
                recently_reply_time: new Date()
            },(err, doc) => {
                if (err) {
                    res.send(new BaseResult({code: 0, description: '服务器异常'}));
                } else {
                    res.send(new BaseResult({code: 1, description: '话题发布成功', result: {_id: doc._id}}));
                }
            })
        }catch (e) {
            res.send(new BaseResult({code: 0, description: e.message}));
        }
    }
    async queryTopicById(req, res, next){
        try{
            let doc = await TopicModel.findOneAndUpdate({_id: req.body.id},{$inc:{looks: 1}}).populate('user_id').populate('likes').populate({
                path: 'replays',
                populate:{
                    path: 'user_id'
                }
            });
            res.send(new BaseResult({code: 1, description: '查询成功', result: doc}))
        }catch (e) {
            res.send(new BaseResult({code: 0, description: e.message}));
        }

    }
    async queryTopicByType(req, res, next){
        let item = {type: req.body.type};
        if(req.body.type === 'all'){
            item = {};
        }
        try{
            let count = await TopicModel.count(item);
            let topics = await TopicModel.find(item,'user_id tags replays type looks title recently_reply_time').sort({recently_reply_time: -1}).populate('user_id');
            res.send(new BaseResult({code: 1, result: {list: topics, count: count}}));
        }catch(e){
            res.send(new BaseResult({code: 0, description: e.message}));
        }
    }
}
export default new Topic();