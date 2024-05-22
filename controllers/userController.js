const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const {
  createTokenUser,
  attachCookiesToResponse,
  checkPermissions,
} = require('../utils');

const getAllUsers = async (req, res) => {
  console.log(req.user);
  const users = await User.find({ role: 'user' }).select('-password');
  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const userPosts = await Post.find({ author: user._id }).populate('categories');
    user.posts = userPosts;
    checkPermissions(req.user, user._id);
    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {

  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updatedUser) {
    return res.status(404).json({ error: 'User not found' });
  }
  const tokenUser = createTokenUser(updatedUser);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};


module.exports = {
  getAllUsers,
  getSingleUser,
  updateUser,
};
