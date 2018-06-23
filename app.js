import express from 'express';
import router from './routes/index';
import bodyParser from 'body-parser';
import connectMongo from 'connect-mongo';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';
import path from 'path';
import socket from 'socket.io'
import http from 'http';

import './mongodb/db';

const app = new express();

app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.Origin || req.headers.origin );
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true); //可以带cookies
    res.header("X-Powered-By", '3.2.1')
    if (req.method == 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});

app.use(cors({
        credentials: true,
        origin: 'http://localhost:8081', // web前端服务器地址
}))
const MongoStore =  connectMongo(session);
app.use(cookieParser('SID'));
app.use(session({
    name: 'SID',
    secret: 'SID',
    resave: true,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure:   false,
        maxAge:   7 * 24 * 60 * 60 * 1000,
    },
    store: new MongoStore({
        url: 'mongodb://localhost:27017/demo'
    })

}))



app.use(bodyParser.json());

// app.get('/', (req, res) => {
//     res.send('hello world');
// });
router(app);
app.use(express.static(path.join(__dirname, 'dist')))





const server = app.listen(3000, () => {
    console.log('监听成功,端口3000');
})

//SOCKET.IO

const io = socket.listen(server);
export let sockets = [];
export const so = io.on('connection', (socket) => {
    //接收并处理客户端的hi事件
    socket.on('loginin', function(data) {
        sockets.push({session: data, socket: socket.id});
        console.log(sockets);
        socket.emit('c_hi',socket.id);
    })

    //断开事件
    socket.on('disconnect', function(data) {
        console.log('断开',data)
        let idx = sockets.findIndex(it => it.socket == socket.id);
        if(idx !== -1)
            sockets.splice(idx,1);
        socket.emit('c_leave','离开');
    })
})
