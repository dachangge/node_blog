import users from './users';
import file from './file';

export default app => {
    app.use('/user', users);
    app.use('/file', file);
}