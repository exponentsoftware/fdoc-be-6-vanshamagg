const { Router } = require('express');
const { getUsersForToday } = require('../controllers/admin.controller');

const router = Router();

router.get('/users/today', getUsersForToday);

module.exports = router;