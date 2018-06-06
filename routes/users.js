import express from 'express';
const  router = express.Router();
import User from '../controller/user/user';

/* GET users listing. */
router.get('/show', User.getAdminInfo);
router.get('/query', User.queryAdmins);
router.post('/create', User.createUser);

module.exports = router;
