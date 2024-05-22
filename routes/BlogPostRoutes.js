const express = require('express');
const router = express.Router();
const {
  CreateBlogPost,
  GetAllBlogs,
  GetBlog,
  DeleteBlog,
  UpdateBlog,
  GetBlogsbyAuthorID,
  IncrementPostViews,
DislikePost ,
LikePost 
} = require('../controllers/postController');

router.route('/').post(CreateBlogPost).get(GetAllBlogs);

router
  .route('/:id')
  .get(GetBlog)
  .patch(UpdateBlog)
  .delete(DeleteBlog);
router.route('/addingViews/:id').post(IncrementPostViews)
router.route('/like/:id').post(LikePost)
router.route('/dislike/:id').post(DislikePost)
router.route("/author/:id").get(GetBlogsbyAuthorID)

module.exports = router;
