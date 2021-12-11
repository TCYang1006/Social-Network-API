const router = require('express').Router();
const thoughtsRoutes = require('./thoughts.js');
const usersRoutes = require('./users.js');

router.use('/thoughts', thoughtsRoutes);
router.use('/users', usersRoutes);

module.exports = router;