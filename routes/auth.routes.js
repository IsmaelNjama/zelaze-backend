const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const signupUsersSchema = require('../utils/schema/signupUsers.schema');
const validate = require('../utils/schemaValidate');

router.post('/login', authController.loginUser);
router.get('/login', authController.getCurrentUser);
router.post(
	'/register',
	validate(signupUsersSchema),
	authController.registerUser
);

module.exports = router;
