const express = require('express');
const { registerUser, login, updateCountdown, getUserProfile } = require('../controllers/userController');
const { auth } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login);
router.get('/profile', auth, getUserProfile);
router.put('/countdown', auth, updateCountdown);
module.exports = router;
