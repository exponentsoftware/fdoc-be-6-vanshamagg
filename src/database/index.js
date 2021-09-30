const mongoose = require('mongoose');
const TodoSchema = require('./todo.schema');
const UserSchema = require('./user.schema');
const StatSchema = require('./stats.schema');

async function main() {
  await mongoose.connect(process.env.DATABASE_URI)
    .then(() => console.log(' --- DATABASE CONNECTED --'))
    .catch(err => console.log('-- ERROR WHILE CONNECTING TO DATABASE --', err));

}

main();

const Todo = mongoose.model('Todo', TodoSchema);
const User = mongoose.model('User', UserSchema);
const Stat = mongoose.model('Stat', StatSchema);

module.exports = { Todo, User, Stat };
