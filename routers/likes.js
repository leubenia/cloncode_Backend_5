const express = require('express');
const router = express.Router();
const { sequelize } = require('../models');
const midware = require('../middlewares/middles')
const cget = require('./funpost');


/// 오호호홓 좋아요
router.post("/", midware, async (req, res) => {
  const { postId, like } = req.body; 
  const user = res.locals.user;
  console.log(like,postId)
  try {
    if(like){
        const post = 'INSERT into likes (postId, userId) values(:postId , :userId)';
        await sequelize.query(post, {
          replacements: { 
              postId : postId,
              userId : user.userId},
              type: sequelize.QueryTypes.INSERT
          });
        res.status(200).send({results : "success"});
    }
    else{
        const post = 'DELETE FROM likes WHERE userId = :userId and postId = :postId;';
        await sequelize.query(post, {
          replacements: { 
              postId : postId,
              userId : user.userId},
              type: sequelize.QueryTypes.DELETE
          });
        res.status(200).send({results : "success"});
    }
  } catch (err) {
    res.status(400).send({ 
      errorMessage: err,
      result:'fail'
    });
  }
});


router.get("/", midware, async (req, res) => {
  const user = res.locals.user;
  try {
    const posts = 'select posts.* from posts inner join likes on posts.postId = likes.postId where likes.userId = :userId;';
    await sequelize.query(post, {
      replacements: { 
          userId : user.userId},
          type: sequelize.QueryTypes.INSERT
      });
      for (post of posts) {
        const commentget = await cget.commentget(post.postId);
        post.comment = commentget;
        post.commentCnt = commentget.length;
        const likesget = await cget.likeget(post.postId);
        post.likeCnt = likesget.length;
      }
    res.status(200).send({
      results : "success",
      post: posts
  });
  } catch (err) {
    res.status(400).send({ 
      errorMessage: err,
      result:'fail'
    });
  }
});





module.exports = router;