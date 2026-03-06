const express = require('express');
const router = express.Router();
const roleCtrl = require('../controllers/roleController');

// GET all roles
router.get('/', roleCtrl.getAll);

// POST /api/v1/roles - create role
router.post('/', roleCtrl.create);

// GET role by id
router.get('/:id', roleCtrl.getById);

// PUT /api/v1/roles/:id - update role
router.put('/:id', roleCtrl.update);

// DELETE role (soft)
router.delete('/:id', roleCtrl.softDelete);

module.exports = router;
