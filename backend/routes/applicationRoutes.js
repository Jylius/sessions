const express = require('express');
const { createUser, getUsers, deleteUser, updateUser } = require('../controllers/applicationController');
const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);

router.put('/:id',updateUser);

router.delete('/:id',deleteUser);

module.exports = router;
