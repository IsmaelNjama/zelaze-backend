const express = require('express');
const router = express.Router();
const entriesController = require('../controllers/entries.controller');

// router.post('/', validate(postUserSchema), usersController.addUser);
router.post('/', entriesController.addEntry);
router.get('/', entriesController.getEntries);
router.get('/search', entriesController.search);
router.get('/:entryId', entriesController.getEntryById);
router.put('/:entryId', entriesController.updateEntry);
router.delete('/:entryId', entriesController.deleteEntry);

module.exports = router;
