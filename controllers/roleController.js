const Role = require('../schemas/role');

// create a role
exports.create = async (req, res, next) => {
  try {
    const payload = req.body;
    const role = new Role(payload);
    await role.save();
    res.status(201).json(role);
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message
    });
  }
};

// get all roles
exports.getAll = async (req, res, next) => {
  try {
    const roles = await Role.find({ isDeleted: false });
    res.json(roles);
  } catch (err) {
    next(err);
  }
};

// get role by id
exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const role = await Role.findOne({ _id: id, isDeleted: false });
    if (!role) return res.status(404).json({ message: 'Role not found' });
    res.json(role);
  } catch (err) {
    next(err);
  }
};

// update role
exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const role = await Role.findOneAndUpdate({ _id: id, isDeleted: false }, payload, { new: true });
    if (!role) return res.status(404).json({ message: 'Role not found' });
    res.json(role);
  } catch (err) {
    next(err);
  }
};

// soft delete role
exports.softDelete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const role = await Role.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!role) return res.status(404).json({ message: 'Role not found' });
    res.json({ message: 'Role soft deleted', role });
  } catch (err) {
    next(err);
  }
};
