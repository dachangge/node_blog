import users from './users';
import file from './file';
import topic from './topic';
import comment from "./comment";


export default app => {
    app.use('/user', users);
    app.use('/file', file);
    app.use('/topic', topic);
    app.use('/comment', comment)
}