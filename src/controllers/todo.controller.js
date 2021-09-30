const { Todo, Stat } = require('../database');

async function addTodo(req, res) {
  console.log('--- IN ---');

  try {
    const { username, title, author, completed, category, user } = req.body;

    const todo = await Todo.create({
      username,
      title,
      author,
      completed,
      category,
      user
    });

    const stat = await Stat.create({
      todo: todo.id,
    });

    console.log(todo, stat);
    res.status(301).json({ message: 'created', _id: todo.id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'INTERNAL SERVER ERROR' });
  }
}

async function getAll(req, res) {
  try {
    const todos = await Todo.find();
    res.status(201).json({ todos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'INTERNAL SERVER ERROR' });
  }
}

async function getOne(req, res) {
  try {
    const id = req.params.id;
    const todo = await Todo.findById(id);
    incrementViews(todo);
    res.status(201).json(todo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'INTERNAL SERVER ERROR' });
  }
}

async function deleteTodo(req, res) {
  try {
    const id = req.params.id;
    await Todo.deleteOne({ _id: id });
    res.status(201).json({ message: 'deleted', id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'INTERNAL SERVER ERROR' });
  }
}

async function update(req, res) {

}

// 3
async function changeCompletion(req, res) {

  const { id } = req.params;
  const { completed } = req.body;

  const todo = await Todo.findByIdAndUpdate(id, { completed });

  return {
    message: 'Updated Successfully',
    todo
  };

}

// 1
async function findFiltered(req, res) {
  const { title, category } = req.query;

  let todos = [];

  if (title) todos = await Todo.find({ title });
  else if (category) todos = await Todo.find({ category });

  if (todos.length) {
    return res.json({ todos });
  }

}

// get stats
async function getStats(req, res, next) {
  try {
    const { id } = req.params;
    const stat = await Stat.find({ todo: id });
    res.status(200).json({ stat });
  } catch (error) {
    next(error);
  }
}

async function incrementViews(todo) {
  try {
    const todoId = todo.id;
    const stat = await Stat.findOne({ todo: todoId }).select('views');
    stat.views++;
    await Stat.updateOne({ _id: stat.id }, stat);
    console.log(' -- views incremented by one --');
  } catch (error) {
    console.log(error);
  }

}

async function incrementLikes() {
  try {
    const todoId = todo.id;
    const stat = await Stat.where({ todo: todoId }).select('likes');
    stat.likes++;
    await Stat.updateOne({ _id: stat.id }, stat);
    console.log(' -- likes incremented by one --');
  } catch (error) {
    console.log(error);

  }
}
module.exports = { addTodo, getAll, getOne, deleteTodo, changeCompletion, findFiltered, getStats };