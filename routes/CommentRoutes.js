const express = require('express');
const router = express.Router();
const {
  authenticateUser,
} = require('../middleware/authentication');

const {
  DeleteComment,
  CreateComment,
  GetAllComment,
} = require('../controllers/CommentController');

router
  .route('/')
  .post(CreateComment);

router.route('/:id').get(GetAllComment);

router
  .route('/:id')
  .delete(DeleteComment)

module.exports = router;
