const mongoose = require('mongoose');
const Post = require('../models/Post');

const connectDB = (url) => {

  // const fixPostLikesAndDislikes = async () => {
  //   try {
  //     const posts = await Post.find();
  //     for (const post of posts) {
  //       // if (!Array.isArray(post.likes)) {
  //         post.likes = [];
  //       // }
  //       // if (!Array.isArray(post.dislikes)) {
  //         post.dislikes = [];
  //       // }
  //       await post.save();
  //     }
  //     console.log('Successfully fixed likes and dislikes fields.');
  //     mongoose.disconnect();
  //   } catch (error) {
  //     console.error('Error fixing likes and dislikes fields:', error);
  //   }
  // };
  // fixPostLikesAndDislikes();
  return mongoose.connect(url);
};

module.exports = connectDB;
