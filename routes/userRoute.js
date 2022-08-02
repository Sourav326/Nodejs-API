const express = require('express');
const { getAllUsers, registerUser, login, logout } = require('../controllers/userController');
const router = express.Router();

router.route('/users').get(getAllUsers);
router.route('/register').post(registerUser);
router.route('/login').post(login);
router.route('/logout').get(logout);

module.exports = router;