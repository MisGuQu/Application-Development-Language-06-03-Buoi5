const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController');

// GET /api/v1/users - list all non-deleted users
router.get('/', userCtrl.getAll);

// POST /api/v1/users - create user
router.post('/', userCtrl.create);

// GET /api/v1/users/:id
router.get('/:id', userCtrl.getById);

// PUT /api/v1/users/:id - update user
router.put('/:id', userCtrl.update);

// DELETE /api/v1/users/:id (soft delete)
router.delete('/:id', userCtrl.softDelete);

// POST /api/v1/users/enable
router.post('/enable', userCtrl.enable);

// POST /api/v1/users/disable
router.post('/disable', userCtrl.disable);

module.exports = router;
