import express from 'express';
import Comment from '../controller/comment/comment'
const router = express.Router();

router.post('/addComment', Comment.checkUser, Comment.addComment);
router.post('/queryCommentByUserId', Comment.checkUser, Comment.queryCommentByUserId);
router.post('/readComment',Comment.readComment)

module.exports = router;
