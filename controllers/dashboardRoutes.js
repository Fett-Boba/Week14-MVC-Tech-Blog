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

// Render page for deletes
router.get('/delete/:id', withAuth, async (req, res) => {
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
          res.render('dashboardDelete', { post, logged_in: req.session.logged_in });
     } catch (err) {
          console.log(err);
          res.status(500).json(err);
     }
});

// Render page for updates
router.get('/update/:id', withAuth, async (req, res) => {
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
          res.render('dashboardUpdate', { post, logged_in: req.session.logged_in });
     } catch (err) {
          console.log(err);
          res.status(500).json(err);
     }
});







module.exports = router;



