import {BaseResult} from "../../prototype/baseResult";
import formidable from 'formidable';
import qiniu from 'qiniu';
import fs from 'fs';

qiniu.conf.ACCESS_KEY = 'Ep714TDrVhrhZzV2VJJxDYgGHBAX-KmU1xV1SQdS';
qiniu.conf.SECRET_KEY = 'XNIW2dNffPBdaAhvm9dadBlJ-H6yyCTIJLxNM_N6';

const bucket = 'node-elm';


class File{
    constructor() {
        this.fileUpload = this.fileUpload.bind(this);
    }
    uptoken(bucket, key){
        let putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
        return putPolicy.token();
    }
    async uploadFile(uptoken, key, localFile){
        let extra = new qiniu.io.PutExtra();
        qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
            if(!err) {
                // 上传成功， 处理返回值
                console.log(ret,ret.hash, ret.key, ret.persistentId);
            } else {
                // 上传失败， 处理返回代码
                console.log(err);
            }
        });
    }
   async fileUpload(req, res, next){
       let form =new formidable.IncomingForm();
       form.uploadDir = './public/images';
       form.parse(req,(err, fields, files) => {
           if(err){
               res.send(new BaseResult({code: 0, description: '文件解析失败'}));
               return ;
           }
           if(files && files.file){
               let file = files.file;
               let key = new Date().getTime()+ '_' + file.name;

                fs.renameSync(files.file.path, 'public/images/' + key);
                let token = this.uptoken(bucket,'public/images/' + key);
                let qiniuImg = this.uploadFile(token,key,'public/images/' + key);
               console.log(qiniuImg)
               // fs.writeFile(file, (err) => {
               //     if(!err){
               //         res.send(new BaseResult({code: 1,description: '成功写入'}))
               //     }
               // })

           }
           else{
               res.send(new BaseResult({code: 0, description: '文件解析失败'}));
               return ;
           }
       })
    }
}
export default new File();