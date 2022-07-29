const express = require('express');
const { getAllUsers, registerUser, login } = require('../controllers/userController');
const router = express.Router();

router.route('/users').get(getAllUsers);
router.route('/register').post(registerUser);
router.route('/login').post(login);

module.exports = router;