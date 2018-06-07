import express from 'express';
const  router = express.Router();
import User from '../controller/user/user';

/* GET users listing. */
router.post('/create', User.createUser);
router.post('/checkUser', User.checkUser);
router.post('/saveUser', User.saveUser);
router.post('/changePsd', User.changePsd);

module.exports = router;
