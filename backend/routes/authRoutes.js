const express = require('express');
const { register, login, logout } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/protected', authMiddleware, (req, res) => {
  res.status(200).json({ message: `Erişim başarılı, Hoşgeldin ${req.session.user.username}` });
});
router.post('/logout', logout);

module.exports = router;
