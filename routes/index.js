import users from './users';
import file from './file';
import topic from './topic';


export default app => {
    app.use('/user', users);
    app.use('/file', file);
    app.use('/topic', topic)
}