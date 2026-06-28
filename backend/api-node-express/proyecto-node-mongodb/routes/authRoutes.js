const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const { protegerRuta } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protegerRuta, getMe);

module.exports = router;
