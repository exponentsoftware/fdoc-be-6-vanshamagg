const { Router } = require('express');
const { addUser, getTodos, signin, getCompletedTasks } = require('../controllers/user.controller');
const passport = require('passport');

const router = Router();

router.post('/signin', passport.authenticate('local', { session: false }), signin);
router.get('/completed/:id', getCompletedTasks)
router.get('/:id', getTodos);
router.post('/', addUser);

module.exports = router;