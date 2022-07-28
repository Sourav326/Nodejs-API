const express = require('express');
const { getAllUsers, registerUser } = require('../controllers/userController');
const router = express.Router();

router.route('/users').get(getAllUsers);
router.route('/register').post(registerUser);

module.exports = router;