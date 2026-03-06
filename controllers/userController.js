const User = require('../schemas/user');

// get all users (excluding soft-deleted)
exports.getAll = async (req, res, next) => {
  try {
    const users = await User.find({ isDeleted: false }).populate('role');
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// get user by id
exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id, isDeleted: false }).populate('role');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// create a user
exports.create = async (req, res, next) => {
  try {
    const payload = req.body;
    const user = new User(payload);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

// update user
exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const user = await User.findOneAndUpdate({ _id: id, isDeleted: false }, payload, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// soft delete user
exports.softDelete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User soft deleted', user });
  } catch (err) {
    next(err);
  }
};

// enable user by email+username
exports.enable = async (req, res, next) => {
  try {
    const { email, username } = req.body;
    if (!email || !username) {
      return res.status(400).json({ message: 'Email and username required' });
    }
    const user = await User.findOne({ email, username });
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.status = true;
    await user.save();
    res.json({ message: 'User enabled', user });
  } catch (err) {
    next(err);
  }
};

// disable user by email+username
exports.disable = async (req, res, next) => {
  try {
    const { email, username } = req.body;
    if (!email || !username) {
      return res.status(400).json({ message: 'Email and username required' });
    }
    const user = await User.findOne({ email, username });
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.status = false;
    await user.save();
    res.json({ message: 'User disabled', user });
  } catch (err) {
    next(err);
  }
};
