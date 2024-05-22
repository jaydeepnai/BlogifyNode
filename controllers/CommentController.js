const Comment = require('../models/Comment');

const buildCommentHierarchy = async (commentId) => {
  const comment = await Comment.findById(commentId)
    .populate('author', 'username')
    .populate({
      path: 'parentComment',
      populate: { path: 'author', select: 'username' }
    })
    .lean();

  if (!comment) return null;

  if (comment.parentComment) {
    comment.parentComment = await buildCommentHierarchy(comment.parentComment._id);
  }

  return comment;
};

const getAllCommentsByPostId = async (postId) => {
  const comments = await Comment.find({ postId: postId, parentComment: { $exists: false } })
    .populate('author', 'username')
    .lean();
  const commentsWithHierarchy = await Promise.all(
    comments.map(async (comment) => {
      comment.children = await getChildComments(comment._id);
      return comment;
    })
  );

  return commentsWithHierarchy;
};

const getChildComments = async (parentId) => {
  const childComments = await Comment.find({ parentComment: parentId })
    .populate('author', 'username')
    .lean();

  const nestedChildComments = await Promise.all(
    childComments.map(async (childComment) => {
      childComment.children = await getChildComments(childComment._id);
      return childComment;
    })
  );

  return nestedChildComments;
};

const GetAllComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const comments = await getAllCommentsByPostId(postId);
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const CreateComment = async (req, res) => {
  try {
    req.body.postId = req.body.post
    delete req.body.post
    const newComment = await Comment.create(req.body);
    res.status(201).json(newComment);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

const DeleteComment = async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);

    if (!deletedComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  DeleteComment,
  CreateComment,
  GetAllComment,
};
