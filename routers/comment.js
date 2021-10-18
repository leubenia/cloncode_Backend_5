const express = require('express');
const router = express.Router();
const {sequelize} = require('../models');

//댓글 작성
router.post('/:postId', async (req, res) => {
    try {
      const { postId } = req.params;
      const {comment} = req.body; 
      const iscomment = {
        comment : comment,
        postId : postId,
      }
      const post = 'INSERT INTO comment set ?;';
      await sequelize.query(post, iscomment);
      
      res.status(200).send({ result: 'success',  });
    } catch (error) {
      res.status(400).send({
        errorMessage: '전체 게시글 조회에 실패했습니다.',
        result:'fail'
      });
    }
  });