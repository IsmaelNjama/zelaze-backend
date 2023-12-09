const express = require('express');
const router = express.Router();


// const validate = require('../utils/schemaValidate');
// const postUserSchema = require('../schema/users/postUser.schema');
const authController = require('../controllers/auth.controller');



router.post('/login', authController.loginUser);
router.post('/register', authController.registerUser);
// router.post('/register', validate(postUserSchema), authController.registerUser);


module.exports = router;