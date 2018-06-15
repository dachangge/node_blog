import express from 'express';
const router = express.Router();
import Topic from '../controller/topic/topic';

router.post('/queryTopicType', Topic.queryTopicType);
router.post('/insertTopic', Topic.checkUser, Topic.insertTopic);
router.post('/queryTopicById', Topic.queryTopicById);
router.post('/queryTopicByType',Topic.queryTopicByType);
module.exports = router;