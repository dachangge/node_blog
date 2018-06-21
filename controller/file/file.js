import {BaseResult} from "../../prototype/baseResult";
import formidable from 'formidable';
import qiniu from 'qiniu';
import fs from 'fs';

qiniu.conf.ACCESS_KEY  = '3NTKbB81LGP6ohL97oQgtRW1UOv9Y2rqvYKjYGb4';
qiniu.conf.SECRET_KEY  = '1DTaM7dxby1isbd-eapJtAz2ilvAVlscyRyLJfPH';

const bucket = 'node-blog';
const HOST = 'http://paaw1qnws.bkt.clouddn.com/';

class File{
    constructor() {
        this.fileUpload = this.fileUpload.bind(this);
        this.qiqiu = this.qiqiu.bind(this);
    }
    uptoken(key){
        let putPolicy = new qiniu.rs.PutPolicy(bucket+ ":" +key);
        return putPolicy.token();
    }
    async uploadFile(uptoken, key, localFile){
        return new Promise((resolve,reject) => {
            let extra = new qiniu.io.PutExtra();
            qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
                if(!err) {
                    // 上传成功， 处理返回值
                    // console.log(ret,ret.hash, ret.key, ret.persistentId);
                    resolve(ret);
                } else {
                    // 上传失败， 处理返回代码
                    // console.log(err);
                    reject(err);
                }
            });
        })

    }
   async qiqiu(file){
    return new Promise((resolve, reject)=>{
           let key = new Date().getTime()+ '_' + file.name;
           fs.renameSync(file.path, 'public/images/' + key);
           let token = this.uptoken('public/images/' + key);
           this.uploadFile(token,'public/images/'+key,'public/images/' + key).then(r => {
               fs.unlink('public/images/' + key)
               resolve(new BaseResult({code: 1, description: '上传文件成功', result: {
                       url: HOST+ r.key
                   }}));
           }).catch(error => {
               resolve(new BaseResult({code: 0, description: error.message}));
           });
        })
    }
    async fileUpload(req, res, next) {
        console.log(this);
        let form =new formidable.IncomingForm();
        form.uploadDir = './public/images';
        form.parse(req,(err, fields, files) => {
            if(err){
                res.send(new BaseResult({code: 0, description: '文件解析失败'}));
                return ;
            }
            if(files && files.file){
                let file = files.file;
                this.qiqiu(file).then(r => {
                    res.send(r);
                }).catch((e)=> {
                    res.send(new BaseResult({code: 0, description: e.message}));
                })
            }
            else{
                res.send(new BaseResult({code: 0, description: '文件解析失败'}));
                return ;
            }
        })
    }
}
export default new File();