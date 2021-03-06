import express from 'express';
const  router = express.Router();
import User from '../controller/user/user';

/* GET users listing. */
router.post('/create', User.createUser);
router.post('/checkUser', User.checkUser);
router.post('/saveUser', User.saveUser);
router.post('/changePsd', User.changePsd);
router.post('/login', User.userLogin);
router.post('/loginOut', User.userLoginOut);
router.post('/headerUrlUpload', User.headerUrlUpload)

module.exports = router;
