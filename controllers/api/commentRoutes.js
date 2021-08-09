const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Add comment to existing post
router.post('/', withAuth, async (req, res) => {
     try {
          commentData = await Comment.create({
               comment_body: req.body.comment_body,
               user_id: req.session.user_id,
               post_id: req.body.post_id,
          });
          res.status(200).json(commentData);
     } catch (err) {
          console.log(err);
          res.status(500).json(err);
     }
});

module.exports = router;