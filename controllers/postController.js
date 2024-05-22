const Post = require('../models/Post');

const CreateBlogPost =  async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    console.log(error.message)
    res.status(400).json({ error: error.message });
  }
};


const GetAllBlogs =  async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username email');
    res.json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const IncrementPostViews = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json({views:post.views});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



const GetBlog = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username email')
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const GetBlogsbyAuthorID = async (req, res) => {
  try {
    const post = await Post.find({author:req.params.id}).populate('author', 'username email')
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const UpdateBlog =  async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const LikePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    console.log(req.body)
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.likes.includes(userId)) {
      return res.status(200).json({ likesCount: post.likes.length, dislikesCount: post.dislikes.length });
    }

    if (post.dislikes.includes(userId)) {
      post.dislikes.pull(userId);
    }

    post.likes.push(userId);

    await post.save();

    res.json({ likesCount: post.likes.length, dislikesCount: post.dislikes.length });
  } catch (error) {
    console.error('Error during like operation:', error);
    res.status(400).json({ error: 'An error occurred while liking the post.' });
  }}

const DislikePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const post = await Post.findById(id);
    console.log(req.body)
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.dislikes.includes(userId)) {
      return res.status(200).json({ likesCount: post.likes.length, dislikesCount: post.dislikes.length });
    }

    if (post.likes.includes(userId)) {
      post.likes.pull(userId);
    }

    post.dislikes.push(userId);

    await post.save();

    res.json({likesCount: post.likes.length,dislikesCount:post.dislikes.length   });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const DeleteBlog =  async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



module.exports = {
  CreateBlogPost,
  GetAllBlogs,
  GetBlog,
  DeleteBlog,
  UpdateBlog,
  GetBlogsbyAuthorID,
  IncrementPostViews,
DislikePost ,
LikePost}