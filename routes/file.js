import express from 'express';
const router = express.Router();
import File from './../controller/file/file'

router.post('/upload', File.fileUpload)

module.exports = router;