const express = require('express');
const router = express.Router();
// const {sequelize} = require('../models');
const midware = require('../middlewares/middles')

//추가한 부분
const mysql = require('mysql');
const util = require('util');
const sequelize = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});
sequelize.query = util.promisify(sequelize.query);


//댓글 작성
router.post('/:postId',midware ,async (req, res) => {
    try {
      const { postId } = req.params;
      const {comment} = req.body;
      const user = res.locals.user;
      const iscomment = {
        comment : comment,
        postId : postId,
        userId : user.Id,
      }
      const post = 'INSERT INTO comment set ?;';
      await sequelize.query(post, iscomment);
      
      res.status(200).send({ result: 'success'});
    } catch (error) {
      res.status(400).send({
        errorMessage: '전체 게시글 조회에 실패했습니다.',
        result:'fail'
      });
    }
});

//댓글 삭제
router.delete('/:postId',midware ,async (req, res) => {
    try {
      const { postId } = req.params;
      const user = res.locals.user;
      const iscomment = [postId, user.Id]
      const post = 'DELETE FROM comments WHERE postId = ? and  userId = ?;';
      await sequelize.query(post, iscomment);
      res.status(200).send({ result: 'success',  });
    } catch (error) {
      res.status(400).send({
        errorMessage: '전체 게시글 조회에 실패했습니다.',
        result:'fail'
      });
    }
});

//댓글 수정
router.patch('/:postId',midware ,async (req, res) => {
    try {
      const { postId } = req.params;
      const {comment} = req.body;
      const user = res.locals.user;
      const iscomment = [ comment, postId, user.Id]
      const post = 'UPDATE comments SET comment = ? WHERE commentId = ? AND userId = ?;';
      await sequelize.query(post, iscomment);
      res.status(200).send({ result: 'success',  });
    } catch (error) {
      res.status(400).send({
        errorMessage: '전체 게시글 조회에 실패했습니다.',
        result:'fail'
      });
    }
});
module.exports = router;