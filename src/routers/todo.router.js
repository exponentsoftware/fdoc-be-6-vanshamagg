const { Router } = require('express');
const { addTodo, getAll, getOne, deleteTodo, changeCompletion, findFiltered, getStats } = require('../controllers/todo.controller');

const router = Router();

router.post('/', addTodo);
router.get('/filtered', findFiltered);
router.get('/stats/:id', getStats);
router.get('/:id', getOne);
router.get('/', getAll);
router.delete('/:id', deleteTodo);
router.put('/:id', changeCompletion);

module.exports = router;