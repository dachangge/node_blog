import express from 'express';
import Comment from '../controller/comment/comment'
const router = express.Router();

router.post('/addComment', Comment.checkUser, Comment.addComment);

module.exports = router;
