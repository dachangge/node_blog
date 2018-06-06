import express from 'express';
import router from './routes/index';
import bodyParser from 'body-parser';
import connectMongo from 'connect-mongo';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';

import db from './mongodb/db';

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

const MongoStore =  connectMongo(expressSession);
app.use(cookieParser());
app.use(expressSession({
    name: 'vueblog',
    secret: 'user_id',
    resave: true,
    saveUninitialized: false,


}))


app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('hello world');
});
router(app);

app.listen(3000, () => {
    console.log('监听成功,端口3000');
})
