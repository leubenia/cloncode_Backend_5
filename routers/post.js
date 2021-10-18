const express = require('express');
const router = express.Router();
const { Posts, sequelize, Sequelize } = require('../models');
const authMiddleware = require('../middlewares/auth_middleware');
const multer = require('multer');
const multerS3 = require('multer-s3'); 
const AWS = require('aws-sdk'); 
const path = require('path'); 

AWS.config.update({
    accessKeyId: "",
    secretAccessKey: "",
    region: 'ap-northeast-2',
  });

// 이미지 업로드
const upload = multer({
storage: multerS3({
    s3: new AWS.S3(),
    bucket: '', 
    acl: 'public-read-write',
    key(req, file, cb) {
        cb(null, `original/${Date.now()}${path.basename(file.originalname)}`);
    },
}),
limits: { fileSize: 5 * 1024 * 1024 }, 
});

// 게시글 등록 
router.post('/', authMiddleware, async (req, res) => {
    try {
      const { user } = res.locals; 
      const { content, image } = req.body;
      await Posts.create({ user: user.userId, user: user.userName, content, image, insertDt, profile });
      res.status(200).send({ result: '게시글 작성이 완료되었습니다!' });
    } catch (error) {
      res.status(401).send({ errorMessage: '게시글 작성이 실패되었습니다!' });
    }
  });
  
// 게시글 수정
router.put('/:postId', authMiddleware, async (req, res) => {
    try {
      const { postId } = req.params;
      const { userId } = res.locals.user; 
      const { content, image } = req.body;
      const postInfo = await Posts.findOne({ where: { postId, userId } });
      
      if (postInfo) {
        const beforeImage = postInfo.image.split('/')[4];
        s3.deleteObject(
          {
            Bucket: '',
            Key: `original/${beforeImage}`,
          },
          (err, data) => {
            if (err) { throw err; }
          }
        );
        s3.deleteObject(
          {
            Bucket: '',
            Key: `thumb/${beforeImage}`,
          },
          (err, data) => {
            if (err) { throw err; }
          }
        );
  
        await Posts.update(
          {
            title: title,
            content: content,
            image: image,
          },
          { where: { postId: postId, userId: userId }, }
        );
        res.send({ result: '게시글이 수정되었습니다!' });
      } else {
        res.status(401).send({ result: '게시글이 존재하지 않거나 권한이 없습니다!' });
      }
    } catch (error) {
      res.status(400).send({
        errorMessage: '게시글 수정이 실패하였습니다!.',
      });
    }
  });

  // 게시글 삭제
router.delete('/:postId',authMiddleware, async (req, res) => {
    try {
      const postId = req.params.postId;
      const { userId } = res.locals.user; 
      const postInfo = await Posts.findOne({ where: { postId, userId } });
  
      if (postInfo) {
        await Posts.update(
          { postDelType: 1, },
          { where: { postId: postInfo.postId, userId: userId }, } 
        );
        res.send({ result: '게시글이 삭제되었습니다!' });
      } else {
        res.status(401).send({
          errorMessage: '삭제할수 없는 게시물입니다!',
        });
      }
    } catch (error) {
      res.status(400).send({
        errorMessage: '게시글 삭제에 실패했습니다!',
      });
    }
  });
  
// 게시글에 사진 등록
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
      try {
        const { userId } = res.locals.user; 
        const { content } = req.body; 
        if (req.file) {
          const originalUrl = req.file.location; 
          const resizeUrl = originalUrl.replace(/\/original\//, '/thumb/');
          await Posts.create({ userId, content, image: originalUrl });
          res.json({ resizeUrl, originalUrl });
        } else {
          res.status(400).send({ errorMessage: '이미지파일이 없습니다.' });
        }
      } catch (error) {
        res.status(401).send({ errorMessage: '게시글 작성에 실패하였습니다.' });
      }
    }
);
  
// 게시글 사진 수정
router.put('/:postId', authMiddleware, upload.single('image'), async (req, res) => {
    try {
    const s3 = new AWS.S3(); 
    const postId = req.params.postId;
    const { userId } = res.locals.user; 
    const { content } = req.body;
    if (req.file) {
        const postInfo = await Posts.findOne({ where: { postId, userId } });
        if (postInfo) {
        const beforeImage = postInfo.image.split('/')[4];

        s3.deleteObject({
            Bucket: '',
            Key: `original/${beforeImage}`,
            },
            (err, data) => {
            if (err) { throw err; }
            }
        );
        s3.deleteObject({
            Bucket: '',
            Key: `thumb/${beforeImage}`,
            },
            (err, data) => {
            if (err) { throw err; }
            }
        );

        const originalUrl = req.file.location; 

        await Posts.update(
            {
            content: content,
            image: originalUrl, 
            },
            { where: { postId: postId, userId: userId }, }
        );
        res.send({ result: '게시글을 수정하였습니다.' });
        } else {
        res.status(401).send({ result: '게시글 수정 실패 되었습니다.' });
        }
    } else {
        const postInfo = await Posts.findOne({ where: { postId, userId } });
        if (postInfo) {
        await Posts.update(
            {
            content: content,
            },
            { where: { postId: postId, userId: userId }, }
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
}
);
