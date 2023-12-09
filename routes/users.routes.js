const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');


// router.post('/', validate(postUserSchema), usersController.addUser);
router.post('/', usersController.addUser);
router.get('/', usersController.getUsers);
router.get('/me', usersController.getMe);
router.get('/search', usersController.search);
router.get('/:userId', usersController.getUserById);
router.put('/:userId', usersController.updateUser);
router.delete('/:userId', usersController.deleteUser);


module.exports = router; 