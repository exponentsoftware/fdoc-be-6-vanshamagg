
require('../strategies');
const { parse } = require('dotenv');
const jwt = require('jsonwebtoken');
const { User, Todo } = require('../database');


//  create a user
async function addUser(req, res) {
  try {
    const { username, name, email, phone, password } = req.body;

    const user = await User.create({
      username,
      name,
      email,
      phone,
      password
    });

    res.status(201).json({ message: 'created user', user });

  } catch (error) {

    console.log(error);
    res.status(500).json({ error });
  }
}

// get todos of a user
async function getTodos(req, res) {
  try {
    const { id } = req.params;
    const { limit, offset } = req.query;

    const todos = await Todo.find({ user: id })
      .limit(parseInt(limit))
      .skip(parseInt(offset));

    res.status(201).json({ todos });
  } catch (error) {
    console.error(error);
  }
}

// signin
async function signin(req, res) {
  try {
    const user = req.user;
    const payload = { _id: user._id };
    const token = await jwt.sign(payload, process.env.JWT_SECRET);
    return res.json({ success: true, token });
  } catch (error) {

  }
}

// 
async function getCompletedTasks(req, res, next) {
  try {

    const { id } = req.params;
    const completedTasks = await Todo.find({ user: id, completed: true });
    return res.json({ completed_tasks: completedTasks });

  } catch (error) {
    if (error) next(error);
  }
}
module.exports = { addUser, getTodos, signin, getCompletedTasks };