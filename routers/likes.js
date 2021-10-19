const express = require('express');
const router = express.Router();
const { sequelize } = require('../models');
const midware = require('../middlewares/middles')


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


module.exports = router;