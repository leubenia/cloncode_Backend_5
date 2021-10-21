const express = require('express');
const router = express.Router();

const { sequelize } = require('../models');
const midware = require('../middlewares/middles');

//댓글 겟
router.get('/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const post =
      'select comments.comment , comments.commentId, users.userName, users.userId , users.profile from comments inner join users on users.userId = comments.userId where postId = :postId;';
    const comments = await sequelize.query(post, {
      replacements: {
        postId: postId
      },
      type: sequelize.QueryTypes.SELECT,
    });
    res.status(200).send({ result: 'success', comment : comments});
  } catch (error) {
    res.status(400).send({
      errorMessage: '댓글 작성 실패',
      result: 'fail',
    });
  }
});

//댓글 작성
router.post('/:postId', midware, async (req, res) => {
  try {
    const { postId } = req.params;
    const { comment } = req.body;
    const user = res.locals.user;
    console.log(postId, comment, user.userId);
    const post =
      'insert into comments (comment, postId, userId) values(:comment, :postId ,:userId);';
    await sequelize.query(post, {
      replacements: {
        comment: comment,
        postId: postId,
        userId: user.userId,
      },
      type: sequelize.QueryTypes.INSERT,
    });
    res.status(200).send({ result: 'success' });
  } catch (error) {
    res.status(400).send({
      errorMessage: '댓글 작성 실패',
      result: 'fail',
    });
  }
});

//댓글 삭제
router.delete('/:commentId', midware, async (req, res) => {
  try {
    const { commentId } = req.params;
    const user = res.locals.user;
    const post =
      'DELETE FROM comments WHERE commentId = :commentId and userId = :userId;';
    await sequelize.query(post, {
      replacements: {
        commentId: commentId,
        userId: user.userId,
      },
      type: sequelize.QueryTypes.DELETE,
    });
    res.status(200).send({ result: 'success' });
  } catch (error) {
    res.status(400).send({
      errorMessage: '댓글 삭제 실패.',
      result: 'fail',
    });
  }
});

//댓글 수정
router.patch('/:commentId', midware, async (req, res) => {
  try {
    const { commentId } = req.params;
    const { comment } = req.body;
    const user = res.locals.user;
    const post =
      'UPDATE comments SET comment = :comment WHERE commentId = :commentId AND userId = :userId;';
    await sequelize.query(post, {
      replacements: {
        comment: comment,
        commentId: commentId,
        userId: user.userId,
      },
      type: sequelize.QueryTypes.UPDATE,
    });
    res.status(200).send({ result: 'success' });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      errorMessage: '댓글 수정실패',
      result: 'fail',
    });
  }
});

module.exports = router;
