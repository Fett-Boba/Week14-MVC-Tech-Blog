const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Create new post.
router.post('/', withAuth, async (req, res) => {
     try {
          postData = await Post.create({
               post_title: req.body.post_title,
               post_body: req.body.post_body,
               user_id: req.session.user_id,
          });
          res.status(200).json(postData);
     } catch (err) {
          console.log(err);
          res.status(500).json(err);
     }
});

module.exports = router;