const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Get post by by ID.
router.get('/:id', withAuth, async (req, res) => {
     try {
          const postData = await Post.findByPk(req.params.id, {
               include: [
                    {
                         model: Comment, attributes: ['user_id', 'comment_body', 'comment_date'],
                         include: [{ model: User, attributes: ['username'] }],
                    },
                    {
                         model: User, attributes: ['username']
                    },
               ],
          });
          const post = postData.get({ plain: true });
          res.render('homepageComment', { post, logged_in: req.session.logged_in });
     } catch (err) {
          console.log(err);
          res.status(500).json(err);
     }
});


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

// Delete post by ID. 
router.delete('/:id', withAuth, async (req, res) => {
     try {
          const postData = await Post.destroy({
               where: {
                    id: req.params.id,
               },
          });
          res.status(200).json(postData);
     } catch (err) {
          console.log(err);
          res.status(500).json(err);
     }
});

// Update existing post
router.put('/:id', withAuth, async (req, res) => {
     try {
          postData = await Post.update({
               post_title: req.body.post_title,
               post_body: req.body.post_body,
          },
               { where: { id: req.params.id } }
          );
          res.status(200).json(postData);
     } catch (err) {
          console.log(err);
          res.status(500).json(err);
     }
});

module.exports = router;