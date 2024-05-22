const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desciption: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  slug: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  categories: [{type: String}],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  tags: [{type: String}],
  publishedAt: { type: Date },
  views: { type: Number, default: 0 },
});



module.exports = mongoose.model('Post', PostSchema);
