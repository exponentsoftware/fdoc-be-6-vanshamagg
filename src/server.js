require('./database');
const express = require('express');
const passport = require('passport');
const cors = require('cors');
const TodoRouter = require('./routers/todo.router');
const UserRouter = require('./routers/user.router');
const AdminRouter = require('./routers/admin.router');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/static', express.static(__dirname + '/static'));

app.use(passport.initialize());

app.use('/todo', TodoRouter);
app.use('/user', UserRouter);
app.use('/admin', AdminRouter);

app.use('/', (req, res) => {
  res.json({ status: 'ok' });
});


const server = app.listen(3000, () => console.log(`APP STARTED ON PORT ${ server.address().port } `));