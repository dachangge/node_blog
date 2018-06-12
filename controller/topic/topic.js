import {BaseResult} from "../../prototype/baseResult";
import TopicModel from '../../models/topic/topic'
import {BaseComponent} from "../../prototype/baseComponent";
class Topic extends BaseComponent{
    async insertTopic(req, res , next){
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

    }
}
export default new Topic();