const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Get all posts by user 
router.get('/', withAuth, async (req, res) => {
     try {
          const userPost = await User.findOne({
               where: {
                    id: req.session.user_id
               },
               attributes: ['id', 'username'],
               include: [
                    {
                         model: Post,
                         attributes: ['id', 'post_title', 'post_body', 'post_date', 'user_id'],
                    },
               ],
          });
          const userPosts = userPost.get({ plain: true });
          res.render('dashboard', { userPosts, logged_in: true, });

     } catch (err) {
          console.log(err);
          res.status(500).json(err);
     }
});

// Render page to add new post
router.get("/add", (req, res) => {
     res.render("dashboardAdd", {
          logged_in: true,
     });
});




















module.exports = router;



