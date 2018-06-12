import express from 'express';
const router = express.Router();
import Topic from '../controller/topic/topic';

router.post('/insertTopic', Topic.checkUser, Topic.insertTopic);

module.exports = router;