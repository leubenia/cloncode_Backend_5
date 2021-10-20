const express = require('express');
const router = express.Router();
const { posts, sequelize, Sequelize } = require('../models');
// const authMiddleware = require('../middlewares/middels');
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const path = require('path');
const midware = require('../middlewares/middles');
const cget = require('./funpost');
require('date-utils');


AWS.config.update({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: 'ap-northeast-2',
});

// 이미지 업로드
const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: process.env.bucket,
    key(req, file, cb) {
      cb(null, `original/${Date.now()}${path.basename(file.originalname)}`);
    },
    acl: 'public-read-write',
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// 게시물 조회, 좋아요 기능 추가해야 함.
router.get('/', async (req, res) => {
  try {
    const userId_join = `
      SELECT p.*, u.profile 
      FROM posts AS p 
      JOIN users AS u 
      ON p.userId = u.userId 
      ORDER BY p.postId DESC;`;

    const posts = await sequelize.query(userId_join, {
      type: Sequelize.QueryTypes.SELECT,
    });
    for (post of posts) {
      const commentget = await cget.commentget(post.postId)
      post.comment = commentget;
      post.commentCnt = commentget.length;
      const likesget = await cget.likeget(post.postId);
      post.likeCnt = likesget.length;
    }
    res.send({ posts: posts });
  } catch (error) {
    console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
    res.status(400).send({
      errorMessage: '전체 게시글 조회에 실패했습니다.',
    });
  }
});

// 게시글 등록 resizeURL구현해야함
router.post('/', midware, upload.single('image'), async (req, res) => {
      try {
        const { user } = res.locals; 
        const { content } = req.body;
        const postDate = new Date();
        const insertDt = postDate.toFormat('YYYY-MM-DD HH24:MI:SS')
        if (req.file) {
          const originalUrl = req.file.location; 
        //   const resizeUrl = originalUrl.replace(/\/original\//, '/thumb/');
          const post = await posts.create({ 
              userId: user.userId, 
              content: content, 
              image: originalUrl, 
              insertDt: insertDt, 
              userName: user.userName});
          res.send({ post: post, user: user, result: 'success' });
        } else {
          const post = await posts.create({ 
              userId: user.userId, 
              content: content, 
              image: '', 
              insertDt: insertDt, 
              userName: user.userName});
          res.send({ post: post, user: user, result: 'success' });
        } 
      } catch (error) {
        console.log(error)
        res.status(401).send({ result: 'fail', errorMessage: '게시글 작성에 실패하였습니다.' });
      }
    });

// 게시글 수정
router.patch('/:postId', midware, upload.single('image'), async (req, res) => {
    try {
    const s3 = new AWS.S3(); 
    const postId = req.params.postId;
    const { userId } = res.locals.user;
    const { content } = req.body;
    if (req.file) {
      const postInfo = await posts.findOne({ where: { postId, userId } });
      if (postInfo) {
        const beforeImage = postInfo.image.split('/')[4];

        s3.deleteObject(
          {
            Bucket: process.env.bucket,
            Key: `original/${beforeImage}`,
          },
          (err, data) => {
            if (err) {
              throw err;
            }
          }
        );
        // s3.deleteObject({
        //     Bucket: process.env.bucket,
        //     Key: `thumb/${beforeImage}`,
        //     },
        //     (err, data) => {
        //     if (err) { throw err; }
        //     }
        // );

        const originalUrl = req.file.location;

        await posts.update(
          {
            content: content,
            image: originalUrl,
          },
          { where: { postId: postId, userId: userId } }
        );
        res.send({ result: '게시글을 수정하였습니다.' });
      } else {
        res.status(400).send({ result: '게시글 수정 실패 되었습니다.' });
      }
    } else {
        const postInfo = await posts.findOne({ where: { postId, userId } });
        if (postInfo) {
        await postInfo.update(
            {
            content: content,
            image: ''
            }
        );
        res.send({ result: '게시글을 수정하였습니다.' });
      } else {
        res
          .status(401)
          .send({ errorMessage: '이미지가 없고 해당게시글도 없습니다..' });
      }
    }
  } catch (error) {
    res.status(400).send({
      errorMessage: '게시글 수정에 실패했습니다.',
    });
  }
});

// 게시글 삭제
router.delete('/:postId', midware, async (req, res) => {
    try {
      const s3 = new AWS.S3(); 
      const postId = req.params.postId;
      const { userId } = res.locals.user; 
      const postInfo = await posts.findOne({ where: { postId, userId } });
      if (postInfo) {
        const beforeImage = postInfo.image.split('/')[4];
        const s3 = new AWS.S3();
        s3.deleteObject({
            Bucket: process.env.bucket,
            Key: `original/${beforeImage}`,
            },
            (err, data) => {
            if (err) { throw err; }
            }
        );
        // s3.deleteObject({
        //     Bucket: process.env.bucket,
        //     Key: `thumb/${beforeImage}`,
        //     },
        //     (err, data) => {
        //     if (err) { throw err; }
        //     }
        // );
        await posts.destroy({where: {postId:postId}});
        res.send({ result: '게시글이 삭제되었습니다!' });
      } else {
        res.status(401).send({
          errorMessage: '삭제할수 없는 게시물입니다!',
        });
      }
    } catch (error) {
      console.log(error)
      res.status(400).send({
        errorMessage: '게시글 삭제에 실패했습니다!',
      });
    }
});

router.get('/:postId', async (req, res) => {
  const postId = req.params.postId;
  try {
    let postDetail = await posts.findOne({ where: { postId } });
    const commentget = await cget.commentget(postId)
    postDetail.dataValues.comment = commentget;
    if (postDetail) {
      res.send({ postDetail: postDetail });
    } else {
      res.status(401).send({
        errorMessage: '조회할수 있는 게시물이 없습니다.',
      });
    }
  } catch (error) {
    res.status(400).send({
      errorMessage: '게시물 상세조회에 실패 했습니다.',
    });
  }
});


module.exports = router;
